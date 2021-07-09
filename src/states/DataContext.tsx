import React, { useContext, useEffect, useMemo, useState } from 'react';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { NearbyAPI } from '@utils/API';

export const DataConext = React.createContext<any>({});

export const DataProvider = (props: any) => {
  const [location, setLocation] = useState<GeolocationResponse | null>(null);

  useEffect(() => {
    loadPos();
  }, []);

  useEffect(() => {
    if (location) 
      loadPlaces();
  }, [location]);

  const loadPlaces = async () => {
    try {
      const res = await NearbyAPI.read({
        location: `${location?.coords.latitude},${location?.coords.longitude}`,
        radius: 1500
      });
      console.log(res.data.results[0]);
    } catch (e) {
      console.log(e.message);
    }
  }

  const loadPos = async () => {
    Geolocation.getCurrentPosition(info => setLocation(info));
  }

  const dataContext = useMemo(() => ({
    location,
  }), [location]);

  return (
    <DataConext.Provider value={dataContext}>
      {props.children}
    </DataConext.Provider>
  )
}

export const useData = () => useContext(DataConext);