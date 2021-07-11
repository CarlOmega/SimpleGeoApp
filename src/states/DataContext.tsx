import React, { useContext, useEffect, useMemo, useState } from 'react';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { NearbyAPI } from '@utils/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DataConext = React.createContext<any>({});

export const DataProvider = (props: any) => {
  const [location, setLocation] = useState<GeolocationResponse | null>(null);
  const [cafes, setCafes] = useState<any[]>([]);
  const [favourites, setFavourites] = useState<any[]>([]);
  const [pageToken, setPageToken] = useState<string | null>(null);

  useEffect(() => {
    loadPos();
    loadFavouites();
  }, []);

  useEffect(() => {
    if (location) 
      loadCafes();
  }, [location]);

  useEffect(() => {
    console.log(cafes.length)
  }, [cafes]);

  const loadFavouites = async () => {
    try {
      const value = await AsyncStorage.getItem('favourites');
      if(value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch(e) {
      console.log(e.message);
    }
  }

  const addFavouite = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem('favourites');
      const storedFavourites = JSON.parse(value ?? "[]");
      const updated = [key, ...storedFavourites];
      await AsyncStorage.setItem('favourites', JSON.stringify(updated));
      setFavourites(updated);
    } catch(e) {
      console.log(e.message);
    }
  }

  const removeFavourtie = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem('favourites');
      const storedFavourites = JSON.parse(value ?? "[]");
      if (storedFavourites.length === 0) return;
      const updated = storedFavourites.filter((fav: string) => fav !== key);
      await AsyncStorage.setItem('favourites', JSON.stringify(updated));
      setFavourites(updated);
    } catch(e) {
      console.log(e.message);
    }
  }

  const loadCafes = async () => {
    try {
      const res = await NearbyAPI.read({
        location: `${location?.coords.latitude},${location?.coords.longitude}`,
        radius: 50000, 
      });
      if (res.data.results) {
        setCafes(res.data.results);
        setPageToken(res.data.next_page_token ?? null)
      } else {
        throw new Error("No cafes");
      }
    } catch (e) {
      console.log(e.message);
      setCafes([]);
      setPageToken(null);
    }
  }

  const nextCafes = async () => {
    if (!pageToken) return;
    try {
      const res = await NearbyAPI.read({
        location: `${location?.coords.latitude},${location?.coords.longitude}`,
        radius: 50000, 
        ...(pageToken && {pagetoken: pageToken})
      });
      if (res.data.results) {
        setCafes((prev) => [...prev, ...res.data.results]);
        setPageToken(res.data.next_page_token ?? null)
      } else {
        throw new Error("No cafes");
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  const loadPos = async () => {
    Geolocation.getCurrentPosition(info => setLocation(info));
  }

  const dataContext = useMemo(() => ({
    location,
    cafes,
    favourites,
    loadCafes,
    nextCafes,
    addFavouite,
    removeFavourtie
  }), [location, cafes, pageToken, favourites]);

  return (
    <DataConext.Provider value={dataContext}>
      {props.children}
    </DataConext.Provider>
  )
}

export const useData = () => useContext(DataConext);