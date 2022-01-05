import React, { Component } from 'react';

import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import GradientButton from "react-native-gradient-buttons";
import { createStackNavigator } from 'react-navigation';
import { scale, scaleVertical } from "../src/utilities/scale";

class MainActivity extends Component {

  static navigationOptions =
    {
      title: 'Sugar Input Value'

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



  componentDidMount() {
    const data = this.props.navigation.getParam('data', 'Fasting');
    this.setState({
      data: []
    });
  }

  Send_Data_Function = () => {

    this.props.navigation.navigate('Second', {
      NameOBJ: this.state.TextInput_Name,
      NumberOBJ: this.state.TextInput_Number

    });

  }

  render() {
    return (


      <View style={styles.inputContainer}>

        <Text style={styles.textStyle}>
          Input Your Vital Logs For {this.state.data}
        </Text>

        <TextInput
          placeholder="Input Sugar Level"
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


            onPressAction={() => this.props.navigation.navigate("SugarInput1")}

          />
        </View>



      </View>


    );
  }
}

class SecondActivity extends Component {
  static navigationOptions =
    {
      title: 'SecondActivity'

    };

  render() {
    return (

      <View style={styles.MainContainer}>

        <Text style={styles.textStyle}>
          Fasting = {this.props.navigation.state.params.NameOBJ}
        </Text>



      </View>
    );
  }
}

export default Project = createStackNavigator(
  {
    First: { screen: MainActivity },

    Second: { screen: SecondActivity }

  });

const styles = StyleSheet.create({

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
    marginTop: 8,
    backgroundColor: '#fff'
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
    borderColor: "#D3D3D3",
    borderRadius: 30,
    padding: 50,
    marginVertical: scaleVertical(15),
    fontWeight: "bold",
    fontSize: 33,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 50,
    textAlign: 'center',
    backgroundColor: '#fff'

  },

});