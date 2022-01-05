import React, { Component } from 'react';
import { scale, scaleVertical } from "./utilities/scale";
import GradientButton from "react-native-gradient-buttons";
import { StyleSheet, TextInput, View, Alert, Button, Text, ToastAndroid } from 'react-native';
//import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import User from '../User';
import Globals from '../Globals';

class MainProject extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    var { params } = this.props.navigation.state;
    console.log(params)
    this.state = {
      mobile_number: params.mobile_number,
      UserName: '',
      UserPassword: '',
      ConfirmPassword: '',
      expoPushToken: '',
      notification: {},
    }
  }

  componentDidMount() {
    this.registerForPushNotifications();
  }

  registerForPushNotifications = async () => {

    const { status } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = status;
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
      );
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token.data);
    this.setState({ expoPushToken: token.data });

  }

  UserRegistrationFunction = () => {
    if (this.state.UserPassword == '') {
      ToastAndroid.show("Please Enter Password", ToastAndroid.SHORT);
    } else if (this.state.UserPassword != this.state.ConfirmPassword) {
      ToastAndroid.show("Password Mismatch", ToastAndroid.SHORT);
    } else {
      fetch(Globals.base_url + 'apptapp/Sugar/Register.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.UserName,
          phone: this.state.mobile_number,
          password: this.state.UserPassword,
          deviceToken: this.state.expoPushToken,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.result == '1') {

            ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
            this.props.navigation.navigate('SignIn1');
            // Showing response message coming from server after inserting records.
          }
          else {
            ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
          }
        }).catch((error) => {
          console.error(error);
        });
    }
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          placeholder="Enter Full Name"
          onChangeText={UserName => this.setState({ UserName })}
          underlineColorAndroid='transparent'
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Phone Number"
          value={this.state.mobile_number}
          onChangeText={mobile_number => this.setState({ mobile_number })}
          editable={false}
          underlineColorAndroid='transparent'
          style={styles.input}
        />
        <TextInput
          placeholder="Enter User Password"
          onChangeText={UserPassword => this.setState({ UserPassword })}
          underlineColorAndroid='transparent'
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm Password"
          onChangeText={ConfirmPassword => this.setState({ ConfirmPassword })}
          underlineColorAndroid='transparent'
          style={styles.input}
          secureTextEntry={true}
        />
        <GradientButton
          style={{ marginTop: 8 }}
          textStyle={{ fontSize: 20 }}
          text="SUBMIT"
          height={50}
          gradientBegin="#00b8ff"
          gradientEnd="#0083ff" onPressAction={this.UserRegistrationFunction} color="#2196F3" />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#e8f7ff',
  },
  TextInputStyleClass: {
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 5,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#00b8ff",
    borderRadius: 50,
    padding: 18,
    marginVertical: scaleVertical(6),
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 20
  },

});

export default MainProject;