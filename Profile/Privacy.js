
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Image, WebView,
  ActivityIndicator,
  YellowBox, Platform, FlatList, ScrollView
} from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
import Globals from '../Globals';
import ListView from 'deprecated-react-native-listview'
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


class PrivacyPolicy extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2,) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          id: "1.",
          answers: "We at BTD take the privacy of the information you provide us very seriously. This Privacy Policy has been created as a commitment towards the information that has been provided by you. We request you to read this carefully to understand how we use any information you provide us at BTD.\n \nBeat the Diabetes takes upon itself to understand our utmost responsibility to maintain the privacy and confidentiality of each and every individual's information about his/her health and ailments of any kind. Therefore, we take it upon ourselves to maintain a high level of confidentiality with regards to all the medical and health information shared along with Personal information shared by the user \n \nBTD guarantees that no direct or indirect use will be made of any information.\n\n1. What personal information we always collect? \n \n(a) Registration Data\n(b) Health Information\n(c) Other information\n \n2. Payment Information \n\nAny kind of payment information is not asked collected by us. It is collected in secured manner by third party payment gateways. You are requested to kindly go through Privacy Policy of those third-party payment gateways as well.\n \n3. USE OF INFORMATION COLLECTED:\n \nBeat the Diabetes will collect Personal Information from you as mentioned above,\nDuring membership registration, BTD collects personal information \n \n1.       It is imperative for you to disclose your Health Information to us for providing you with our consultation and guidance. Therefore, we are required to seek your authorization to be provided upon an executed release form to use or disclose your Health Information. Post receival of Authorization, we will utilize the Health Information shared so as to provide adequate guidance to you. This approval will permit us to gather data from other medical institutions and medical specialists. We may likewise reveal your health information to other medical institutions or clinical experts who are engaged with us to render our services to you. \n2.    Beat the Diabetes won't share your information to a relative, companion, or some other individual except if they are explicitly distinguished by you on your approval as suitable to share the Health Information.\n3.       We may utilize and unveil the Health Information for our administrative tasks, which incorporate inside organization to improve the quality and cost viability of our services to you.\nYour entitlement to protection is essential to us and we perceive that when you decide to give us data about yourself, you confide in us to act in a mindful way. \n\nWe accept this data should just be utilized to assist us with giving you better help and that is the reason we have set up a strategy to secure your own data. \n\nWe won't give any of your own data got by means of the application to different organizations or people except if required to by law. \n\nThis privacy policy arrangement is dependent upon the general Terms of Use \n\n",

        }


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
                <View style={styles.notificationBox}>

                  <Text style={styles.answer}>{notification.answers}</Text>
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
    screen: PrivacyPolicy,
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
      title: 'Privacy Policy',
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
    backgroundColor: '#DCDCDC',
    height: '100%'
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
    flexWrap: 'wrap',
    height: '100%'
  },
  icon: {
    width: 45,
    height: 45,
    fontWeight: '400',
    fontSize: 18
  },
  description: {
    fontSize: 18,
    color: "#000",
    marginLeft: 5,
    marginBottom: 5
  },
  answer: {
    fontSize: 16,
    color: "#6b6e72",
    marginLeft: 5,
  },
});
