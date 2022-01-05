import React, { Component } from 'react';
import flatListData from '../data/flatListData';
import medicineListData from '../data/medicineListData';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, Platform, ToastAndroid, Dimensions, Vibration, ActivityIndicator, SafeAreaView, Alert, AsyncStorage
} from 'react-native';
import { Button } from 'react-native-elements'
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import CustomHeader from './CustomHeader';
import Profile from './Profile';
import User from '../User';
import moment from "moment";
import Globals from '../Globals';

import { firebaseConfig } from './Chatapi/index';

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

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 50, marginVertical: 10, top: 5 }}>

        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >

          <Image
            source={require("./image/menu.png")}
            style={{ tintColor: 'white', resizeMode: 'contain', width: 30, height: 30, marginLeft: 10 }}
          />

        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginLeft: 30, flexWrap: 'wrap', }}>

          <Text style={{ fontSize: 18, fontWeight: '300', marginLeft: 110, marginTop: 8, fontStyle: 'italic' }}>{User.name}</Text>

        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 10, flexWrap: 'nowrap', }} >
          <TouchableOpacity onPress={() => this.props.navigationProps.navigate('Profile')} >
            <Image
              source={{ uri: User.avatar }}
              style={{ width: 40, height: 40, borderRadius: 40 / 2, }} />
          </TouchableOpacity>
        </View>


      </View>

    );


  }
}

class Home_Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: User.name,
      email: User.email,
      batch_id: User.batch_id,
      patient_id: User.patient_id,
      phone: User.phone,
      info: "",
      fasting: '',
      pp1: '',
      pp2: '',
      pp3: '',
      bp_max: '',
      bp_min: '',
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

  getSugarData = () => {
    var today = moment().format('YYYY-MM-DD')
    return fetch(Globals.base_url + 'apptapp/Sugar/showsugar.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: this.state.patient_id,
        date: today,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.result == 1) {
          this.setState({
            fasting: responseJson.data[0].fasting,
            pp1: responseJson.data[0].pp1,
            pp2: responseJson.data[0].pp2,
            pp3: responseJson.data[0].pp3
          })
        }
        /* this.props.navigation.navigate('SugarInput1', {
           fasting: this.state.fasting,
           pp1: this.state.pp1,
           pp2: this.state.pp2,
           pp3: this.state.pp3
         });*/
      }).catch((error) => {
        console.error(error);
      });
  }


  getBPData = () => {
    var today = moment().format('YYYY-MM-DD')
    return fetch(Globals.base_url + 'apptapp/Sugar/showbp.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: this.state.patient_id,
        date: today,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.result == 1) {
          this.setState({
            bp_max: responseJson.data[0].bp_max,
            bp_min: responseJson.data[0].bp_min,
          })
        }

      }).catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addNotificationResponseReceivedListener(this._handleNotification);
  }


  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');
  }

  gotoDoctorChat = () => {
    if (User.approved == 1) {
      this.props.navigation.navigate('MyChat', {
        firebase_id: '23',
        name: 'Dr. Dinesh Ishwar'
      });
    } else {
      ToastAndroid.show('Your Account Is Not Approved Yet By Doctor', ToastAndroid.SHORT)
    }
  }

  gotoDieticianChat = () => {
    if (User.approved == 1) {
      this.props.navigation.navigate('MyChat', {
        firebase_id: '27',
        name: 'Dietitian'
      });
    } else {
      ToastAndroid.show('Your Account Is Not Approved Yet By Doctor', ToastAndroid.SHORT)
    }
  }


  gotosugarInput = () => {
    if (User.approved == 1) {
      this.getSugarData();
      this.getBPData();
      this.props.navigation.navigate('SugarInput1', {
        bp_max: this.state.bp_max,
        bp_min: this.state.bp_min,
        fasting: this.state.fasting,
        pp1: this.state.pp1,
        pp2: this.state.pp2,
        pp3: this.state.pp3
      });
    } else {
      ToastAndroid.show('Your Account Is Not Approved Yet By Doctor', ToastAndroid.SHORT)
    }
  }

  gotobpInput = () => {
    this.getBPData();
  }



  redirectaddmedi = () => {
    return fetch(Globals.base_url + 'apptapp/Sugar/RecommendedMedicine.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: this.state.patient_id,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.result)

        flatListData.length = 0;
        // flatListData.splice(0,flatListData.length)
        if (responseJson.result == 1) {
          responseJson.data.medicine.map(rx =>
            flatListData.push(rx)
          )
        }
        this.props.navigation.navigate("addmedi1", {
          patient_id: this.state.patient_id,
          name: this.state.name,
          email: this.state.email,
          batch_id: this.state.batch_id,
          phone: this.state.phone
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  rxhistory = () => {
    return fetch(Globals.base_url + 'apptapp/Sugar/RecommendedMedicineHistory.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: this.state.patient_id,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        medicineListData.length = 0;
        // medicineListData.splice(0,medicineListData.length)
        if (responseJson.result == 1) {
          responseJson.datsa.map(record =>
            medicineListData.push(record)
          )
        }
        this.props.navigation.navigate("")
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.gotosugarInput(); }}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: (Dimensions.get('window').height / 4) - (0.03 * Dimensions.get('window').height),

            width: wp('47%'),
            margin: (0.005 * Dimensions.get('window').height),
            marginLeft: 5,
            marginRight: 5,
            marginTop: (0.01 * Dimensions.get('window').height),

          }}>
            <Image
              style={{
                flex: 1,

                width: wp('47%')
              }}
              source={require("./image/sugar.jpg")} />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => { this.gotosugarInput(); }} >Sugar & BP Input </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("BTDMessaging")}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: (Dimensions.get('window').height / 4) - (0.03 * Dimensions.get('window').height),

            width: wp('47%'),
            margin: (0.005 * Dimensions.get('window').height),
            marginLeft: 5,
            marginRight: 5,
            marginTop: (0.01 * Dimensions.get('window').height),
          }}>
            <Image
              style={{
                flex: 1,

                width: wp('47%')

              }}
              source={require("./image/broadcasts2.jpg")} />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("BTDMessaging")}>BTD Messaging</Text>
          </View>
        </TouchableOpacity >
        <TouchableOpacity onPress={() => { this.gotoDoctorChat(); }}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: (Dimensions.get('window').height / 4) - (0.03 * Dimensions.get('window').height),

            width: wp('47%'),
            margin: (0.005 * Dimensions.get('window').height),
            marginLeft: 5,
            marginRight: 5,

          }}>
            <Image
              style={{
                flex: 1,

                width: wp('47%')
              }}
              source={require("./image/consult-doctor.jpg")}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => { this.gotoDoctorChat(); }}> Consult Doctor</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.rxhistory(); this.redirectaddmedi(); }} >
          <View style={{
            backgroundColor: '#F7F7F7',
            height: (Dimensions.get('window').height / 4) - (0.03 * Dimensions.get('window').height),
            width: wp('47%'),
            margin: (0.005 * Dimensions.get('window').height),
            marginLeft: 5,
            marginRight: 5,
          }}>
            <Image
              style={{
                flex: 1,
                width: wp('47%')
              }}
              source={require("./image/medicine.jpg")}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => { this.rxhistory(); this.redirectaddmedi(); }} >Medicine</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Recipe1")}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: (Dimensions.get('window').height / 4) - (0.03 * Dimensions.get('window').height),
            width: wp('47%'),
            margin: (0.005 * Dimensions.get('window').height),
            marginLeft: 5,
            marginRight: 5,
          }}>
            <Image
              style={{
                flex: 1,
                width: wp('47%')
              }}
              source={require("./image/recipe.jpg")}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Recipe1")} >Recipes</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("Membership1")}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: (Dimensions.get('window').height / 4) - (0.03 * Dimensions.get('window').height),
            width: wp('47%'),
            margin: (0.005 * Dimensions.get('window').height),
            marginLeft: 5,
            marginRight: 5,
          }}>
            <Image
              style={{
                flex: 1,
                width: wp('47%'),
                borderWidth: 1,
                borderColor: "#f3f3f3",
              }}
              source={require("./image/membership.jpg")}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Membership1")} >Memberships</Text>
          </View>
        </TouchableOpacity >

        <TouchableOpacity onPress={() => this.props.navigation.navigate("Events1")}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: (Dimensions.get('window').height / 4) - (0.03 * Dimensions.get('window').height),
            width: wp('47%'),
            margin: (0.005 * Dimensions.get('window').height),
            marginLeft: 5,
            marginRight: 5,
          }}>
            <Image
              style={{
                flex: 1,
                width: wp('47%')

              }}
              source={require("./image/events1.jpg")} />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Events1")} >Upcoming Events</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.gotoDieticianChat(); }}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: (Dimensions.get('window').height / 4) - (0.03 * Dimensions.get('window').height),
            width: wp('47%'),
            margin: (0.005 * Dimensions.get('window').height),
            marginLeft: 5,
            marginRight: 5,

          }}>
            <Image
              style={{
                flex: 1,
                width: wp('47%'),
                borderWidth: 1,
                borderColor: "#f3f3f3",
              }}
              source={require("./image/consult-nutrishnist.jpg")}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => { this.gotoDieticianChat(); }}>Consult Nutritionist</Text>

          </View>
        </TouchableOpacity>
      </View >
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
      batch_id: User.batch_id,
      patient_id: User.patient_id,
      phone: User.phone,
      avatar: User.avatar,
      info: "",
      image: User.avatar,

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

        <View style={styles.body}>
          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/membership-card.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='My Subscriptions'
                onPress={() => this.props.navigation.navigate("MySubscriptions")}
                titleStyle={{
                  color: '#778899',
                  fontSize: 18,
                  marginTop: 12,
                  fontStyle: 'italic'
                }}
                type='clear'
              />

            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/mobile-payment.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='Payment History'
                onPress={() => this.props.navigation.navigate("PaymentHistory")}
                titleStyle={{
                  color: '#778899',
                  fontSize: 18,
                  marginTop: 12,
                  fontStyle: 'italic'
                }}
                type='clear'
              />
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/survey.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='Know Your Prakirti'
                onPress={() => this.props.navigation.navigate("KnowYourPrakirti")}
                titleStyle={{
                  color: '#778899',
                  fontSize: 18,
                  marginTop: 12,
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
                  marginTop: 12,
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
                  marginTop: 12,
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
                  marginTop: 12,
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
                  marginTop: 12,
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
        fontSize: 30,
        marginLeft: '0%',
        height: Dimensions.get('window').height / 9,
        marginTop: 0,
        height: Dimensions.get('window').height / 8

        // remove shadow on iOS
      },
      headerTintColor: '#000000',
    })
  },
});

const Second_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_2,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      headerTitleStyle: {
        fontStyle: 'italic'
      },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#74cdf0',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        fontSize: 30,
        marginTop: 0,
        height: Dimensions.get('window').height / 8
      },
      headerTintColor: '#fff',

    })
  },
});

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: First_2_Tabs,
    },
    Profile: {
      screen: Second_2_Tabs,
    },


  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomHeader,
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
  }
);
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
  container: {

    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  box: {
    backgroundColor: '#00BCD4',
    height: 150,
    margin: 5,
    width: 170,

  },
  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0

  },

  GridViewBlockStyle: {

    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 150,
    margin: 5,
    backgroundColor: '#00BCD4'

  }
  ,

  GridViewInsideTextItemStyle: {

    color: '#000000',
    padding: 10,
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
    fontStyle: 'italic'

  },
  itemIcon: {
    color: '#00b8ff',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  header: {
    backgroundColor: "#ffffff",
    width: '100%'
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    width: '100%'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  avatarplaceholder: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    backgroundColor: 'aqua'
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
    fontStyle: 'italic'
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
    fontStyle: 'italic'

  },
  body: {
    backgroundColor: "#ffffff",
    height: '80%',
    width: '100%',
    alignItems: 'center',


  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
    marginLeft: -280,
    marginTop: "-5%"
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 2,
    marginLeft: 10,
  },
  info: {
    fontSize: 18,
    marginTop: 2,
    color: "#000000",
  }

});