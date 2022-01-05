import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Platform, ActivityIndicator, SafeAreaView, Alert, AsyncStorage } from 'react-native';
import { Button, CheckBox } from 'react-native-elements'
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import CustomSidebarMenu from './CustomSidebarMenu';
import PatientProfile from './PatientProfile';

import AboutUs from '../Profile/AboutUs';
import ContactUs from '../Profile/ContactUs';
import Globals from '../Globals';


export default class Profile extends Component {

  static navigationOptions =
    {
      title: '',

    };
  constructor(props) {
    super(props);
    var { params } = this.props.navigation.state;
    this.state = {
      name: params.name,
      email: params.email,
      phone: params.phone,
      doctorStatus: params.doctorStatus,
      avatar: params.avatar,
      info: "",
      image: params.avatar

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

        <View style={styles.body}>
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
                          this.props.navigation.navigate('signin3')
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
