import React, { Component } from 'react';

import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Alert, Platform, FlatList, Image, ToastAndroid } from 'react-native';
import GradientButton from "react-native-gradient-buttons";
import { createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
import ListView from "deprecated-react-native-listview";
import HorizontalDatePicker from '@logisticinfotech/react-native-horizontal-date-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
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
      title: 'INPUT YOUR WEIGHT',

    };
  constructor(props) {

    super(props)

    this.state = {

      TextInput_weight: '',


    }

  }
  onDateSelected = date => {
    console.log("Selected Date:==>", date);
  }

  InsertWeightRecordsToServer = () => {

    fetch(Globals.base_url + 'apptapp/Sugar/InsertWeight.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        weight: this.state.TextInput_weight,


        patient_id: this.state.TextInput_patient_id,
        date: this.state.TextInput_date,

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        ToastAndroid.show("Weight Inserted Successfully", ToastAndroid.SHORT);
        this.props.navigation.navigate('DefaultScreen');
        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });

  }

  GoTo_Show_StudentList_Activity_Function = () => {
    this.props.navigation.navigate('Second');

  }

  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');

  }

  render() {

    return (
      <View><HorizontalDatePicker
        pickerType={'date'}
        onDateSelected={this.onDateSelected}
        returnDateFormat={'YYYY-MM-DD'}
        onDateSelected={date => this.setState({ TextInput_date: date })}
      />
        <View style={styles.MainContainer}>



          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <TextInput

                placeholder="Weight "

                onChangeText={TextInputValue => this.setState({ TextInput_weight: TextInputValue })}

                underlineColorAndroid='transparent'
                keyboardType={'numeric'}
                style={{
                  justifyContent: 'flex-start', textAlign: 'center',
                  marginTop: -170,
                  width: wp('42%'),
                  height: hp('21%'),
                  marginLeft: 20,
                  borderColor: '#FF5722',
                  backgroundColor: '#fff',
                  fontSize: 20,
                  fontWeight: '400',
                }}
              />
            </View>

          </View>



          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.InsertWeightRecordsToServer} >

            <GradientButton
              style={{ marginTop: 5 }}
              textStyle={{ fontSize: 20 }}
              text="SUBMIT"
              height={50}
              gradientBegin="#00b8ff"
              gradientEnd="#0083ff"
              onPressAction={this.InsertWeightRecordsToServer}
            />

          </TouchableOpacity>

          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_StudentList_Activity_Function} >

            <GradientButton
              style={{ marginTop: 5 }}
              textStyle={{ fontSize: 20 }}
              text="LOGS"
              height={50}
              gradientBegin="#00b8ff"
              gradientEnd="#0083ff"
              onPressAction={() => this.props.navigation.navigate("DefaultScreen")}
            />

          </TouchableOpacity>


        </View>
      </View>

    );
  }
}
class Settings_Screen extends Component {

  static navigationOptions =
    {
      title: '',
    };
  constructor(props) {

    super(props)

    this.state = {

      TextInput_bp_max: '',
      TextInput_bp_min: '',
      TextInput_patient_id: '1',
      TextInput_date: '',

    }

  }
  onDateSelected = date => {
    console.log("Selected Date:==>", date);
  }

  InsertStudentRecordsToServer = () => {

    fetch(Globals.base_url + 'apptapp/Sugar/InsertBP.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        bp_max: this.state.TextInput_bp_max,

        bp_min: this.state.TextInput_bp_min,


        patient_id: this.state.TextInput_patient_id,
        date: this.state.TextInput_date,

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });

  }

  GoTo_Show_StudentList_Activity_Function = () => {
    this.props.navigation.navigate('Second');

  }

  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');

  }


  render() {

    return (
      <View><HorizontalDatePicker
        pickerType={'date'}
        onDateSelected={this.onDateSelected}
        returnDateFormat={'YYYY-MM-DD'}
        onDateSelected={date => this.setState({ TextInput_date: date })}
      />
        <View style={styles.MainContainer}>



          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <TextInput

                placeholder="BP MAX"

                onChangeText={TextInputValue => this.setState({ TextInput_bp_max: TextInputValue })}

                underlineColorAndroid='transparent'
                keyboardType={'numeric'}
                style={{
                  justifyContent: 'flex-start', textAlign: 'center',
                  marginTop: -220,
                  width: 120,
                  height: 120,
                  marginLeft: 20,
                  borderColor: '#FF5722',
                  backgroundColor: '#fff',
                  fontSize: 20,
                  fontWeight: '400',
                }}
              />
            </View>
            <Text style={{ fontSize: 100, marginTop: -220, }}> / </Text>
            <View style={{ flex: 1 }}>
              <TextInput

                placeholder="BP MIN"

                onChangeText={TextInputValue => this.setState({ TextInput_bp_min: TextInputValue })}

                underlineColorAndroid='transparent'
                keyboardType={'numeric'}
                style={{
                  justifyContent: 'flex-end', textAlign: 'center',
                  marginTop: -220,
                  width: 120,
                  height: 120,
                  marginLeft: 10,
                  borderColor: '#FF5722',
                  backgroundColor: '#fff',
                  fontSize: 20,
                  fontWeight: '400',
                }}
              />
            </View>
          </View>

          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.InsertStudentRecordsToServer} >

            <GradientButton
              style={{ marginTop: 5 }}
              textStyle={{ fontSize: 20 }}
              text="SUBMIT"
              height={50}
              gradientBegin="#00b8ff"
              gradientEnd="#0083ff"
              onPressAction={this.InsertStudentRecordsToServer}
            />

          </TouchableOpacity>


          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_StudentList_Activity_Function} >

            <GradientButton
              style={{ marginTop: 5 }}
              textStyle={{ fontSize: 20 }}
              text="LOGS"
              height={50}
              gradientBegin="#00b8ff"
              gradientEnd="#0083ff"
              onPressAction={() => this.props.navigation.navigate("DefaultScreen")}
            />

          </TouchableOpacity>
        </View>

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
  Second: {
    screen: Settings_Screen,
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
      title: 'My Sugar & Vitals',
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

  Home_Menu_Label: {

    screen: First_2_Tabs,

  },

  Student_Menu_Label: {

    screen: Second_2_Tabs,

  }

});

export default createAppContainer(MyDrawerNavigator);

const styles = StyleSheet.create({

  MainContainer: {


    justifyContent: 'center',
    backgroundColor: '#e8f7ff',
    height: '100%'

  },

  text:
  {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
  MainContainer_For_Show_StudentList_Activity: {

    flex: 1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5

  },

  TextInputStyleClass: {


    textAlign: 'center',
    width: 80,
    height: 80,
    borderRadius: 180 / 2,
    borderColor: '#FF5722',
    backgroundColor: '#00BCD4'

  },

  TouchableOpacityStyle: {

    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
    width: '100%',
    backgroundColor: '#e8f7ff',
    alignContent: 'center',
    alignSelf: 'center',

  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }


});