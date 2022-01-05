import React, { Component } from 'react';

import { StyleSheet, Text, View, Button, TouchableOpacity, Image, TextInput } from 'react-native';

import { createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
import { scale, scaleVertical } from "../src/utilities/scale";
import GradientButton from "react-native-gradient-buttons";
class HamburgerIcon extends Component {

  toggleDrawer = () => {

    this.props.navigationProps.toggleDrawer();

  }

  render() {

    return (

      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >

          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />

        </TouchableOpacity>

      </View>

    );


  }
}

class Home_Screen extends Component {


  static navigationOptions =
    {
      title: 'Home',

    };

  constructor() {
    super()
    this.state = {
      text: ''
    }
  }
  handleChangeText = (typedText) => {
    this.setState({ text: typedText }, () => {
      console.log(this.state.text);
    });
  }
  handleSubmit = () => {
    this.props.navigation.navigate("DefaultScreen");
  };

  Send_Data_Function = () => {

    this.props.navigation.navigate('Second', {
      NameOBJ: this.state.TextInput_Name,
      NumberOBJ: this.state.TextInput_Number

    });

  }
  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');

  }


  render() {

    return (

      <View style={styles.inputContainer}>
        <Text style={styles.textStyle}>
          Your Vital Logs
      </Text>

        <TextInput
          placeholder="Input B.P Level"
          onChangeText={this.handleChangeText}
          value={this.state.text}
          style={styles.input}
          underlineColorAndroid='transparent'
          keyboardType={'numeric'}
        />


        <View style={styles.buttonContainer}>
          <GradientButton
            style={{ marginTop: 8 }}
            textStyle={{ fontSize: 20 }}
            height={50}
            text=" Add"
            buttonColor='#00b8ff'
            gradientBegin="#00b8ff"
            gradientEnd="#0083ff"

            onPressAction={this.handleSubmit}> Add </GradientButton>
        </View>
        <View style={styles.buttonContainer}>
          <GradientButton
            style={{ marginTop: 8 }}
            textStyle={{ fontSize: 20 }}
            height={50}
            text=" Cancel"
            buttonColor='#00b8ff'
            gradientBegin="#00b8ff"
            gradientEnd="#0083ff"


            onPressAction={() => this.props.navigation.navigate("BPValue1")}

          />
        </View>



      </View>

    );
  }
}

class Settings_Screen extends Component {

  static navigationOptions =
    {
      title: 'Settings',
    };

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Settings Screen Activity.</Text>

      </View>
    );
  }
}

class Student_Screen extends Component {

  static navigationOptions =
    {
      title: 'Student',

    };

  gotoNextActivity = () => {
    this.props.navigation.navigate('Forth');

  }

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Student Screen Activity.</Text>

        <Button onPress={this.gotoNextActivity} title='Open Details Activity' />

      </View>
    );
  }
}

class Details_Screen extends Component {

  static navigationOptions =
    {
      title: 'Details Screen',

    };

  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');

  }

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Details Screen Activity.</Text>

      </View>
    );
  }
}

export const Tab_1 = createMaterialTopTabNavigator({
  First: {
    screen: Home_Screen,
  },

}, {
  tabBarPosition: 'top',

  swipeEnabled: true,

  tabBarOptions: {

    activeTintColor: '#fff',
    pressColor: '#004D40',
    inactiveTintColor: '#fff',
    style: {
      marginTop: -50,
      backgroundColor: '#00B8D4'

    },

    labelStyle: {
      fontSize: 16,
      fontWeight: '200',
      textAlign: 'center'
    }
  }

});

export const Tab_2 = createMaterialTopTabNavigator({
  Third: {
    screen: Student_Screen,
  },
  Forth: {
    screen: Details_Screen,
  }
}, {
  tabBarPosition: 'top',

  swipeEnabled: true,

  tabBarOptions: {

    activeTintColor: '#fff',
    pressColor: '#004D40',
    inactiveTintColor: '#fff',
    style: {

      backgroundColor: '#00B8D4'

    },

    labelStyle: {
      fontSize: 16,
      fontWeight: '200'
    }
  }

});

const First_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_1,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#F6F9FC',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
        textAlign: 'center',
        marginLeft: '0%'
        // remove shadow on iOS
      },
      headerTintColor: '#000000',
    })
  },
});

const Second_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_2,
    navigationOptions: ({ navigation }) => ({
      title: 'Second Screen',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#00B8D4',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#fff',
    })
  },
});

const MyDrawerNavigator = createDrawerNavigator({

  Home: {

    screen: First_2_Tabs,

  },

  Settings: {

    screen: Second_2_Tabs,

  }

});

export default createAppContainer(MyDrawerNavigator);

const styles = StyleSheet.create({

  MainContainer: {

    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 11

  },

  text:
  {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
  MainContainer: {

    alignItems: 'center',
    flex: 1,
    margin: 8
  },

  textInputStyle: {

    height: 40,
    width: '80%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#028b53',
    borderRadius: 8,
    marginTop: 8
  },

  button: {

    width: '90%',
    height: 40,
    padding: 10,
    backgroundColor: '#00b8ff',
    borderRadius: 8,
    marginTop: 15
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

  textStyle: {

    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 50,

  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#e8f7ff',
    marginTop: 0,

  },
  input: {
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderColor: "#D3D3D3",
    borderRadius: 30,
    padding: 50,
    marginVertical: scaleVertical(15),
    fontWeight: "bold",
    fontSize: 33,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 50,
    textAlign: 'center'

  },
  buttonContainer: {
    margin: 5,
    marginTop: 5,
    padding: 10,

  },

});