import React, { Component } from 'react';
import { scale, scaleVertical } from "./utilities/scale";
import GradientButton from "react-native-gradient-buttons";
import { StyleSheet, TextInput, View, Alert, Button, Text, ToastAndroid } from 'react-native';
import Globals from '../Globals';


class ResetPassword extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    var { params } = this.props.navigation.state;
    console.log(params)
    this.state = {
      mobile_number: params.mobile_number,
      UserPassword: '',
      ConfirmPassword: '',
    }
  }
  ResetPasswordFunction = () => {
    if (this.state.UserPassword == '') {
      ToastAndroid.show("Please Enter Password", ToastAndroid.SHORT);
    } else if (this.state.UserPassword != this.state.ConfirmPassword) {
      ToastAndroid.show("Password Mismatch", ToastAndroid.SHORT);
    } else {
      fetch(Globals.base_url + 'apptapp/Sugar/changePassword.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: this.state.mobile_number,
          password: this.state.UserPassword,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.result == '1') {
            console.log(responseJson)

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
          placeholder="Enter New Password"
          onChangeText={UserPassword => this.setState({ UserPassword })}
          underlineColorAndroid='transparent'
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Renter Password"
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
          gradientEnd="#0083ff" onPressAction={this.ResetPasswordFunction} color="#2196F3" />
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

export default ResetPassword;