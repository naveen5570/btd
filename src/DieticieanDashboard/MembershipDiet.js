import React, { Component } from 'react';

import {
  StyleSheet, Dimensions, Text, View, Button, TouchableOpacity, Image,
  ActivityIndicator,
  YellowBox,
} from 'react-native';
import WebView from 'react-native-webview';
import User from "../../User";
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

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
            source={require("../image/back.png")}
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
      name: User.name,
      email: User.email,
      batch_id: User.batch_id,
      patient_id: User.patient_id,
      phone: User.phone,
      avatar: User.avatar,
      image: User.avatar,

      visible: true
    };
  }
  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {

    return (

      <React.Fragment>


        <WebView
          onLoadStart={() => this.setState({ visible: true })}
          onLoadEnd={() => this.setState({ visible: false })}
          source={{ uri: `https://beatthediabetes.org/btd/public/choose-plan/${User.phone}` }} />
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
      title: 'Membership',
      headerTitleStyle: {
        fontStyle: 'italic'
      },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#74cdf0',
        elevation: 3, // remove shadow on Android
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
      headerTitleStyle: {
        fontStyle: 'italic'
      },
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

    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 11

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