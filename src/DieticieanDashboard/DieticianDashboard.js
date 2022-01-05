import React, { Component } from 'react';
import {
  StyleSheet,  Text, ScrollView, View, TouchableOpacity, Image, Vibration, Dimensions, Platform, ActivityIndicator, SafeAreaView, Alert, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import { createAppContainer,  createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import CustomSidebarMenu from '../CustomSidebarMenu';
import User from '../../User';
import styles from '../constants/styles';
//import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants'
import Globals from '../../Globals';

class HamburgerIcon extends Component {
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
    }
  }
  toggleDrawer = () => {

    this.props.navigationProps.toggleDrawer();

  }

  render() {


    return (

      <View style={{ flexDirection: 'row', }}>

        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >

          <Image
            source={require("../image/menu.png")}
            style={{ tintColor: '#fff', resizeMode: 'contain', width: 30, height: 30, marginLeft: 10 }}
          />

        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginLeft: 20 }}>

          <Text style={{ fontSize: 18, fontWeight: '300', marginLeft: 145, fontStyle: 'italic', marginTop: 8 }}>{User.name}</Text>

        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 15 }} >
          <TouchableOpacity onPress={() => this.props.navigationProps.navigate('Profile')} >
            <Image
              source={{ uri: User.avatar }}
              style={{ width: 40, height: 40, borderRadius: 40 / 2, marginLeft: 15 }} />
          </TouchableOpacity>
        </View>


      </View>

    );


  }
}

class Home_Screen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Title',
    headerStyle: { height: 60 }
  })
  constructor(props) {
    super(props);
    this.state = {
      name: User.name,
      email: User.email,
      phone: User.phone,
      avatar: User.avatar,
      info: "",
      image: User.avatar,
      currentUserfirebase_id: User.firebase_id,
      expoPushToken: '',
      notification: {},
    };
  }
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token.data);
      this.setState({ expoPushToken: token.data });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };
  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addNotificationResponseReceivedListener(this._handleNotification);
  }


  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');

  }

  render() {

    return (
      <View style={styles.DocDashboardContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("PatientList")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require("../image/sugar.jpg")}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("PatientList")} >Sugar Input</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("MyChat", {
          firebase_id: '23',
          name: 'Dr. Dinesh Ishwar'
        })}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: hp('30%'),
            margin: 5,
            width: wp('47%'),
          }}>
            <Image
              style={{
                flex: 1,
              }}
              source={{ uri: 'https://image.freepik.com/free-vector/family-with-child-doctor-consultation-online-using-medical-care-application-smartphone_121223-256.jpg' }}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("MyChat", {
              firebase_id: '23',
              name: 'Dr. Dinesh Ishwar'
            })}>Consult Doctor</Text>

          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => this.props.navigation.navigate("RecipeDiet")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require("../image/recipe.png")}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("RecipeDiet")} >Recipe</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("MembershipDiet")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require('../image/fitness-membership_53876-47423.jpg')}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("MembershipDiet")} >Membership</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("EventsDiet")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require('../image/events1.jpg')}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("EventsDiet")} >Upcoming Events</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("PatientList")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require('../image/close-up-doctor-with-fruits-vegetables-writing_23-2148302127.jpg')}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("PatientList")} >Consult Patient</Text>

          </View>
        </TouchableOpacity>


      </View>
    );
  }
}







class Student_Screen extends Component {

  static navigationOptions =
    {
      title: '',

    };
  constructor(props) {
    super(props);

    this.state = {
      name: User.name,
      email: User.email,
      phone: User.phone,
      doctorStatus: User.doctorStatus,
      avatar: User.avatar,
      info: "",
      image: User.avatar

    };
  }
  gotoNextActivity = () => {
    this.props.navigation.navigate('Forth');

  }
  takeAndUploadPhotoAsync = async () => {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      this.setState({
        image: result.uri
      });
      return;
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', { uri: localUri, name: filename, type });
    formData.append('phone', this.state.phone);
    return await fetch(Globals.base_url + 'apptapp/Sugar/uploadProfileImage.php', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },

    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          image: res.url
        });
        console.log(res)

      });
  }

  render() {
    let { image } = this.state;
    return (

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={this.takeAndUploadPhotoAsync}>

              {image &&
                <Image source={{ uri: image }} style={styles.avatar} />}
            </TouchableOpacity>

            <Text style={styles.name}>{this.state.name} </Text>
            <Text style={styles.userInfo}>{this.state.email} </Text>
            <Text style={styles.userInfo}>{this.state.phone} </Text>

          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/home--v2.png' }} />
            </View>
            <View style={styles.infoContent}>


              <Button
                title='Home'
                onPress={() => this.props.navigation.navigate("DieticieanDashboard")}
                titleStyle={{
                  color: '#778899',
                  fontSize: 18,
                  marginTop: 5,
                  fontStyle: 'italic'
                }}
                type='clear'
              />
            </View>
          </View>



          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/about.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='About Us'
                onPress={() => this.props.navigation.navigate("AboutUs")}
                titleStyle={{
                  color: '#778899',
                  fontSize: 18,
                  marginTop: 5,
                  fontStyle: 'italic'
                }}
                type='clear'
              />
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/add-contact-to-company.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='Contact Us'
                onPress={() => this.props.navigation.navigate("ContactUs")}
                titleStyle={{
                  color: '#778899',
                  fontSize: 18,
                  marginTop: 5,
                  fontStyle: 'italic'
                }}
                type='clear'
              />
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/privacy-policy.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='Privacy Policy'
                onPress={() => this.props.navigation.navigate("Privacy")}
                titleStyle={{
                  color: '#778899',
                  fontSize: 18,
                  marginTop: 5,
                  fontStyle: 'italic'
                }}
                type='clear'
              />
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/shutdown.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='Logout'
                onPress={() =>
                  Alert.alert(
                    'Log out',
                    'Do you want to logout?',
                    [
                      { text: 'Cancel', onPress: () => { return null } },
                      {
                        text: 'Confirm', onPress: () => {
                          AsyncStorage.clear();
                          this.props.navigation.navigate('Auth')
                        }
                      },
                    ],
                    { cancelable: false }
                  )
                }
                titleStyle={{
                  color: '#778899',
                  fontSize: 18,
                  marginTop: 5,
                  fontStyle: 'italic'
                }}
                type='clear'
              />
            </View>
          </View>

        </View>
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
      fontWeight: '200'
    }
  }

});

const First_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_1,
    navigationOptions: ({ navigation }) => ({
      title: ' ',
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
});

const Second_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_2,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile ',
      headerTitleStyle: {
        fontStyle: 'italic'
      },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#74cdf0',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on 
		marginTop: 0,
        height: Dimensions.get('window').height / 8

      },
      headerTintColor: '#fff',

    })
  },
});


const MyDrawerNavigator = createDrawerNavigator({

  Home: {
    screen: First_2_Tabs,
  },

  Profile: {
    screen: Second_2_Tabs,
  },


},
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 130,
  },
  {
    contentComponent: (props) => (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />
          <TouchableOpacity onPress={() =>
            Alert.alert(
              'Log out',
              'Do you want to logout?',
              [
                { text: 'Cancel', onPress: () => { return null } },
                {
                  text: 'Confirm', onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.navigate('Auth')
                  }
                },
              ],
              { cancelable: false }
            )
          }>
            <Text style={{ margin: 16, fontWeight: 'bold', }}>Logout</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  },

);

export default createAppContainer(MyDrawerNavigator);

