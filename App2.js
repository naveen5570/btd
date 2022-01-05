/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createDrawerNavigator, DrawerItems, createAppContainer, createStackNavigator, } from 'react-navigation';
import { Icon } from 'native-base';
import HomePage from './components/Page/HomePage';
import SettingsPage from './components/Page/SettingsPage';
import NotificationPage from './components/Page/Notifications';
import NewsPage from './components/Page/News';

import SignIn from "./src/SignIn";
import Signin2 from "./src/Signin2";

import SocialAuth from "./src/SocialAuth";
import SignUp from "./src/SignUp";
import ForgotPassword from "./src/ForgotPassword";
import OTP from "./src/OTP";
import Resend from "./src/Resend";
import Profile from "./src/Profile";
import profile1 from "./src/profile1";
import pro from "./src/pro";
import UserInformation from "./src/UserInformation";
import SugarInput from "./src/SugarInput";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import medicine from "./src/medicine";
import medi from "./src/medi";
import recommend_med from "./src/recommend_med";
import addmedi from "./src/addmedi";
import Events from "./src/Events";
import Detail from "./src/Detail";
import DefaultScreen from "./src/DefaultScreen";
import medicinerec from "./src/medicinerec";
import BlueScreen from "./src/BlueScreen";
import Recipe from "./src/Recipe";

const { width } = Dimensions.get("window");

const CustomDrawerNavigation = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
        <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('./assets/no-image.png')} style={{ height: 150, width: 150, borderRadius: 60 }} />
        </View>
        <View style={{ height: 50, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Text>Dummy User</Text>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>

    </SafeAreaView>
  );
}
const AuthStack = createStackNavigator(
  {

    SignIn,
    Signin2,
    SignUp,
    ForgotPassword,
    SocialAuth,
    OTP,
    Resend,
    Profile,
    UserInformation,
    SugarInput,
    GoalInput,
    GoalItem,
    LoginScreen,
    ChatScreen,
    medicine,
    medi,
    recommend_med,
    addmedi,
    Events,
    Detail,
    DefaultScreen,
    medicinerec,
    BlueScreen,
    profile1,
    pro,
    Recipe,

  },
  {
    headerMode: "none"
  }
);

const Drawer = createDrawerNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: 'Dashboard'
    }
  },
  Settings: {
    screen: SettingsPage,
    navigationOptions: {
      title: 'Sugar Input'
    }
  },
  Notifications: {
    screen: NotificationPage,
    navigationOptions: {
      title: 'Notifications'
    }
  },
  News: {
    screen: NewsPage,
    navigationOptions: {
      title: 'Medicines'
    }
  }
},
  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width / 3) * 2
  });

const App = createAppContainer(Drawer, AuthStack);

export default App;