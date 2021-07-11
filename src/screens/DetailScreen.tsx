import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const DetailScreen = ({navigation, route}: any) => {
  const cafe = route.params.cafe;

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>{cafe.name}</Text>
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

export default DetailScreen;