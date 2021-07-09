import React, { useContext, useEffect, useMemo, useState } from 'react';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

export const DataConext = React.createContext<any>({});

export const DataProvider = (props: any) => {
  const [location, setLocation] = useState<GeolocationResponse | null>(null);

  useEffect(() => {
    loadPos();
  }, []);

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