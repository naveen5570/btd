import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import GreenScreen from "./GreenScreen";
import RedScreen from "./RedScreen";
import Globals from '../Globals';


import { getStatusBarHeight } from 'react-native-status-bar-height';

console.log(getStatusBarHeight());

console.log(getStatusBarHeight(true));

const GreenTab = createStackNavigator({
  Green: GreenScreen
});

const RedTab = createStackNavigator({
  Red: RedScreen
});

const Tabs = createBottomTabNavigator({
  Green: GreenTab,
  Red: RedTab
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: () => {
      const { routeName } = navigation.state;
      let tabName;
      tabName = routeName === 'Green' ? 'home' : 'grid';

      return <Icon name={tabName} size={20} />
    }
  })
});

export default createAppContainer(Tabs);