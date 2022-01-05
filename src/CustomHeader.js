//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import User from '../User';
import Globals from '../Globals';

export default class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: User.name,
      email: User.email,
      phone: User.phone,
      doctorStatus: User.doctorStatus,
      avatar: User.avatar,
      info: "",
      image: User.avatar,
      patient_id: User.patient_id

    };


    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      'https://bootdey.com/img/Content/avatar/avatar6.png';
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [

      {
        navOptionThumb: 'info',
        navOptionName: 'Profile',
        screenToNavigate: 'Profile',
      },
      {
        navOptionThumb: 'card-membership',
        navOptionName: 'My Subscriptions',
        screenToNavigate: 'MySubscriptions',
      },

      {
        navOptionThumb: 'call-to-action',
        navOptionName: 'Know Your Prakirti ',
        screenToNavigate: 'KnowYourPrakirti',
      },
      {
        navOptionThumb: 'help',
        navOptionName: 'FAQs',
        screenToNavigate: 'FAQ',
      },
      {
        navOptionThumb: 'help',
        navOptionName: 'Health Partners',
        screenToNavigate: 'Healthpartners',
      },
      {
        navOptionThumb: 'info',
        navOptionName: 'AboutUs',
        screenToNavigate: 'AboutUs',
      },
      {
        navOptionThumb: 'message',
        navOptionName: 'ContactUs',
        screenToNavigate: 'ContactUs',
      },


    ];
  }
  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'Auth' })]
    })
    this.props.navigation.dispatch(actionToDispatch)
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
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <TouchableOpacity onPress={this.takeAndUploadPhotoAsync}>

          {image &&
            <Image source={{ uri: image }} style={styles.avatar} />}
        </TouchableOpacity>
        <Text style={styles.name}>{this.state.name} </Text>
        <Text style={styles.userInfo}>{this.state.email} </Text>
        <Text style={styles.userInfo}>{this.state.phone} </Text>
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              key={key}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.currentScreenIndex === key ? 'red' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',


  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
});