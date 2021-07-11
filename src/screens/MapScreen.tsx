import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useData } from '@states/DataContext';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

const MapScreen = ({navigation, route}: any) => {
  const region = route.params?.region;
  const { location, cafes } = useData();
  const [focus, setFocus] = useState<any | null>(region);

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
        {...(focus && {region: focus})}
      >
        {cafes.map((item: any, index: number) => (
          <Marker
            key={index}
            onPress={({nativeEvent: {coordinate}} : any) => coordinate && setFocus({
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 0.0471,
              longitudeDelta: 0.02105,
            })}
            coordinate={{
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
            }}
          >
            <Callout onPress={() => navigation.navigate("Details", {cafe: item})}>
              <Text>{item.name}</Text>
              <Text>View Details</Text>
            </Callout>
          </Marker>
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