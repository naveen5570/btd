import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,

  ActivityIndicator,
  YellowBox,
} from "react-native";
import WebView from 'react-native-webview';
import Globals from '../Globals';

export default class Maps extends Component {
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
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />

        <WebView source={{ uri: "https://beatthediabetes.org/btd/public/choose-plan" }} />


      </View>
    );
    if (this.state.isLoading) {
      return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <ActivityIndicator size="large" />

        </View>

      );

    }

  }
}

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>MEMBERSHIP</Text>
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <TouchableOpacity >
      <Text style={styles.icon}>⬅️</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text style={styles.icon}>⭐️</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text style={styles.icon}> ➡️</Text>
    </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#00b8ff"
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  icon: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#00b8ff"
  }
});