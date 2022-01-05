import React, { Component } from 'react';

import {
  StyleSheet, Dimensions, Text, View, Button, TouchableOpacity, Image,
  ActivityIndicator,
  YellowBox, Platform, FlatList, HTML
} from 'react-native';
import WebView from 'react-native-webview';
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
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
            source={require("./image/back.png")}
            style={{ tintColor: '#fff', resizeMode: 'contain', width: 50, height: 50, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

class Home_Screen extends Component {

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
      dataSource: [],
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


  componentDidMount() {
    return fetch(Globals.base_url + 'apptapp/Sugar/broadcasts.php')
      .then(response => response.json())
      .then(responseJson => {

        if (responseJson.result == 1) {

          this.setState(
            {
              isLoading: false,
              dataSource: responseJson.data
            },
            function () {
              this.arrayholder = responseJson.data;
            }
          );
        }

      })
      .catch(error => {
        console.error(error);
      });
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

      <View style={styles.MainContainer}>

        <FlatList

          data={this.state.dataSource}

          ItemSeparatorComponent={this.FlatListItemSeparator}

          renderItem={({ item }) =>

            <View style={{
              flex: 1, flexDirection: 'column', width: '100%',
              height: '100%',
              borderWidth: 0.5,
              borderRadius: 7,
              borderColor: 'blue',
              shadowColor: 'blue',
              shadowRadius: 1,
              shadowOffset: { width: 5, height: 2 },
              shadowOpacity: 0.8,
              elevation: 1,
              marginTop: 10,
            }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("BroadCasts", {
                id: item.id,
                title: item.title,
                message: item.message,
                created_at: item.created_at,
                status: item.status,
                date: item.date
              })}>
                <Text style={styles.textView} >{item.title}</Text>
                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.textmessage} >{item.message}</Text>
              </TouchableOpacity>
            </View>

          }

          keyExtractor={(item, index) => index.toString()}

        />

      </View>
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
    screen: Home_Screen,
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
      title: 'BTD Messaging',
      headerTitleStyle: {
        fontStyle: 'italic'
      },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#74cdf0',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
        textAlign: 'center',
        marginLeft: '0%',
		marginTop: 0,
        height: Dimensions.get('window').height / 8
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
		marginTop: 0,
        height: Dimensions.get('window').height / 8
      },
      headerTintColor: '#fff',
    })
  },
}, {
  headerLayoutPreset: 'center',
  fontStyle: 'italic',

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
    marginTop: 10,
    fontStyle: 'italic'
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
    textAlign: 'auto',
    fontStyle: 'italic'
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
  }

});