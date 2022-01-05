import Constants from 'expo-constants';
import { TextInput } from 'react-native';
import React, { Component, Fragment } from 'react'
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'
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
        <FormInput

          style={styles.textInput}
          lable="mobile_number"
          name="mobile_number"
          iconName='ios-phone-portrait'
          value={this.state.mobile_number}
          onChangeText={mobile_number => this.setState({ mobile_number })}
          placeholder="Enter mobile number"
          mode="outlined"

        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.validateNumber()}
          >
            <FormButton
              buttonType='outline'
              title='Send OTP'
              buttonColor='#00b8ff'
              onPress={() => this.validateNumber()}> Send OTP</FormButton>
          </TouchableOpacity>
        </View>
        <FormInput
          style={{ marginTop: 20, marginHorizontal: 15, }}
          lable="OTP"
          placeholder="Enter OTP"
          mode="outlined"
          iconName='ios-phone-portrait'
          value={this.state.otp}
          onChangeText={otp => this.setState({ otp })}
          secureTextEntry={false}

        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.verifyNumber({})}

          >
            <FormButton
              buttonType='outline'
              title='Confirm and Continue'
              buttonColor='#00b8ff'
              onPress={() => this.props.navigation.navigate("UserInformation", { mobile_number: this.state.mobile_number })}> Confirm and Continue </FormButton>


          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

  },
  text: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 20,
  },
  textInput: {

    marginTop: 160,
    marginHorizontal: 15,

  },
  buttonContainer: {
    margin: 25
  },
  submitButton: {
    backgroundColor: '#FFF',
    padding: 6,
    fontSize: 20,
    margin: 25,
    marginHorizontal: 30,
    height: 40,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#F57C00',
  },

});

export default OTP;

