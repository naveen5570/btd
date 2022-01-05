import React, { Component } from 'react';

import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

import { scale, scaleVertical } from "./utilities/scale";

class MainActivity extends Component {

  static navigationOptions =
    {
      title: 'Sugar Input Value'

    };


  constructor(props) {

    super(props)

    this.state = {

      TextInput_Name: '',
      language: [],
      TextInput_Number: '',
      data: '',


    }

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
          onChangeText={data => this.setState({ TextInput_Name: data })}
          style={styles.input}
          underlineColorAndroid='transparent'
          keyboardType={'numeric'}
        />


        <TouchableOpacity onPress={() => this.props.navigation.navigate("DefaultScreen1")} activeOpacity={0.7} style={styles.button} >

          <Text style={styles.buttonText}> ADD </Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("screen7")} activeOpacity={0.7} style={styles.button} >

          <Text style={styles.buttonText}> CANCEL </Text>

        </TouchableOpacity>


      </View>


    );
  }
}



export default MainActivity;
  

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
    fontSize: 18

  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,

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
    textAlign: 'center'

  },

});