import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard } from 'react-native';
import Globals from '../Globals';

export default class LoginView extends React.Component {
  static navigationOptions = {
    title: 'LoginView',
    header: null,
  }
  constructor(props) {
    super(props);
    this.state = {

      phone: "",
      password: "",
    }

  }

  parseJsonForUserInfo(res) {
    userInfo = {
      'email': res.email,
      'name': res.name,
      'phone': this.state.phone,
    };
    return userInfo;
  }
  launchAppropriateView(res) {
    Keyboard.dismiss();
    var { navigate } = this.props.navigation;
    if (res.doctorStatus == "doctor") {
      navigate("Dashboard", this.parseJsonForUserInfo(res));
    }
    else if (res.doctorStatud == "patient") {
      navigate("pro1", this.parseJsonForUserInfo(res));
    }
    else {
      alert(res.errorCode);
    }
  }
  handleLoginPress = () => {
    try {
      const myRequest = new Request('http://192.168.1.108/User_Project/Back-end/Controller/LoginController.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: this.state.phone,
          password: this.state.password,
        })
      });
      fetch(myRequest)
        .then((response) => response.json())
        .then((res) => {
          this.launchAppropriateView(res);
        });
    }
    catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          BTD
        </Text>
        <View>
          <TextInput
            style={styles.credential}
            autoFocus={true}
            placeholder="Enter Phone Number"
            onChangeText={phone => this.setState({ phone: phone })}
          />
          <TextInput
            style={styles.credential}
            secureTextEntry={true}
            placeholder="Enter Password"
            onChangeText={password => this.setState({ password: password })}
          />
        </View>
        <Button
          color='#000051'
          onPress={this.handleLoginPress}
          title='Login'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#534bae',

  },
  header: {
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 54,
    marginBottom: 40,
    backgroundColor: '#000051',
    color: 'white',

  },
  credential: {
    height: 60,
    fontSize: 28,
    marginBottom: 40,
    color: 'white',
  },
});