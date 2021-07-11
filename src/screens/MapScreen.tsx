import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useData } from '@states/DataContext';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const MapScreen = ({navigation, route}: any) => {
  const { location, cafes } = useData();

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
      >
        {cafes.map((item: any, index: number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
            }}
            title={item.name}
          />
        ))}
      </MapView>
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