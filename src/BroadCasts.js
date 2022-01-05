import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import WebView from 'react-native-webview';
import Globals from '../Globals';


export default class BroadCasts extends Component {
  constructor(props) {
    super(props);
    var { params } = this.props.navigation.state;
    this.state = {
      isLoading: false,
      id: params.id,
      title: params.title,
      slug: '',
      message: params.message,
      status: params.status,
      created_at: params.created_at,
      date: params.date
    }
    var str = params.title.toLowerCase();
    this.state.slug = str.replace(" ", "-");
  }
  render() {
    if (this.state.isLoading) {
      return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <ActivityIndicator size="large" />

        </View>

      );

    }
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F9FC' }}>
        <Header />
        <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Roboto', marginLeft: 5, marginEnd: 5, marginTop: 10, marginBottom: 10, textAlign: 'justify' }}>{this.state.title}</Text>
        <Text style={{ fontSize: 20, fontFamily: 'Roboto', fontStyle: 'italic', margin: 10, textAlign: 'justify' }}>{this.state.message}</Text>
        <Text style={{ fontSize: 20, fontFamily: 'Roboto', fontStyle: 'italic', margin: 10, fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline' }}> Broadcasted at:{'\n'} {this.state.date}</Text>

      </View>
    );
  }
}

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Message Detail</Text>
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <TouchableOpacity>
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