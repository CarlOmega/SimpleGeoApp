import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const DetailScreen = ({navigation, route}: any) => {

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>Map Screen</Text>
      <Icon name="rocket" size={30} color="#900" />
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