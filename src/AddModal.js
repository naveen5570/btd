import React, { Component } from 'react';
import {
   FlatList, StyleSheet, Text, View, Image, Alert,
   Platform, TouchableHighlight, Dimensions,
   TextInput, Picker, YellowBox, SafeAreaView, Vibration, ToastAndroid
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';
import AutoComplete from 'react-native-autocomplete-modal';
//import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Globals from '../Globals';

let medicineList = [];
var screen = Dimensions.get('window');
export default class AddModal extends Component {
   state = {
      expoPushToken: '',
      notification: {},
   };

   componentWillReceiveProps({ data }) {
      this.setState({ data });
   }
   GetMedicinelistFromServer = () => {

      fetch(Globals.base_url + 'apptapp/Sugar/Medicine.php', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },

      }).then((response) => response.json())
         .then((responseJson) => {

            if (responseJson.result == '1') {
               medicineList = responseJson.data

            } else {
               ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
            }
         }).catch((error) => {
            console.error(error);
         });

   }
   registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice) {
         const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
         );
         let finalStatus = existingStatus;
         if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(
               Permissions.NOTIFICATIONS
            );
            finalStatus = status;
         }
         if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
         }
         let token = await Notifications.getExpoPushTokenAsync();
         console.log(token.data);
         this.setState({ expoPushToken: token.data });
      } else {
         alert('Must use physical device for Push Notifications');
      }
   };

   componentDidMount() {
      this.registerForPushNotificationsAsync();
      this.GetMedicinelistFromServer();
      // Handle notifications that are received or selected while the app
      // is open. If the app was closed and then opened by tapping the
      // notification (rather than just tapping the app icon to open it),
      // this function will fire on the next tick after the app starts
      // with the notification data.
      this._notificationSubscription = Notifications.addNotificationResponseReceivedListener(
         this._handleNotification
      ); 
   }

   _handleNotification = notification => {
      Vibration.vibrate()
      this.setState({ notification: notification });
   };

   // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
   sendPushNotification = async (deviceToken, notification_data) => {
      const message = {
         to: deviceToken,
         sound: 'default',
         title: ' New Medicine',
         body: `You Have New Medicine Recommendation`,
         vibrate: true,
         data: notification_data,
         _displayInForeground: true,
      };
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(message),
      });
      const data = response._bodyInit;
      console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
   };


   constructor(props) {
      super(props);


      this.state = {
         medicine: '',
         type_of_medicine: '',
         breakfast: '',
         lunch: '',
         dinner: '',
         duration: '',
         duration1: '',
         patient_id: '',
      };

      YellowBox.ignoreWarnings([
         'Warning: componentWillMount is deprecated',
         'Warning: componentWillReceiveProps is deprecated',
      ]);
   }
   InsertMedicineToServer = () => {
      medicinedata = JSON.stringify({
         medicine: this.state.medicine,
         type_of_medicine: this.state.type_of_medicine,
         breakfast: this.state.breakfast,
         lunch: this.state.lunch,
         dinner: this.state.dinner,
         duration: this.state.duration,
         duration1: this.state.duration1,
         patient_id: this.state.patient_id,
      })

      try {
         const myRequest = new Request(Globals.base_url + 'apptapp/Sugar/InsertMedicine.php', {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: medicinedata
         });
         fetch(myRequest)
            .then((response) => response.json())
            .then((res) => {
               if (res.result == '1') {
                  if (res.user_token != '') {
                     this.sendPushNotification(res.user_token, res.data);
                  }
               }
               ToastAndroid.show(res.message, ToastAndroid.SHORT)

            });
      }
      catch (error) {
         console.log(error);
      }
   }

   showAddModal = (patientid) => {

      this.setState({
         patient_id: patientid
      })
      this.refs.myModal.open();
   }
   generateKey = (numberOfCharacters) => {
      return require('random-string')({ length: numberOfCharacters });
   }

   render() {





      return (
         <Modal
            ref={"myModal"}
            style={{
               justifyContent: 'center',
               borderRadius: Platform.OS === 'ios' ? 30 : 0,
               shadowRadius: 10,
               width: screen.width - 30,
               height: 430
            }}
            position='center'
            backdrop={true}
            onClosed={() => {
               // alert("Modal closed");
            }}
         >
            <Text style={{
               fontSize: 16,
               fontWeight: 'bold',
               textAlign: 'center',
               marginTop: 20
            }}> New Medicine </Text>

            <SafeAreaView>
               <AutoComplete style={{
                  height: 40,
                  width: '60%',
                  borderBottomColor: 'gray',
                  marginLeft: 50,
                  marginRight: 30,
                  marginTop: 10,
                  marginBottom: 20,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
               }}
                  onSelect={data => this.setState({ medicine: data.medicine.name, type_of_medicine: data.medicine.type_of_medicine })}
                  dataSource={medicineList}
                  value={this.state.medicine}
                  textLabel="Select Medicine"
                  searchPlaceholder='Search Medicine'
                  cancelText="Close"
                  searchField="medicine.name"

               />

            </SafeAreaView>
            <View style={{ flexDirection: "row" }}>

               <View style={{ flex: 1 }}>
                  <TextInput
                     style={{
                        height: 40,
                        width: '60%',
                        borderBottomColor: 'gray',
                        marginLeft: 120,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom: 20,
                        borderBottomWidth: 1,
                        justifyContent: 'flex-start',
                        alignSelf: 'flex-start',
                        textAlign: 'center'
                     }} keyboardType={'numeric'}
                     maxLength={3}

                     onChangeText={(text) => this.setState({ breakfast: text })}
                     placeholder="M"
                     value={this.state.breakfast}
                  />
               </View>

               <View style={{ flex: 1 }}>
                  <TextInput
                     style={{
                        height: 40,
                        width: '70%',
                        borderBottomColor: 'gray',
                        marginLeft: 120,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom: 20,
                        borderBottomWidth: 1,
                        justifyContent: 'flex-end',
                        textAlign: 'center'
                     }} keyboardType={'numeric'}

                     onChangeText={(text) => this.setState({ lunch: text })}
                     placeholder="A"
                     value={this.state.lunch}
                  />
               </View>
               <View style={{ flex: 1, }}>
                  <TextInput
                     style={{
                        height: 40,
                        width: '80%',
                        borderBottomColor: 'gray',
                        marginLeft: 120,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom: 20,
                        borderBottomWidth: 1,
                        justifyContent: 'flex-start',
                        textAlign: 'center'
                     }} keyboardType={'numeric'}

                     onChangeText={(text) => this.setState({ dinner: text })}
                     placeholder="N"
                     value={this.state.dinner}
                  />
               </View>

               <View style={{ flex: 2, flexDirection: 'column' }}>
                  <TextInput
                     style={{
                        height: 40,
                        width: '100%',
                        borderBottomColor: 'gray',
                        marginLeft: -30,
                        marginRight: 10,
                        marginTop: 85,
                        marginBottom: 20,
                        borderBottomWidth: 1,
                        alignItems: 'flex-start',
                        textAlign: 'center'

                     }} keyboardType={'numeric'}

                     onChangeText={(text) => this.setState({ duration: text })}
                     placeholder="Time"
                     value={this.state.duration}
                  />
               </View>

               <View style={{
                  flex: 2,
                  flexDirection: 'column',
                  justifyContent: 'space-around',

               }}>
                  <Picker
                     selectedValue={this.state.duration1}
                     style={{
                        alignItems: 'flex-start',
                        alignSelf: 'flex-start', marginTop: 10, marginLeft: 10, marginRight: 10, height: 30, width: 130
                     }}
                     onValueChange={(duration1, itemIndex) =>
                        this.setState({ duration1: duration1 })
                     }>
                     <Picker.Item label="Duration" value="Duration" />
                     <Picker.Item label="Days" value="Days" />
                     <Picker.Item label="Weeks" value="Weeks" />
                     <Picker.Item label="Months" value="Months" />
                  </Picker>
               </View>




               <Button
                  style={{ fontSize: 18, color: 'white' }}
                  containerStyle={{
                     flex: 3,
                     flexDirection: 'column-reverse',
                     padding: 8,
                     marginTop: 180,
                     marginLeft: -150,
                     marginRight: 120,
                     height: 40,
                     borderRadius: 6,
                     backgroundColor: '#00b8ff',
                     alignItems: 'center',
                     alignSelf: 'center'

                  }}

                  onPress={() => {

                     if (this.state.breakfast.length == 0) {
                        alert("You must enter medicine's name and dosage");
                        return;
                     }


                     const medicine = {

                        name: this.state.medicine,
                        medicine: this.state.medicine,
                        type_of_medicine: this.state.type_of_medicine,
                        breakfast: this.state.breakfast,
                        lunch: this.state.lunch,
                        dinner: this.state.dinner,
                        duration: this.state.duration,
                        duration1: this.state.duration1,
                        patient_id: this.state.patient_id,

                     };
                     this.InsertMedicineToServer();
                     flatListData.push(medicine);
                     this.props.parentFlatList.refreshFlatList();
                     this.refs.myModal.close();
                     //this.sendPushNotification();

                     this.setState({
                        medicine: '',
                        type_of_medicine: '',
                        breakfast: '',
                        lunch: '',
                        dinner: '',
                        duration: '',
                        duration1: '',
                     }, function () {
                        // In this block you can do something with new state.
                     });

                  }}>
                  Save
                </Button>

            </View>

         </Modal >
      );
   }
}
const styles = StyleSheet.create({
   autocompletesContainer: {
      paddingTop: 30,
      zIndex: 1,
      width: "100%",
      paddingHorizontal: 8,
      marginTop: 100,
   },
   input: { maxHeight: 40 },
   inputContainer: {
      display: "flex",
      flexShrink: 0,
      flexGrow: 0,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "#c7c6c1",
      paddingVertical: 13,
      paddingLeft: 12,
      paddingRight: "5%",
      width: "100%",
      justifyContent: "flex-start",
   },
   container: {
      flex: 1,
      backgroundColor: "#ffffff",
   },
   plus: {
      position: "absolute",
      left: 15,
      top: 10,
   },
});

