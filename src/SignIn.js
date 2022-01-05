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
  Dimensions
} from "react-native";
import Constants from "expo-constants";
import { RkAvoidKeyboard, RkCard } from "react-native-ui-kitten";
import { FontAwesome } from "react-native-vector-icons";
import { scale, scaleVertical } from "./utilities/scale";
import GradientButton from "react-native-gradient-buttons";
import { Button, CheckBox } from 'react-native-elements'
import Globals from '../Globals';

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: scaleVertical(24),
    paddingHorizontal: scale(16),
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)"
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
    backgroundColor: "rgb(255, 255, 255)",
    borderTopWidth: 50,

  },
  input: {
    borderWidth: 0.5,
    borderColor: "#D3D3D3",
    borderRadius: 50,
    padding: 18,
    marginVertical: scaleVertical(6),
    fontWeight: "bold"
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

class SignIn extends React.PureComponent {
  constructor() {

    super()

    this.state = {

      UserName: '',
      UserEmail: '',
      UserPassword: '',
      UserPhn: ''
    }

  }
  state = {
    orientation: ''
  };

  UserRegistrationFunction = () => {

    fetch('http://192.168.1.142/User_Project/auth-screens/user_registration.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        name: this.state.UserName,

        email: this.state.UserEmail,

        password: this.state.UserPassword,

        phn: this.state.UserPhn
      })

    }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });

  }
  componentDidMount() {
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      if (width < height) {
        this.setState({ orientation: 'Portrait' });
      } else {
        this.setState({ orientation: 'landscape' });
      }
    });
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
              textContentType="username"
              onChangeText={name => this.setState({ UserName: name })}
              placeholder="Enter Phone Number"
              placeholderTextColor="#707070"
              style={styles.input}
            />
            <TextInput
              textContentType="password"
              onChangeText={password => this.setState({ UserPassword: password })}
              secureTextEntry={true}
              placeholder="Enter Password"
              placeholderTextColor="#707070"
              style={styles.input}
            />
            <GradientButton
              style={{ marginTop: 8 }}
              textStyle={{ fontSize: 20 }}
              text="LOGIN"
              height={50}
              gradientBegin="#00b8ff"
              gradientEnd="#0083ff"
              onPressAction={() => this.props.navigation.navigate("Dashboard")}
            />
            <View style={styles.textRow}>


              <View style={{ marginTop: 8 }}>
                <Button
                  title='Forgot Password'
                  onPress={() => this.props.navigation.navigate("ForgotPassword")}
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
            onPress={() => this.props.navigation.navigate("SignUp")}
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

export default SignIn;
