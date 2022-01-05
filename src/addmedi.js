
import React, { Component } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, TouchableOpacity, ActivityIndicator, Button, Vibration, ScrollView } from 'react-native';
import flatListData from '../data/flatListData';
import medicineListData from '../data/medicineListData';
import Swipeout from 'react-native-swipeout';

import AddModal from './AddModal';
import EditModal from './EditModal';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { createAppContainer,  createDrawerNavigator, createStackNavigator } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Globals from '../Globals';


//console.disableYellowBox = true;


console.log(getStatusBarHeight(true));
class HamburgerIcon extends Component {

  toggleDrawer = () => {

    this.props.navigationProps.toggleDrawer();

  }
  goback = () => {
    this.props.navigationProps.goBack(null);
  }

  gotoRxHistory = () => {
    this.props.navigationProps.navigate('RxHistory');

  }
  render() {

    return (

      <View style={{ flexDirection: 'row' }}>
        <View>
          <TouchableOpacity onPress={this.goback.bind(this)} >
            <Image
              source={require("./image/back.png")}
              style={{ tintColor: '#fff', resizeMode: 'contain', width: 50, height: 50, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.gotoRxHistory.bind(this)} >
            <Image
              source={require('./image/patient.png')}
              style={{ tintColor: '#fff', width: 35, height: 35, marginTop: 10, justifyContent: 'flex-end', marginLeft: 260 }}
            />
          </TouchableOpacity>
        </View>

      </View>
    );


  }
}
class FlatListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRowKey: null,
      dataSource: [],
      numberOfRefresh: 0
    };

  }

  sendPushNotification = async (deviceToken, notification_data) => {
    const message = {
      to: deviceToken,
      sound: 'default',
      title: 'Medicine Removed',
      body: `Your Recommended Medicine Has Been Removed `,
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

  deleteMedicine = (patient_id, medicine, type_of_medicine) => {
    console.log(medicine, type_of_medicine)
    console.log(patient_id)
    return fetch(Globals.base_url + 'apptapp/Sugar/DeleteMedicine.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: patient_id,
        medicine: medicine,
        type_of_medicine: type_of_medicine
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result == '1') {
          if (responseJson.user_token != '') {
            this.sendPushNotification(responseJson.user_token, responseJson.data);
          }
        }
        console.log(responseJson)
        this.setState({
          loading: false,
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  refreshFlatListItem = () => {
    this.setState((prevState) => {
      return {
        numberOfRefresh: prevState.numberOfRefresh + 1
      };
    });
  }
  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.key });
      },
      right: [
        {
          onPress: () => {
            // alert("Update");
            this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this, this.props.index);
          },
          text: 'Edit', type: 'primary'
        },
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              'Alert',
              'Are you sure you want to delete ?',
              [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                  text: 'Yes', onPress: () => {
                    console.log(flatListData[this.props.index])
                    this.deleteMedicine(flatListData[this.props.index].patient_id, flatListData[this.props.index].medicine, flatListData[this.props.index].type_of_medicine);
                    flatListData.splice(this.props.index, 1);
                    //Refresh FlatList ! 
                    this.props.parentFlatList.refreshFlatList(deletingRow);
                  }
                },
              ],
              { cancelable: true }
            );
          },
          text: 'Delete', type: 'delete'
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };
    return (
      <View>

        <Swipeout {...swipeSettings}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            borderRadius: 20,
          }}>

            <View style={{
              flex: 1,
              flexDirection: 'row',
              // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'                
              backgroundColor: '#fff',
            }}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: 80,
                backgroundColor: '#e8f7ff',
                borderRadius: 20,
                margin: 1.5,
              }}>
                <Text style={styles.flatListItem}>  {this.props.item.medicine}</Text>
                <Text style={styles.flatListItem1}>  {this.props.item.breakfast}-{this.props.item.lunch}-{this.props.item.dinner}</Text>
                <Text style={styles.flatListItem2}>  {this.props.item.duration} {this.props.item.duration1}</Text>
              </View>
            </View>
            <View style={{
              height: 1,
              backgroundColor: '#fff'
            }}>
            </View>
          </View>

        </Swipeout>
      </View>

    );

  }

}
class MedicineListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRowKey: null,
      dataSource: [],
      numberOfRefresh: 0
    };

  }


  refreshFlatListItem = () => {
    this.setState((prevState) => {
      return {
        numberOfRefresh: prevState.numberOfRefresh + 1
      };
    });
  }
  render() {
    return (
      <View>

        <Swipeout>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            borderRadius: 20,
          }}>

            <View style={{
              flex: 1,
              flexDirection: 'row',
              // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'                
              backgroundColor: '#fff',
            }}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: 80,
                backgroundColor: '#e8f7ff',
                borderRadius: 20,
                margin: 1.5,
              }}>
                <Text style={styles.flatListItem}>  {this.props.item.medicine}</Text>
                <Text style={styles.flatListItem1}>  {this.props.item.breakfast}-{this.props.item.lunch}-{this.props.item.dinner}</Text>
                <Text style={styles.flatListItem2}>  {this.props.item.duration} {this.props.item.duration1}</Text>
              </View>
            </View>
            <View style={{
              height: 1,
              backgroundColor: '#fff'
            }}>
            </View>
          </View>

        </Swipeout>
      </View>

    );

  }

}
const styles = StyleSheet.create({
  flatListItem: {
    flex: 1,
    flexDirection: 'column',
    width: "100%",
    color: '#000000',
    padding: 3,
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 1,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 15,

    fontWeight: "400",
    fontStyle: 'italic',
  },
  flatListItem1: {
    flex: 1,
    flexDirection: 'row',
    width: "100%",
    color: '#000000',
    padding: 3,
    fontSize: 16,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 1,
    marginBottom: 15,
    textAlign: 'center',

    fontWeight: "400",
    fontStyle: 'italic',
  },
  flatListItem2: {
    flex: 1,
    flexDirection: 'row',
    width: "100%",
    color: '#000000',
    padding: 1,
    fontSize: 16,
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 0,
    borderRadius: 10,
    marginRight: -25,

    fontWeight: "400",
    fontStyle: 'italic',
  },
  setFontSize: {
    fontSize: 17,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    fontStyle: 'italic',
  },
  setColorRed: {
    color: '#f44336'
  },
  setAlign: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#0083ff',
    borderRadius: 50,
    elevation: 8
  },
  fabIcon: {
    fontSize: 50,
    color: 'white'
  },
  centername: {
    fontSize: 22,
    color: "#6b6e72",
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 35


  },
  heading: {
    height: 60,
    backgroundColor: '#F6F9FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTest: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
});
class BasicFlatList extends Component {
  static navigationOptions =
    {
      title: '',
    };
  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');
  }
  constructor(props) {
    super(props);
    var { params } = this.props.navigation.state;
    this.state = ({
      dataSource: [],
      deletedRowKey: null,
      patient_id: params.patient_id,
      date: params.date,
      name: params.name,
      date: '',
    });

    this._onPressAdd = this._onPressAdd.bind(this);
  }
  refreshFlatList = (activeKey) => {
    this.setState((prevState) => {
      return {
        deletedRowKey: activeKey
      };
    });
    this.refs.flatList.scrollToEnd();
  }
  componentDidMount() {

    var that = this;

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year


    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year,
    });
    /* return fetch(Globals.base_url + 'apptapp/Sugar/RecommendedMedicine.php', {
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
         console.log(responseJson.result)
         if (responseJson.result == 1) {
           flatListData.length = 0;
           // flatListData.splice(0,flatListData.length)
           responseJson.data.medicine.map(rx =>
             flatListData.push(rx)
           )
           this.setState({
             loading: false,
             dataSource: responseJson.data.medicine
           }, function () {
             // In this block you can do something with new state.
           });
         }
       })
       .catch((error) => {
         console.error(error);
       });
       */
  }
  _onPressAdd(txt) {
    // alert("You add Item");
    this.refs.addModal.showAddModal(this.state.patient_id);
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
      <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 60 : 30 }}>
        <Text style={styles.centername}>{this.state.name} </Text>
        <Text style={{ flexDirection: 'column', fontStyle: 'italic', justifyContent: 'space-around', marginLeft: 15, marginTop: -23, fontWeight: '500', fontSize: 16, }}>Medicine</Text>
        <Text style={{ flexDirection: 'column', fontStyle: 'italic', justifyContent: 'space-around', marginLeft: 175, marginTop: -23, fontWeight: '500', fontSize: 16, }}>Dosages</Text>
        <Text style={{ flexDirection: 'column', fontStyle: 'italic', justifyContent: 'space-around', marginLeft: 300, marginTop: -23, fontWeight: '500', fontSize: 16, }}>Duration</Text>


        <Text
          style={[styles.setFontSize, styles.setColorRed, styles.setAlign]}>
          {this.state.date}
        </Text>
        <FlatList
          ref={"flatList"}
          data={flatListData}
          extraData={this.state}
          renderItem={({ item, index }) => {
            //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
            return (
              <FlatListItem item={item} index={index} parentFlatList={this}>

              </FlatListItem>);
          }}
        >
        </FlatList>
        <TouchableOpacity onPress={this._onPressAdd} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
        <AddModal ref={'addModal'} parentFlatList={this}  >

        </AddModal>
        <EditModal ref={'editModal'} parentFlatList={this}>

        </EditModal>
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
class MedicineHistory_Screen extends Component {

  static navigationOptions =
    {
      title: '',
    };

  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');

  }
  constructor(props) {
    super(props);
    var { params } = this.props.navigation.state;
    this.state = ({
      dataSource: [],
      deletedRowKey: null,
      patient_id: params.patient_id,
      medicineListData: medicineListData
    });
    console.log(medicineListData)
    this._onPressAdd = this._onPressAdd.bind(this);
  }
  refreshFlatList = (activeKey) => {
    this.setState((prevState) => {
      return {
        deletedRowKey: activeKey
      };
    });
    this.refs.flatList.scrollToEnd();
  }
  componentDidMount() {
    console.log("hii")
  }
  _onPressAdd(txt) {
    // alert("You add Item");
    this.refs.addModal.showAddModal(this.state.patient_id);
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
      <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 60 : 30 }}>
        <Text style={{ flexDirection: 'column', fontStyle: 'italic', justifyContent: 'space-around', marginLeft: 15, marginTop: -23, fontWeight: '500', fontSize: 16, }}>Medicine</Text>
        <Text style={{ flexDirection: 'column', fontStyle: 'italic', justifyContent: 'space-around', marginLeft: 175, marginTop: -23, fontWeight: '500', fontSize: 16, }}>Dosages</Text>
        <Text style={{ flexDirection: 'column', fontStyle: 'italic', justifyContent: 'space-around', marginLeft: 300, marginTop: -23, fontWeight: '500', fontSize: 16, }}>Duration</Text>
        <ScrollView>
          {
            this.state.medicineListData.map(medicineitem => {
              return (
                <View>

                  <Text style={[styles.setFontSize, styles.setColorRed, styles.setAlign]}>{medicineitem.date}</Text>
                  <FlatList
                    ref={"flatList"}
                    data={medicineitem.medicine}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                      //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                      return (
                        <MedicineListItem item={item} index={index} parentFlatList={this}>

                        </MedicineListItem>);
                    }}
                  >

                  </FlatList>

                </View>
              )
            })}
        </ScrollView>
      </View>
    );
  }
}

export const Tab_1 = createMaterialTopTabNavigator({
  First: {
    screen: BasicFlatList,
  },
}, {
  tabBarPosition: 'top',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#fff',
    pressColor: '#fff',
    inactiveTintColor: '#fff',
    style: {
      marginTop: -60,
      backgroundColor: '#fff'
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
    pressColor: '#fff',
    inactiveTintColor: '#fff',
    style: {
      marginTop: -60,
      backgroundColor: '#fff'
    },
    labelStyle: {
      fontSize: 16,
      fontWeight: '200'
    }
  }

});
export const Tab_3 = createMaterialTopTabNavigator({
  Fifth: {
    screen: MedicineHistory_Screen,
  },
}, {
  tabBarPosition: 'top',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#fff',
    pressColor: '#fff',
    inactiveTintColor: '#fff',
    style: {
      marginTop: -60,
      backgroundColor: '#fff'
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
      title: 'Recommended Medicine',
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
      title: 'Second Screen',
      headerTitleStyle: {
        fontStyle: 'italic'
      },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
		marginTop: 0,
        height: Dimensions.get('window').height / 8
      },
      headerTintColor: '#fff',
    })
  },
});
const Third_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_3,
    navigationOptions: ({ navigation }) => ({
      title: 'Rx History',
      headerTitleStyle: { fontStyle: 'italic' },
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
const MyDrawerNavigator = createDrawerNavigator({

  Home: {
    screen: First_2_Tabs,
  },

  Settings: {
    screen: Second_2_Tabs,
  },
  RxHistory: {
    screen: Third_2_Tabs,
  }
});

export default createAppContainer(MyDrawerNavigator);