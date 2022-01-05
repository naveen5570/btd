import React, { Component } from 'react';

import {
  StyleSheet, Text, View, Button, TouchableOpacity, Image,
  ActivityIndicator, Linking,
  YellowBox, Platform, FlatList, ScrollView
} from 'react-native';
import WebView from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
import { SocialIcon } from 'react-native-elements';
import Globals from '../Globals';
class HamburgerIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  }
  goback = () => {
    this.props.navigationProps.goBack(null);
  }
  render() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={this.goback.bind(this)} >
          <Image
            source={require("../src/image/back.png")}
            style={{ tintColor: '#fff', resizeMode: 'contain', width: 50, height: 50, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

class ContactUs extends Component {

  static navigationOptions =
    {
      title: 'Home',

    };

  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');

  }
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

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  webCall = () => {

    return fetch(Globals.base_url + 'apptapp/Sugar/broadcasts.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  componentDidMount() {

    this.webCall();

  }
  _handleOpenWithLinkingtel2 = () => {
    Linking.openURL('tel:+918369131690')
  }
  _handleOpenWithLinkingtel1 = () => {
    Linking.openURL('tel:+917666816913')
  }

  _handleOpenWithLinking = () => {
    Linking.openURL('https://www.beatthediabetes.org');
  };

  _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync('mailto:info@beatthediabetes.org');
  };


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>


          <View style={styles.postContent}>
            <Text style={styles.postTitle}>
              Beat The Diabetes - Mumbai Office
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{
                flexDirection: 'row',
                fontSize: 18,
                fontWeight: '300'
              }}>Address:</Text>
              <Text style={{
                flex: 1, marginTop: 3, paddingLeft: 5, color: '#6b6e72', fontSize: 16,
                fontWeight: '400',
              }}>Room No-4, 38 Kabbur Estate, First Floor, Road No-2
                Opposite Sudha Dairy, Sion East, Mumbai.</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{
                flexDirection: 'row',
                fontSize: 18,
                fontWeight: '300'
              }}>Pin Code:</Text>
              <Text style={{
                flex: 1, marginTop: 3, paddingLeft: 5, color: '#6b6e72', fontSize: 16,
                fontWeight: '400',
              }}>400022</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{
                flexDirection: 'row',
                fontSize: 18,
                fontWeight: '300'
              }}>State: </Text>
              <Text style={{
                flex: 1, marginTop: 3, paddingLeft: 25, color: '#6b6e72', fontSize: 16,
                fontWeight: '400',
              }}> Maharashtra</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{
                flexDirection: 'row',
                fontSize: 18,
                fontWeight: '300'
              }}>Country: </Text>
              <Text style={{
                flex: 1, marginTop: 3, paddingLeft: 5, color: '#6b6e72', fontSize: 16,
                fontWeight: '400',
              }}> India</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{
                flexDirection: 'row',
                fontSize: 18,
                fontWeight: '300'
              }}>Phone: </Text>
              <Text style={{
                flex: 1, marginTop: 3, paddingLeft: 10, color: '#6b6e72', fontSize: 16,
                fontWeight: '400',
              }} onPress={this._handleOpenWithLinkingtel2}>+91 8369131690</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{
                flexDirection: 'row',
                fontSize: 18,
                fontWeight: '300'
              }}>Mobile: </Text>
              <Text style={{
                flex: 1, marginTop: 3, paddingLeft: 10, color: '#6b6e72', fontSize: 16,
                fontWeight: '400',
              }} onPress={this._handleOpenWithLinkingtel1}>+91 7666816913</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{
                flexDirection: 'row',
                fontSize: 18,
                fontWeight: '300'
              }}>Website: </Text>
              <Text style={{
                flex: 1, marginTop: 3, paddingLeft: 5, color: '#6b6e72', fontSize: 16,
                fontWeight: '400',
              }} onPress={this._handleOpenWithLinking}> www.beatthediabetes.org</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{
                flexDirection: 'row',
                fontSize: 18,
                fontWeight: '300'
              }}>Email: </Text>
              <Text style={{
                flex: 1, marginTop: 3, paddingLeft: 5, color: '#6b6e72', fontSize: 16,
                fontWeight: '400',
              }} onPress={this._handleOpenWithWebBrowser}> info@beatthediabetes.org</Text>
            </View>


            {/*
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: 20
              }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column' }}>
                  <SocialIcon
                    type="twitter"
                    onPress={() => {
                      alert('twitter');
                    }}
                  />
                  <Text style={{ textAlign: 'center' }}>twitter</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <SocialIcon
                    type="facebook"
                    onPress={() => {
                      alert('facebook');
                    }}
                  />
                  <Text style={{ textAlign: 'center' }}>facebook</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <SocialIcon
                    type="instagram"
                    onPress={() => {
                      alert('instagram');
                    }}
                  />
                  <Text style={{ textAlign: 'center' }}>instagram</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <SocialIcon
                    type="linkedin"
                    onPress={() => {
                      alert('linkedin');
                    }}
                  />
                  <Text style={{ textAlign: 'center' }}>linkedin</Text>
                </View>
              </View>
            </View>

         
            <Text style={styles.postDescription}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
              Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
            </Text>

            <Text style={styles.tags}>
              Lorem, ipsum, dolor, sit, amet, consectetuer, adipiscing, elit.
            </Text>

            <Text style={styles.date}>

            </Text>

            <View style={styles.profile}>
              <Image style={styles.avatar}
                source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />

              <Text style={styles.name}>
                Johan Doe
                  </Text>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={() => this.props.navigation.navigate("pro1")}>
              <Text style={styles.shareButtonText}>Home</Text>
            </TouchableOpacity>
  */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

class Settings_Screen extends Component {

  static navigationOptions =
    {
      title: 'Settings',
    };

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Settings Screen Activity.</Text>

      </View>
    );
  }
}

class Student_Screen extends Component {

  static navigationOptions =
    {
      title: 'Student',

    };

  gotoNextActivity = () => {
    this.props.navigation.navigate('Forth');

  }

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Student Screen Activity.</Text>

        <Button onPress={this.gotoNextActivity} title='Open Details Activity' />

      </View>
    );
  }
}

class Details_Screen extends Component {

  static navigationOptions =
    {
      title: 'Details Screen',

    };

  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');

  }

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Details Screen Activity.</Text>

      </View>
    );
  }
}

export const Tab_1 = createMaterialTopTabNavigator({
  First: {
    screen: ContactUs,
  },

}, {
  tabBarPosition: 'top',

  swipeEnabled: true,

  tabBarOptions: {

    activeTintColor: '#fff',
    pressColor: '#004D40',
    inactiveTintColor: '#fff',
    style: {
      marginTop: -70,
      backgroundColor: '#fff'

    },

    labelStyle: {
      fontSize: 16,
      fontWeight: '200',
      textAlign: 'center'
    }
  }

});

export const Tab_2 = createMaterialTopTabNavigator({
  Third: {
    screen: Student_Screen,
  },
  Forth: {
    screen: Details_Screen,
  }
}, {
  tabBarPosition: 'top',

  swipeEnabled: true,

  tabBarOptions: {

    activeTintColor: '#fff',
    pressColor: '#004D40',
    inactiveTintColor: '#fff',
    style: {

      backgroundColor: '#00B8D4'

    },

    labelStyle: {
      fontSize: 16,
      fontWeight: '200'
    }
  }

});

const First_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_1,
    navigationOptions: ({ navigation }) => ({
      title: 'Contact Us',
      headerTitleStyle: {
        fontStyle: 'italic'
      },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#74cdf0',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
        textAlign: 'center',
        marginLeft: '0%'
        // remove shadow on iOS
      },
      headerTintColor: '#fff',
    })
  },
}, {
  headerLayoutPreset: 'center',
  fontStyle: 'italic',

});


const Second_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_2,
    navigationOptions: ({ navigation }) => ({
      title: 'Second Screen',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#00B8D4',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#fff',
    })
  },
});

const MyDrawerNavigator = createDrawerNavigator({

  Home: {

    screen: First_2_Tabs,

  },

  Settings: {

    screen: Second_2_Tabs,

  }

});


export default createAppContainer(MyDrawerNavigator);

const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10,
    marginTop: (Platform.OS === 'ios') ? 50 : 20,

  },

  imageView: {

    width: '80%',
    height: '80%',
    marginLeft: 30,
    borderRadius: 7,


  },

  textView: {

    width: '100%',
    textAlign: 'center',
    padding: 7,
    color: '#000',
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: 10

  },
  textmessage: {

    width: '100%',
    padding: 7,
    color: '#000',
    fontSize: 16,
    justifyContent: 'flex-start',
    marginLeft: 5,
    marginBottom: 15,
    marginTop: 10,
    marginEnd: 5,
    textAlign: 'auto'
  },

  text:
  {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
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
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: "#6b6e72",
  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  tags: {
    color: '#6b6e72',
    marginTop: 10,
  },
  date: {
    color: '#696969',
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#6b6e72",
  },
  profile: {
    flexDirection: 'row',
    marginTop: 20
  },
  name: {
    fontSize: 22,
    color: "#6b6e72",
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#6b6e72",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  }


});