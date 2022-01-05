import React from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Dimensions, ToastAndroid,
} from "react-native";
import Constants from "expo-constants";
import { RkAvoidKeyboard, RkCard } from "react-native-ui-kitten";
import { scale, scaleVertical } from "./utilities/scale";
import GradientButton from "react-native-gradient-buttons";
import { Button, CheckBox } from 'react-native-elements';
import Globals from '../Globals';


const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: scaleVertical(24),
    paddingHorizontal: scale(16),
    flex: 1,
    backgroundColor: '#e8f7ff',
  },

  header: {
    marginTop: 75,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: scaleVertical(100),
    resizeMode: "contain"
  },
  all: {
    marginTop: scaleVertical(24),
    marginLeft: -20,
    marginRight: -20,
    flex: 1,
    justifyContent: "center"
  },
  content: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: scaleVertical(300),
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: '#e8f7ff',
    borderTopWidth: 50,

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
  OR: {
    marginVertical: scaleVertical(12),
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A4A4A"
  },
  socialLogin: {
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  footer: {
    justifyContent: "space-between",
    marginTop: scaleVertical(28),
    paddingHorizontal: 8,
    paddingVertical: scaleVertical(12)
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center"
  }
});


export default class Logout extends React.Component {
  static navigationOptions = {
    title: 'Logout',
    header: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      //Besure to change to "" after dev, 
      phone: "",
      password: "",

    }
  }
  parseJsonForUserInfo(res) {
    userDetail = {
      'user_status': res.userDetail.approved,
      'email': res.userDetail.email,
      'name': res.userDetail.name,
      'role_id': res.userDetail.role_id,
      'phone': res.userDetail.phone,
      'patient_id': res.userDetail.patient_id,
    };
    return userDetail;
  }

  launchAppropriateView(res) {
    Keyboard.dismiss();
    var { navigate } = this.props.navigation;

    if (res.userDetail.doctorStatus == "doctor") {
      //launch doctor view

      navigate("Dashboard1", this.parseJsonForUserInfo(res));
    }
    else if (res.userDetail.doctorStatus == "patient") {
      //launch patient view

      navigate("pro", this.parseJsonForUserInfo(res));
    }
    else {
      alert(res.message);
    }
  }
  handleLoginPress = () => {
    try {
      const myRequest = new Request(Globals.base_url + 'apptapp/Back-end/Controller/LoginController.php', {
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
          ToastAndroid.show(res.message, ToastAndroid.SHORT)

          this.launchAppropriateView(res);
        });
    }
    catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}
      >
        <View style={styles.all}>
          <Text>{this.state.orientation}</Text>
          <RkCard rkType="heroImage shadowed" style={styles.content}>
            <TextInput
              textContentType="phone"
              onChangeText={phone => this.setState({ phone: phone })}
              placeholder="Enter Phone Number"
              keyboardType={'numeric'}
              style={styles.input}
            />
            <TextInput
              textContentType="password"
              onChangeText={password => this.setState({ password: password })}
              secureTextEntry={true}
              placeholder="Enter Password"

              style={styles.input}
            />
            <GradientButton
              style={{ marginTop: 8 }}
              textStyle={{ fontSize: 20 }}
              text="LOGIN"
              height={50}
              gradientBegin="#00b8ff"
              gradientEnd="#0083ff"
              onPressAction={this.handleLoginPress}
            />
            <View style={styles.textRow}>
              <View style={{ marginTop: 8 }}>
                <Button
                  title='Forgot Password'
                  onPress={() => this.props.navigation.navigate("ForgotPassword1")}
                  titleStyle={{
                    color: '#039BE5'
                  }}
                  type='clear'
                />
              </View>
            </View>
          </RkCard>
        </View>
        <View style={styles.footer}>
          <Button
            title='Don&rsquo;t have an account? SignUp'
            onPress={() => this.props.navigation.navigate("SignUp1")}
            titleStyle={{
              color: '#039BE5'
            }}
            type='clear'
          />
        </View>
      </RkAvoidKeyboard>
    );
  }
}


