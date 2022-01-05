
import React, { Component, Fragment } from 'react'
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { scale, scaleVertical } from "./utilities/scale";

import GradientButton from "react-native-gradient-buttons";
import Globals from '../Globals';

class VerifyOTP extends React.Component {
  constructor(props) {

    super(props);
    console.log(this.props)
    var { params } = this.props.navigation.state;
    console.log(params)
    this.state = {
      mobile_number: params.mobile_number,
      otp: "",
      session_id: params.session_id,
    }
  }

  verifyNumber = () => {
    const { mobile_number, otp, session_id } = this.state
    if (otp == '') {
      ToastAndroid.show("Enter OTP Sent To Your Number", ToastAndroid.SHORT);
      return false
    }

    let urr = 'https://2factor.in/API/V1/5b1a9203-8f78-11ea-9fa5-0200cd936042/SMS/VERIFY/' + session_id + '/' + otp;
    fetch(urr)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.Status == 'Success') {
          console.log(JSON.stringify(responseJson))
          this.props.navigation.navigate('Userinformation2', { mobile_number: this.state.mobile_number });
        } else {
          ToastAndroid.show(responseJson.Details, ToastAndroid.SHORT);
        }
      })
      .catch(error => console.log(error)) //to catch the errors if any

  }

  render() {

    //const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Enter The OTP Receive Sent On Your {this.state.mobile_number}
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
          label="OTP"
          placeholder="Enter OTP"
          mode="outlined"
          iconName='ios-phone-portrait'
          value={this.state.otp}
          onChangeText={otp => this.setState({ otp })}
          secureTextEntry={false}
          textAlign='center'

        />
        <View style={styles.buttonContainer}>

          <GradientButton
            style={{ marginTop: 8 }}
            textStyle={{ fontSize: 20 }}
            text="Submit"
            height={50}
            gradientBegin="#00b8ff"
            gradientEnd="#0083ff"

            onPressAction={() => this.verifyNumber()}
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

export default VerifyOTP;

