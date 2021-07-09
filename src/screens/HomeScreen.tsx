import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useData } from '@states/DataContext';

const HomeScreen = ({navigation, route}: any) => {
  const { location } = useData();

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