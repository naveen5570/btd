import React, { Component } from 'react';

import { StyleSheet, View, Button, TextInput, Text, Picker } from 'react-native';
import GoalInput from '../components/GoalInput';
import { createStackNavigator } from "react-navigation-stack";
import FormButton from '../components/FormButton';
import Globals from '../Globals';

class SwitchExample extends Component {
  static navigationOptions = {
    title: "Sugar Level Input",
    justifyContent: 'center',
    headerStyle: {
      backgroundColor: "#03A9F4"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      marginLeft: '30%',
      alignItems: "center",
    }
  };

  state = {
    choosenIndex: 0,
    language: '',

  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Choose Input Type</Text>

        <Picker style={styles.pickerStyle}
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemPosition) =>
            this.setState({ language: itemValue, choosenIndex: itemPosition })}
        >
          <Picker.Item label="Fasting" value="Fasting" />
          <Picker.Item label="BreakFast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
          <Picker.Item label="BP Min Value" value="BP Min Value" />
          <Picker.Item label="BP Max Value" value="BP Max Value" />

        </Picker>

        <Text style={styles.textStyle}> {this.state.language}</Text>
        <View style={styles.buttonContainer}>
          <FormButton
            buttonType='outline'
            title='           ADD          '
            buttonColor='#00b8ff'

            onPress={() => this.props.navigation.navigate("GoalInput")}> Add </FormButton>
        </View>
        <View style={styles.buttonContainer}>
          <FormButton
            buttonType='outline'

            title='       CANCEL       '
            buttonColor='#00b8ff'


            onPress={() => this.props.navigation.navigate("pro")}

          />
        </View>

      </View>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  textStyle: {
    margin: 5,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerStyle: {
    height: 150,
    width: "80%",
    color: '#344953',
    justifyContent: 'center',
  },

  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  buttonContainer: {
    margin: 25
  },
  button: {
    width: '40%'
  }
});

export default createStackNavigator({
  Home: {
    screen: SwitchExample
  }
});