import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useData } from '@states/DataContext';
import { List } from '@ui-kitten/components';
import CafeItem from '@components/CafeItem';

const HomeScreen = ({navigation, route}: any) => {
  const { location, cafes, nextCafes } = useData();

  return (
    <SafeAreaView style={styles.screen}>
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={cafes}
        renderItem={CafeItem}
        onEndReached={(info: any) => nextCafes()}
        onEndReachedThreshold={0.2}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    height: "100%"
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 20
  }
})

export default HomeScreen;