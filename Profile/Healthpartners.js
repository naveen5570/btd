
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Image,
  ActivityIndicator,
  YellowBox, Platform, FlatList, ScrollView
} from 'react-native';
import ListView from "deprecated-react-native-listview";
import WebView from 'react-native-webview';
import { createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
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


class Healthpartners extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        { description: "IgeneticsDiagnostics  and Healthians labs offer discount to BTD patients:*\nIgenetics Diagnostics contact no – Mr. Amit Sharma – 9136986314 \nPlease send your reports to beatthediabetes@gmail.com", address: "" },
        { description: "Healthians Lab Contact no – Mr.Amit Verma - +91 7531092797 \n Please send your reports to beatthediabetes@gmail.com", address: "" },
        { description: "BTD Suitable Grocery Shops In Mumbai :*" },
        { description: "1.	Shrikrishna Ayurveda", address: " Opposite Apple Hospital,sec 7,AIROLI.I You can also get Khapligahu, hand pounded rice, etc." },
        { description: "2.	ChaitanyaKalve", address: "Organic Store , Vile Parle.Contact No. 9820546316" },
        { description: "3.	D G Ayurvedic... Andheri", address: "Contact No.\n + 91 22 2671 6964 \n + 91 22 3200 9558 \n + 91 22 2679 9843 \n + 91 90294 22121 \n Sairam.Khapali, bansi wheat is available at sahyadri agro, v2 mart,laxmi Park, opppratap tower kolbad road, thane_west. 9820398268, 9004688089" },

      ]),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ListView style={styles.notificationList} enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(notification) => {
              return (
                <View>
                  <View style={styles.notificationBox}>
                    <Text style={styles.description}>{notification.description}</Text>
                    <Text style={styles.address}>{notification.address}</Text>
                  </View>
                </View>
              )
            }} />
        </ScrollView>
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
    screen: Healthpartners,
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
      title: 'Health Partners',
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
  container: {
    backgroundColor: '#DCDCDC'
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    flexWrap: 'wrap'
  },
  icon: {
    width: 45,
    height: 45,
  },
  description: {
    fontSize: 18,
    color: "#000",
    marginLeft: 5,
  },
  address: {
    fontSize: 16,
    color: "#6b6e72",
    marginLeft: 5,
  },
});
