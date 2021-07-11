import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { useData } from '@states/DataContext';


const DetailScreen = ({navigation, route}: any) => {
  const cafe = route.params.cafe;

  const { favourites, addFavouite, removeFavourtie } = useData();

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>{cafe.name}</Text>
      <Text style={styles.text}>{`Address: ${cafe.vicinity}`}</Text>
      <Button style={styles.button} onPress={() => favourites.includes(cafe.place_id) ? removeFavourtie(cafe.place_id) : addFavouite(cafe.place_id)}>
        {favourites.includes(cafe.place_id) ? "Unfavourite" : "Favourite"}
      </Button>
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
  },
  button: {
    borderRadius: 15,
    margin: 10
  }
})

export default DetailScreen;