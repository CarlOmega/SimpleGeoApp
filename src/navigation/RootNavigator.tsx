import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@screens/HomeScreen';

const HomeStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default RootNavigator;