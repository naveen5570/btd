import React, { Component } from 'react';
import flatListData from '../../data/flatListData';
import medicineListData from '../../data/medicineListData';
import {
  StyleSheet, Dimensions, Text, View, TouchableOpacity, Image, ActivityIndicator, FlatList, Alert, Platform, ScrollView, AsyncStorage } from 'react-native';
import { DataTable } from 'react-native-paper';
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import GradientButton from "react-native-gradient-buttons";
import { Button, CheckBox } from 'react-native-elements'
import firebase from 'firebase';
import 'firebase/firestore';
import User from '../../User';
import Globals from '../../Globals';

class HamburgerIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  }
  goback = () => {
    this.props.navigationProps.goBack(null);
  }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.goback.bind(this)} >
          <Image
            source={require("../image/back.png")}
            style={{ tintColor: '#fff', resizeMode: 'contain', width: 50, height: 50, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

class SugarScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'SUGAR VALUES',

    headerStyle: {
      backgroundColor: '#F6F9FC',
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0,
      textAlign: 'center',
      marginLeft: '0%',
      height: 25
      // remove shadow on iOS
    },
    headerTintColor: '#000000',
  })
  ShowLogs = () => {
    return fetch(Globals.base_url + 'apptapp/Sugar/showsugar.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: this.state.patient_id,
        date: this.state.TextInput_date
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.result == 1) {

          this.setState({
            loading: false,
            dataSource: responseJson.data
          }, function () {
            // In this block you can do something with new state.
          });
        } else {
          this.setState({
            loading: false,
            dataSource: []
          }, function () {
            // In this block you can do something with new state.
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  constructor(props) {
    super(props);

    var { params } = this.props.navigation.state;
    this.state = {
      dataSource: [],
      name: params.name,
      email: params.email,
      batch_id: params.batch_id,
      TextInput_date: '',
      patient_id: params.patient_id,
      phone: params.phone,
      firebase_id: params.firebase_id,
      info: "",
      loading: true, isAppReady: false,

    };
    console.log(this.state)
    this.ShowLogs();
    this._bootstrapAsync();
  }
  UNSAFE_componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAoCmSB4ta5sq-jXgQEOppcfOSPPhhtSMc",
      authDomain: "beatthediabetes-ddb70.firebaseapp.com",
      databaseURL: "https://beatthediabetes-ddb70.firebaseio.com",
      projectId: "beatthediabetes-ddb70",
      storageBucket: "beatthediabetes-ddb70.appspot.com",
      messagingSenderId: "1016690843275",
      appId: "1:1016690843275:web:0cbff4059987435fec3e8e",
      measurementId: "G-7KJFTB9S7P"
    };
    // Initialize Firebase
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig).firestore()
      : firebase.app().firestore();
  }


  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.id = await AsyncStorage.getItem('userid');
    this.props.navigation.navigate(User.id ? 'App' : 'Auth');
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }


  redirectaddmedi = () => {
    return fetch(Globals.base_url + 'apptapp/Sugar/RecommendedMedicine.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: this.state.patient_id,

      })

    })
      .then((response) => response.json())
      .then((responseJson) => {


        flatListData.length = 0;
        // flatListData.splice(0,flatListData.length)
        if (responseJson.result == 1) {
          responseJson.data.medicine.map(rx =>
            flatListData.push(rx)
          )
        }
        this.props.navigation.navigate("RecommendedMedicine", {
          patient_id: this.state.patient_id,
          name: this.state.name,
          email: this.state.email,
          batch_id: this.state.batch_id,
          phone: this.state.phone,

        })

      })
      .catch((error) => {
        console.error(error);
      });

  }
  rxhistory = () => {
    return fetch(Globals.base_url + 'apptapp/Sugar/RecommendedMedicineHistory.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: this.state.patient_id,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        medicineListData.length = 0;
        // medicineListData.splice(0,medicineListData.length)
        if (responseJson.result == 1) {

          responseJson.data.map(record =>
            medicineListData.push(record)
          )
        }
        this.props.navigation.navigate("", {
          patient_id: this.state.patient_id,
          name: this.state.name,
          email: this.state.email,
          batch_id: this.state.batch_id,
          phone: this.state.phone,

        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.ActivityIndicator_Style}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <Text style={styles.centername}>{this.state.name} </Text>
        <ScrollView>
          <View>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ justifyContent: 'center', fontWeight: 'bold', fontStyle: 'italic' }}>DATE</DataTable.Title>
                <DataTable.Title style={{ fontWeight: 'bold', justifyContent: 'center', fontStyle: 'italic' }}>FASTING</DataTable.Title>
                <DataTable.Title style={{ fontWeight: 'bold', justifyContent: 'center', fontStyle: 'italic' }}>PP1</DataTable.Title>
                <DataTable.Title style={{ fontWeight: 'bold', justifyContent: 'center', fontStyle: 'italic' }}>PP2</DataTable.Title>
                <DataTable.Title style={{ fontWeight: 'bold', justifyContent: 'center', fontStyle: 'italic' }}>PP3</DataTable.Title>
              </DataTable.Header>

              {
                this.state.dataSource.map(item => {
                  return (
                    <DataTable.Row>
                      <DataTable.Cell style={{ backgroundColor: '#bfe7f7', justifyContent: 'center', borderColor: "#9edef9", borderWidth: 0.5, margin: 2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, fontWeight: 'bold' }} >{item.date}</DataTable.Cell>
                      <DataTable.Cell style={(item.fasting <= 0) ? { backgroundColor: '#ffffff', borderColor: "#9edef9", justifyContent: 'center', margin: 2, borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' } : (item.fasting <= 110) ? { borderColor: "#9edef9", backgroundColor: '#b9f991', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' } : (item.fasting <= 140) ? { borderColor: "#9edef9", backgroundColor: '#ffd58a', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' } : { borderColor: "#9edef9", backgroundColor: '#fd775f', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' }}>
                        {item.fasting}</DataTable.Cell>
                      <DataTable.Cell style={(item.pp1 <= 0) ? { backgroundColor: '#ffffff', borderColor: "#9edef9", justifyContent: 'center', margin: 2, borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' } : (item.pp1 <= 140) ? { borderColor: "#9edef9", backgroundColor: '#b9f991', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' } : (item.pp1 <= 180) ? { borderColor: "#9edef9", backgroundColor: '#ffd58a', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' } : { borderColor: "#9edef9", backgroundColor: '#fd775f', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' }} >{item.pp1}</DataTable.Cell>
                      <DataTable.Cell style={(item.pp2 <= 0) ? { backgroundColor: '#ffffff', borderColor: "#9edef9", justifyContent: 'center', margin: 2, borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' } : (item.pp2 <= 140) ? { borderColor: "#9edef9", backgroundColor: '#b9f991', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' } : (item.pp2 <= 180) ? { borderColor: "#9edef9", backgroundColor: '#ffd58a', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' } : { borderColor: "#9edef9", backgroundColor: '#fd775f', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' }}>{item.pp2}</DataTable.Cell>
                      <DataTable.Cell style={(item.pp3 <= 0) ? { backgroundColor: '#ffffff', borderColor: "#9edef9", margin: 2, justifyContent: 'center', borderWidth: 0.5, borderTopRightRadius: 10, borderBottomRightRadius: 10, fontWeight: 'bold' } : (item.pp3 <= 140) ? { borderColor: "#9edef9", backgroundColor: '#b9f991', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderTopRightRadius: 10, borderBottomRightRadius: 10, fontWeight: 'bold' } : (item.pp3 <= 180) ? { borderColor: "#9edef9", margin: 2, backgroundColor: '#ffd58a', justifyContent: 'center', borderWidth: 0.5, borderTopRightRadius: 10, borderBottomRightRadius: 10, fontWeight: 'bold' } : { borderColor: "#9edef9", backgroundColor: '#fd775f', margin: 2, justifyContent: 'center', borderWidth: 0.5, borderTopRightRadius: 10, borderBottomRightRadius: 10, fontWeight: 'bold' }}>{item.pp3}</DataTable.Cell>
                    </DataTable.Row>
                  )
                })}

            </DataTable>
          </View>
        </ScrollView>
        <View>
          <View style={styles.buttonContainer}>

            <GradientButton
              style={(this.state.firebase_id == '') ? { display: 'none' } : { marginTop: -10, }}
              textStyle={{ fontSize: 20, fontStyle: 'italic' }}
              buttonType='clear'
              text='Chat'
              height={50}
              gradientBegin="#00b8ff"
              gradientEnd="#0083ff"

              onPressAction={() => this.props.navigation.navigate("MyChat", {
                firebase_id: this.state.firebase_id,
                name: this.state.name
              })}

            />
          </View>

          <View style={styles.buttonContainer1}>
            <GradientButton
              style={{ marginTop: -5 }}
              textStyle={{ fontSize: 20, fontStyle: 'italic' }}
              buttonType='clear'
              text='Medicine'
              height={50}
              gradientBegin="#00b8ff"
              gradientEnd="#0083ff"
              onPressAction={() => { this.rxhistory(); this.redirectaddmedi(); }} />
          </View>
        </View>
      </View >
    );
  }
}

class BPScreen extends Component {

  static navigationOptions =
    {
      title: 'BP VALUE',
    };
  ShowLogs = () => {
    return fetch(Globals.base_url + 'apptapp/Sugar/showbp.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: this.state.patient_id,
        date: this.state.TextInput_date
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result == 1) {

          this.setState({
            loading: false,
            dataSource: responseJson.data
          }, function () {
            // In this block you can do something with new state.
          });
        } else {
          this.setState({
            loading: false,
            dataSource: []
          }, function () {
            // In this block you can do something with new state.
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  constructor(props) {
    super(props);
    var { params } = this.props.navigation.state;
    this.state = {
      dataSource: [],
      name: params.name,
      email: params.email,
      batch_id: params.batch_id,
      TextInput_date: '',
      patient_id: params.patient_id,
      phone: params.phone,
      currentUserfirebase_id: params.currentUserfirebase_id,
      firebase_id: params.firebase_id,
      info: "",
      loading: true, isAppReady: false,

    };

    this.ShowLogs();
    this._bootstrapAsync();
  }
  UNSAFE_componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAoCmSB4ta5sq-jXgQEOppcfOSPPhhtSMc",
      authDomain: "beatthediabetes-ddb70.firebaseapp.com",
      databaseURL: "https://beatthediabetes-ddb70.firebaseio.com",
      projectId: "beatthediabetes-ddb70",
      storageBucket: "beatthediabetes-ddb70.appspot.com",
      messagingSenderId: "1016690843275",
      appId: "1:1016690843275:web:0cbff4059987435fec3e8e",
      measurementId: "G-7KJFTB9S7P"
    };
    // Initialize Firebase
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig).firestore()
      : firebase.app().firestore();
  }


  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.id = await AsyncStorage.getItem('userid');
    this.props.navigation.navigate(User.id ? 'App' : 'Auth');
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }




  redirectaddmedi = () => {
    return fetch(Globals.base_url + 'apptapp/Sugar/RecommendedMedicine.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: this.state.patient_id,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        flatListData.length = 0;
        // flatListData.splice(0,flatListData.length)
        if (responseJson.result == 1) {
          responseJson.data.medicine.map(rx =>
            flatListData.push(rx)
          )
        }
        this.props.navigation.navigate("RecommendedMedicine", {
          patient_id: this.state.patient_id,
          name: this.state.name,
          email: this.state.email,
          batch_id: this.state.batch_id,
          phone: this.state.phone
        })

      })
      .catch((error) => {
        console.error(error);
      });

  }
  rxhistory = () => {
    return fetch(Globals.base_url + 'apptapp/Sugar/RecommendedMedicineHistory.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: this.state.patient_id,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        medicineListData.length = 0;
        // medicineListData.splice(0,medicineListData.length)
        if (responseJson.result == 1) {

          responseJson.data.map(record =>
            medicineListData.push(record)
          )
        }
        this.props.navigation.navigate("", {
          patient_id: this.state.patient_id,
          name: this.state.name,
          email: this.state.email,
          batch_id: this.state.batch_id,
          phone: this.state.phone,

        })
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    if (this.state.loading) {
      return (
        <View style={styles.ActivityIndicator_Style}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <Text style={styles.centername}>{this.state.name} </Text>
        <ScrollView>
          <View>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ justifyContent: 'center', fontWeight: 'bold', fontStyle: 'italic' }} >DATE</DataTable.Title>
                <DataTable.Title style={{ justifyContent: 'center', fontWeight: 'bold', fontStyle: 'italic' }} >BPMAX</DataTable.Title>
                <DataTable.Title style={{ justifyContent: 'center', fontWeight: 'bold', fontStyle: 'italic' }} >BPMIN</DataTable.Title>

              </DataTable.Header>
              {
                this.state.dataSource.map(item => {
                  return (
                    <DataTable.Row>
                      <DataTable.Cell style={{ backgroundColor: '#bfe7f7', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', borderColor: "#9edef9", margin: 2, borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' }} >{item.date}</DataTable.Cell>
                      <DataTable.Cell style={{ backgroundColor: '#ffffff', justifyContent: 'center', borderColor: "#9edef9", margin: 2, borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' }} >{item.bp_max}</DataTable.Cell>
                      <DataTable.Cell style={{ backgroundColor: '#ffffff', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', borderColor: "#9edef9", margin: 2, borderWidth: 0.5, borderRadius: 0, fontWeight: 'bold' }} >{item.bp_min}</DataTable.Cell>

                    </DataTable.Row>
                  )
                })}

            </DataTable>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>

          <GradientButton
            style={(this.state.firebase_id == '') ? { display: 'none' } : { marginTop: -10, }}
            textStyle={{ fontSize: 20, fontStyle: 'italic' }}
            buttonType='clear'
            text='Chat'
            height={50}
            gradientBegin="#00b8ff"
            gradientEnd="#0083ff"

            onPressAction={() => this.props.navigation.navigate("MyChat", {
              firebase_id: this.state.firebase_id,
              name: this.state.name
            })}

          />
        </View>

        <View style={styles.buttonContainer1}>
          <GradientButton
            style={{ marginTop: -5 }}
            textStyle={{ fontSize: 20, fontStyle: 'italic' }}
            buttonType='clear'
            text='Medicine'
            height={50}
            gradientBegin="#00b8ff"
            gradientEnd="#0083ff"
            onPressAction={() => { this.rxhistory(); this.redirectaddmedi(); }} />
        </View>
      </View>
    );
  }
}



class Student_Screen extends Component {

  static navigationOptions =
    {
      title: '',

    };
  constructor(props) {
    super(props);

    this.state = {
      name: User.name,
      email: User.email,
      batch_id: User.batch_id,
      patient_id: User.patient_id,
      phone: User.phone,
      info: "",
    };
  }
  gotoNextActivity = () => {
    this.props.navigation.navigate('Forth');

  }

  render() {

    return (

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
              source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

            <Text style={styles.name}>{this.state.name} </Text>
            <Text style={styles.userInfo}>{this.state.email} </Text>
            <Text style={styles.userInfo}>{this.state.phone} </Text>
            <Text style={styles.userInfo}>{this.state.patient_id} </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/home--v2.png' }} />
            </View>
            <View style={styles.infoContent}>


              <Button
                title='Home'
                onPress={() => this.props.navigation.navigate("pro1")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 15,

                }}
                type='clear'
              />
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/membership-card.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='My Subscriptions'
                onPress={() => this.props.navigation.navigate("pro1")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 10,

                }}
                type='clear'
              />

            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/mobile-payment.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='Payment History'
                onPress={() => this.props.navigation.navigate("pro1")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 10,

                }}
                type='clear'
              />
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/survey.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='Know Your Prakirti'
                onPress={() => this.props.navigation.navigate("pro1")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 10,

                }}
                type='clear'
              />
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/about.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='About Us'
                onPress={() => this.props.navigation.navigate("pro1")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 10,

                }}
                type='clear'
              />
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/add-contact-to-company.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='Contact Us'
                onPress={() => this.props.navigation.navigate("pro1")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 10,

                }}
                type='clear'
              />
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/add-contact-to-company.png' }} />
            </View>
            <View style={styles.infoContent}>
              <Button
                title='Privacy Policy'
                onPress={() => this.props.navigation.navigate("pro1")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 10,

                }}
                type='clear'
              />
            </View>
          </View>

        </View>
      </View>
    );
  }
}



export const Tab_1 = createMaterialTopTabNavigator({
  First: {
    screen: SugarScreen,
  },
  Second: {
    screen: BPScreen,
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
      fontWeight: '200',
      fontStyle: 'italic'
    }
  }

});

export const Tab_2 = createMaterialTopTabNavigator({
  Third: {
    screen: Student_Screen,
  },

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
      fontWeight: '200',

      fontStyle: 'italic'
    }
  }

});

const First_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_1,
    navigationOptions: ({ navigation }) => ({
      title: 'Logs',
      headerTitleStyle: {
        fontStyle: 'italic'
      },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#74cdf0',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
		marginTop: 0,
        height: Dimensions.get('window').height / 8

      },
      headerTintColor: '#fff',
    })
  },
}, {
  headerLayoutPreset: 'center',
  fontStyle: 'italic',

});

const Second_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_2,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#00B8D4',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
		marginTop: 0,
        height: Dimensions.get('window').height / 8

      },
      headerTintColor: '#fff',
    })
  },
}, {
  headerLayoutPreset: 'center',
  fontStyle: 'italic',

});

const MyDrawerNavigator = createDrawerNavigator({

  Home: {

    screen: First_2_Tabs,

  },

  Profile: {

    screen: Second_2_Tabs,

  }

});
export default createAppContainer(MyDrawerNavigator);
const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 5,

    height: '100%'
  },
  MainContainer1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 10
  },
  green: {
    color: '#00ff00'
  },
  red: {
    color: '#ff0000'
  },
  text:
  {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
  ActivityIndicator_Style: {

    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    margin: 25,
    padding: 30,
    marginTop: -10,

  },
  buttonContainer1: {
    margin: 25,
    padding: 30,
    marginTop: -70,
  },
  centername: {
    fontSize: 22,
    color: "#6b6e72",
    fontWeight: '600',
    textAlign: 'center',




  },
  itemIcon: {
    color: '#00b8ff',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  header: {
    backgroundColor: "#ffffff",
    width: '100%'
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    width: '100%'
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
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',


  },
  body: {
    backgroundColor: "#ffffff",
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
    marginLeft: -280
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginLeft: 10,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#000000",
  }


});