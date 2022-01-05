//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
//import react in our code.
import {
  StyleSheet, View, Text, TouchableOpacity,

  ActivityIndicator,
  YellowBox,
} from 'react-native';
// import all basic components
import WebView from 'react-native-webview';
export default class Screen5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }
  //Screen2 Component
  render() {
    return (
      <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} />
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});