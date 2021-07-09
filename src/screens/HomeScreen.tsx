import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

const HomeScreen = ({navigation, route}: any) => {
  const [location, setLocation] = useState<GeolocationResponse | null>(null);

  const loadPos = async () => {
    Geolocation.getCurrentPosition(info => setLocation(info));
  }

  useEffect(() => {
    loadPos();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>Home Screen</Text>
      <Text>{location?.coords.latitude}</Text>
      <Text>{location?.coords.longitude}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 20
  }
})

export default HomeScreen;