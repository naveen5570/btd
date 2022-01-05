import React, { Component } from 'react';
import {
  StyleSheet, Dimensions, Text, View, TouchableOpacity, Image, Dimensions, Platform, ActivityIndicator, SafeAreaView, Alert, AsyncStorage } from 'react-native';
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
import AboutUs from '../../Profile/AboutUs';
import ContactUs from '../../Profile/ContactUs';
import User from '../../User';
import styles from '../constants/styles';
import Globals from '../../Globals';


class HamburgerIcon extends Component {

  toggleDrawer = () => {

    this.props.navigationProps.toggleDrawer();

  }
  _onPressDrawer(txt) {
    // alert("You add Item");
    this.refs.CustomSidebarMenu.showCustomSidebarMenu();
  }
  render() {

    return (

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
            style={{ width: 35, height: 35, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: <HamburgerIcon navigationProps={navigation} />,
    headerStyle: {
      backgroundColor: '#F6F9FC',
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0,
      textAlign: 'center',
      marginLeft: '0%',
      height: 25,
	  marginTop: 0,
        height: Dimensions.get('window').height / 8
      // remove shadow on iOS
    },
    headerTintColor: '#000000',
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
      currentUserfirebase_id: User.firebase_id
    };
  }


  render() {

    return (
      <View style={styles.DocDashboardContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Sugardoc1")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require("../image/sugar.jpg")}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Sugardoc1")} >Sugar Input</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Sugardoc1")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require("../image/bp1.jpg")}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Sugardoc1")} >BP Input</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => this.props.navigation.navigate("Recipe")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require("../image/recipe.png")}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Recipe")} >Recipe</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("Membership")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require('../image/fitness-membership_53876-47423.jpg')}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Membership")} >Membership</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("Events")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require('../image/events1.jpg')}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Events")} >Upcoming Events</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatScreen")}>
          <View style={styles.DocDashboardContainerView}>
            <Image
              style={styles.DocDashboardImage}
              source={require('../image/close-up-doctor-with-fruits-vegetables-writing_23-2148302127.jpg')}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("ChatScreen")} >Consult Nutritionist</Text>

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
            <Text style={styles.userInfo}>{this.state.doctorStatus} </Text>
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
                onPress={() => this.props.navigation.navigate("Dashboard")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 5,

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
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 5,

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
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 5,

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
                onPress={() => this.props.navigation.navigate("")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 5,

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
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 5,

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
    screen: Dashboard,
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
      title: 'Home',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#F6F9FC',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
        textAlign: 'center',
        marginLeft: '0%',
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
});


const MyDrawerNavigator = createDrawerNavigator({

  Home: {

    screen: First_2_Tabs,

  },

  Profile: {

    screen: Second_2_Tabs,

  },
  AboutUs: {
    screen: AboutUs,
  },
  ContactUs: {
    screen: ContactUs,
  }

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

