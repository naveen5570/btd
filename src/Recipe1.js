import React, { Component } from 'react';

import {
  StyleSheet, Dimensions, Text, View, Button, TouchableOpacity, Image,
  ActivityIndicator, TouchableHighlight,
  YellowBox, Platform, FlatList, NetInfo
} from 'react-native';
import WebView from 'react-native-webview';
import styles from './styles';
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Recipedetail from './Recipedetail';
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
      isLoading: true,
      isFetching: false,

    }

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);

  }
  UNSAFE_componentWillMount() {

    this.searchRandomUser()
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#fff",
        }}
      />
    );
  }


  searchRandomUser = async () => {
    return fetch(Globals.base_url + 'apptapp/Sugar/recipe.php')
      .then(response => response.json())
      .then(responseJson => {

        if (responseJson.result == 1) {

          this.setState(
            {
              isLoading: false,
              isFetching: false,
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


  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this._handleConnectivityChange
    );
  }
  onRefresh() {
    this.setState({ isFetching: true }, function () { this.searchRandomUser() });
  }
  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
  };
  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.props.navigation.navigate("Recipedetail", {
      id: item.id,

    })}>
      <View style={styles.container}>

        <Image style={styles.photo} source={{ uri: item.featured_img }} />
        <Text style={styles.title}>{item.name}</Text>

      </View>
    </TouchableHighlight>
  );

  render() {
    if (this.state.isLoading) {
      return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <ActivityIndicator size="large" />

        </View>

      );

    }
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.dataSource}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          renderItem={this.renderRecipes}
          keyExtractor={(item) => {
            return item.id;
          }}
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
      title: 'Recipes',
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

