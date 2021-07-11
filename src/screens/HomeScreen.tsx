import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useData } from '@states/DataContext';
import { Layout, List, Card, Text, Button } from '@ui-kitten/components';

const HomeScreen = ({navigation, route}: any) => {
  const { location, cafes, nextCafes } = useData();

  const renderItemHeader = (headerProps: any, item: any) => (
    <View {...headerProps}>
      <Text category='h6'>
        {item.name}
      </Text>
    </View>
  );
  
  const renderItemFooter = (footerProps: any, item: any) => (
    <Layout {...footerProps} style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button style={styles.cardButton} onPress={() => navigation.navigate("Map", {region: {
        latitude: item.geometry.location.lat,
        longitude: item.geometry.location.lng,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      }})}>
        {"Map Link"}
      </Button>
      <Button style={styles.cardButton} onPress={() => navigation.navigate("Details", {cafe: item})}>
        {`Details`}
      </Button>
    </Layout>
  );
  
  const CafeItem = ({ item, index, separators }: any) => (
    <Card
      style={styles.item}
      status='basic'
      header={headerProps => renderItemHeader(headerProps, item)}
      footer={footerProps => renderItemFooter(footerProps, item)}>
      <Text>
        {item.rating}
      </Text>
    </Card>
  );

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
  item: {
    marginVertical: 4,
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
  },
  cardButton: { 
    flex: 1, 
    margin: 10, 
    borderRadius: 15 
  }
})

export default HomeScreen;