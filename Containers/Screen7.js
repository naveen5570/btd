import React, { Component } from 'react';
import _ from 'lodash';
import { StyleSheet, Text, Button, TouchableOpacity, Image, } from 'react-native';
import FormButton from '../components/FormButton';
import { DatePickerDialog } from 'react-native-datepicker-dialog'

import moment from 'moment';
import { createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
import {
  View,
  Colors,

  Picker,

} from 'react-native-ui-lib';
const options = [
  { label: 'Fasting', value: 'Fasting', disabled: false },
  { label: 'Breakfast', value: 'Breakfast', disabled: false },
  { label: 'Lunch', value: 'Lunch', disabled: false },
  { label: 'Dinner', value: 'Dinner', disabled: false },

];
export default class Screen3 extends React.Component {
  state = {
    choosenIndex: 0,
    language: [],
    DateText: '',

    DateHolder: null,
  };
  static navigationOptions = {
    drawerLabel: 'Screen Seven',
    drawerIcon: () => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=7`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  }

  DatePickerMainFunctionCall = () => {

    let DateHolder = this.state.DateHolder;

    if (!DateHolder || DateHolder == null) {

      DateHolder = new Date();
      this.setState({
        DateHolder: DateHolder
      });
    }

    //To open the dialog
    this.refs.DatePickerDialog.open({

      date: DateHolder,
      maxDate: new Date()
    });

  }

  /**
   * Call back for dob date picked event
   *
   */
  onDatePickedFunction = (date) => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    });
  }
  render() {

    return (



      <View flex padding-20>
        <Text style={styles.textStyle}>Choose Input Type</Text>
        <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >

          <View style={styles.datePickerBox}>

            <Text style={styles.datePickerText}>Date  :   {this.state.DateText}</Text>

          </View>

        </TouchableOpacity>


        {/* Place the dialog component at end of your views and assign the references, event handlers to it.*/}
        <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />

        <Picker style={styles.pickerStyle}
          selectedValue={this.state.language}
          placeholder="Choose Duration "
          enableModalBlur={false}

          floatingPlaceholder
          value={this.state.language}
          onValueChange={(itemValue, itemPosition) =>
            this.setState({ language: itemValue, choosenIndex: itemPosition })}

        >


          {_.map(options, option => (
            <Picker.Item key={option.value} value={option} disabled={option.disabled} />
          ))}
        </Picker>

        <Text style={styles.textStyle}> {this.state.language}</Text>
        <View style={styles.buttonContainer}>
          <FormButton
            buttonType='outline'
            title='           ADD          '
            buttonColor='#00b8ff'

            onPress={() => { this.props.navigation.navigate("screen8", { data: this.state.language }); }}> Add </FormButton>
        </View>
        <View style={styles.buttonContainer}>
          <FormButton
            buttonType='outline'

            title='       CANCEL       '
            buttonColor='#00b8ff'


            onPress={() => this.props.navigation.navigate("drawerStack")}

          />
        </View>

      </View>



    );
  }
}

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
  datePickerBox: {
    marginTop: 9,
    borderColor: '#FF5722',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    width: '100%',
    justifyContent: 'center'
  },

  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000',

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
