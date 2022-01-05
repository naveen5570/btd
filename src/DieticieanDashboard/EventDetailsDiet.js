import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,

  ActivityIndicator,
} from "react-native";
import Globals from '../../Globals';
import WebView from 'react-native-webview';

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    var { params } = this.props.navigation.state;
    this.state = {
      isLoading: false,
      id: params.id,
      title: params.title,
      slug: '',
      visible: true
    }
    var str = params.title.toLowerCase();
    this.state.slug = str.replace(" ", "-");
  }
  hideSpinner() {
    this.setState({ visible: false });
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
      <React.Fragment>
        <Header />

        <WebView
          onLoadStart={() => this.setState({ visible: true })}
          onLoadEnd={() => this.setState({ visible: false })}
          source={{ uri: `https://beatthediabetes.org/btd-events/public/e/${this.state.id}/${this.state.slug}` }}
        />


        {this.state.visible ? (
          <ActivityIndicator
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              jusityContent: "space-around",
              flexWrap: "wrap",
              alignContent: "center",
            }}
            size="large"
          />
        ) : null}
      </React.Fragment>
    );
  }
}
const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Events</Text>
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