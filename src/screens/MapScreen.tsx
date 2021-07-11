import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useData } from '@states/DataContext';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen = ({navigation, route}: any) => {
  const { location } = useData();

  if (!location) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text>No Location</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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

export default MapScreen;