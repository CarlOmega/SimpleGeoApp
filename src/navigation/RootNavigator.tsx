import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomTabBar from '@components/BottomTabBar';

import HomeScreen from '@screens/HomeScreen';
import MapScreen from '@screens/MapScreen';
import DetailScreen from '@screens/DetailScreen';

const HomeStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const TabNavigator = () => (
  <Tabs.Navigator initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />}>
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="Map" component={MapScreen} />
  </Tabs.Navigator>
);

const RootNavigator = () =>  (
  <HomeStack.Navigator initialRouteName="Cafes" mode="modal">
    <HomeStack.Screen name="Cafes" component={TabNavigator} options={{headerShown: false}}/>
    <HomeStack.Screen name="Details" component={DetailScreen} />
  </HomeStack.Navigator>
);

export default RootNavigator;