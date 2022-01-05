import React from 'react'
import { Text, Animated, Easing,Image, TouchableOpacity } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import SignupScreen from '../Containers/SignupScreen'
import ForgottenPasswordScreen from '../Containers/ForgottenPasswordScreen'
import Screen1 from '../Containers/Screen1'
import Screen2 from '../Containers/Screen2'
import Screen3 from '../Containers/Screen3'
import Screen4 from '../Containers/Screen4'
import Screen5 from '../Containers/Screen5'
import Screen6 from '../Containers/Screen6'
import Screen7 from '../Containers/Screen7'
import Screen8 from '../Containers/Screen8'
import Screen9 from '../Containers/Screen9'
import Screen10 from '../Containers/Screen10'
import DrawerContainer from '../Containers/DrawerContainer'

import { Icon,Button } from 'react-native-elements';
// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const DrawerStack = DrawerNavigator({
  screen1: { screen: Screen1 },
  screen2: { screen: Screen2 },
  screen3: { screen: Screen3 },
  screen4: { screen: Screen4 },
  screen5: { screen: Screen5 },
  screen6: { screen: Screen6 },
  screen7: { screen: Screen7 },
  screen8: { screen: Screen8 },
  screen9: { screen: Screen9 },
  screen10:{ screen: Screen10 },
  
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer
})

const drawerButton = (navigation) =>
<TouchableOpacity  onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }
  }>
  <Image
  source={require('./image/drawer.png')}
  style={{ width: 25, height: 25, marginLeft: 5 }}
    onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }
  }></Image>
  </TouchableOpacity>
 


const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#fff',marginTop:30},
    title: 'Welcome!',
    headerTintColor: 'black',
    gesturesEnabled: false,
    headerLeft: drawerButton(navigation)
  })
})

// login stack
const LoginStack = StackNavigator({
  loginScreen: { screen: LoginScreen },
  signupScreen: { screen: SignupScreen },
  forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: '#fff',marginTop:30,},
    title: 'You are not logged in',
    headerTintColor: 'black'
  }
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig
})


export default PrimaryNav
