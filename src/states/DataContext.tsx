import React, { useContext, useEffect, useMemo, useState } from 'react';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { NearbyAPI } from '@utils/API';

export const DataConext = React.createContext<any>({});

export const DataProvider = (props: any) => {
  const [location, setLocation] = useState<GeolocationResponse | null>(null);
  const [cafes, setCafes] = useState<any[]>([]);
  const [pageToken, setPageToken] = useState<string | null>(null);

  useEffect(() => {
    loadPos();
  }, []);

  useEffect(() => {
    if (location) 
      loadCafes();
  }, [location]);

  useEffect(() => {
    console.log(cafes.length)
  }, [cafes]);

  const loadCafes = async () => {
    try {
      const res = await NearbyAPI.read({
        location: `${location?.coords.latitude},${location?.coords.longitude}`,
        radius: 5000, 
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
        radius: 5000, 
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
    loadCafes,
    nextCafes
  }), [location, cafes, pageToken]);

  return (
    <DataConext.Provider value={dataContext}>
      {props.children}
    </DataConext.Provider>
  )
}

export const useData = () => useContext(DataConext);