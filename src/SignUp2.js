
import React, { Component, Fragment } from 'react'
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native'
import { scale, scaleVertical } from "./utilities/scale";
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import GradientButton from "react-native-gradient-buttons";
import Globals from '../Globals';

// You can import from local files

class OTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_number: "",
      otp: "",
      session_id: "eddb26c8-b304-4769-9b66-2af1c91c8fe8"
    }
  }
  validateNumber = () => {
    const { mobile_number } = this.state
    const regex_mobile = /^\d{10}$/;
    if (mobile_number == '') {
      alert('Enter mobile number')
      return false
    }

    fetch('https://2factor.in/API/V1/7fbaed71-1738-11ea-9fa5-0200cd936042/SMS/' + mobile_number + '/AUTOGEN2')
      .then(response => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson))
        this.setState({
          session_id: responseJson.Details
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any

  }
  verifyNumber = () => {
    const { mobile_number, otp, session_id } = this.state

    let urr = 'https://2factor.in/API/V1/7fbaed71-1738-11ea-9fa5-0200cd936042/SMS/VERIFY/' + session_id + '/' + otp;
    fetch(urr)
      .then(response => response.json())
      .then((responseJson) => {
        alert(responseJson.Details);
        console.log(JSON.stringify(responseJson))
      })
      .catch(error => console.log(error)) //to catch the errors if any

  }

  render() {

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Enter Your Mobile number
        </Text>
        <TextInput

          style={styles.textInput}
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
            onPressAction={() => this.validateNumber()}
          />

        </View>
        <TextInput
          style={{
            marginTop: 70, fontSize: 20, margin: 15,
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
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.verifyNumber({})}

          >
            <GradientButton
              style={{ marginTop: 8 }}
              textStyle={{ fontSize: 20 }}
              text=" Confirm and Continue"
              height={50}
              gradientBegin="#00b8ff"
              gradientEnd="#0083ff"
              onPressAction={() => this.props.navigation.navigate("UserInformation", { mobile_number: this.state.mobile_number })}
            />



          </TouchableOpacity>
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
    fontWeight: "400"
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

