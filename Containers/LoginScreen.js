import React from 'react'
import { StyleSheet, Text, View, Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions } from 'react-native'
import Constants from "expo-constants";
import { RkAvoidKeyboard, RkCard } from "react-native-ui-kitten";
import { FontAwesome } from "react-native-vector-icons";
import { scale, scaleVertical } from "./utilities/scale";
import GradientButton from "react-native-gradient-buttons";
import { Button, CheckBox } from 'react-native-elements'
console.disableYellowBox = true;
export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.all}>
        
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
              onPressAction={() => this.props.navigation.navigate("drawerStack")}
            />
            <View style={styles.textRow}>


              <View style={{ marginTop: 8 }}>
                <Button
                  title='Forgot Password'
                  onPress={() => this.props.navigation.navigate("forgottenPasswordScreen")}
                  titleStyle={{
                    color: '#039BE5'
                  }}
                  type='clear'
                />
              </View>

            </View>
            <View style={styles.footer}>

          <Button
            title='Don&rsquo;t have an account? SignUp'
            onPress={() => this.props.navigation.navigate("signupScreen")}
            titleStyle={{
              color: '#039BE5'
            }}
            type='clear'
          />
        </View>
       

        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linky: {
    fontWeight: 'bold',
    color: '#4C3E54',
    paddingTop: 10
  },
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
    marginTop: scaleVertical(14),
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    justifyContent: "center"
  },
  content: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: scaleVertical(300),
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "rgb(255, 255, 255)",
    borderTopWidth: 50,

  },
  input: {
    borderWidth: 0.5,
    borderColor: "#D3D3D3",
    borderRadius: 50,
    padding: 20,
    marginVertical: scaleVertical(4),
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
})
