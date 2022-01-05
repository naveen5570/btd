
import React, { Component, Fragment } from 'react'
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { scale, scaleVertical } from "./utilities/scale";
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import GradientButton from "react-native-gradient-buttons";
import Globals from '../Globals';

class OTP extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      mobile_number: "",
      otp: "",
      session_id: ""
    }
  }
  validateNumber = () => {
    const { mobile_number } = this.state
    const regex_mobile = /^\d{10}$/;
    if (mobile_number == '') {
      ToastAndroid.show("Enter Mobile number", ToastAndroid.SHORT);
      return false
    }
    fetch('https://2factor.in/API/V1/5b1a9203-8f78-11ea-9fa5-0200cd936042/SMS/' + mobile_number + '/AUTOGEN2/Login')
      .then(response => response.json())
      .then((responseJson) => {
        ToastAndroid.show("OTP Sent successfully", ToastAndroid.SHORT);
        this.setState({
          session_id: responseJson.Details
        })
        console.log(responseJson)
        this.props.navigation.navigate('VerifyOTP', { session_id: this.state.session_id, mobile_number: this.state.mobile_number })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }
  CheckUserExists = () => {
    try {
      const myRequest = new Request(Globals.base_url + 'apptapp/Sugar/checkUserExists.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: this.state.mobile_number,

        })
      });
      fetch(myRequest)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson.result == 1) {
            if (responseJson.exists == 0) {

              this.validateNumber();
            } else {
              alert(responseJson.message);
            }
          } else {
            alert(responseJson.message);
          }
        });
    }
    catch (error) {
      console.log(error);
    }
  }


  render() {

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Enter Your Mobile number
        </Text>
        <TextInput

          style={{
            marginTop: 120, fontSize: 20, margin: 15,
            marginVertical: scaleVertical(6),
            padding: 18,
            borderColor: '#00b8ff',
            borderWidth: .5,
            borderRadius: 50,
            backgroundColor: '#fff',
          }}
          lable="mobile_number"
          name="mobile_number"
          iconName='ios-phone-portrait'
          value={this.state.mobile_number}
          onChangeText={mobile_number => this.setState({ mobile_number })}
          placeholder="Enter mobile number"
          mode="outlined"
          textAlign='center'

        />
        <View style={styles.buttonContainer}>

          <GradientButton
            style={{ marginTop: 8 }}
            textStyle={{ fontSize: 20 }}
            text="Send OTP"

            height={50}
            gradientBegin="#00b8ff"
            gradientEnd="#0083ff"
            onPressAction={() => this.CheckUserExists()}
            disabled={(this.state.mobile_number == '') ? true : false}
          />

        </View>


      </View>

    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#e8f7ff',
  },
  text: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 20,
    fontWeight: "900"
  },
  textInput: {
    margin: 15,
    marginVertical: scaleVertical(6),
    padding: 18,
    borderColor: '#00b8ff',
    borderWidth: .5,
    marginTop: 10,
    borderRadius: 50,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 5,
    marginTop: 5,
    padding: 10,

  },
  submitButton: {
    height: 50,
    borderRadius: 0,
    borderColor: '#03a9f4',


  },

});

export default OTP;

