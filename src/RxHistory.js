import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, TouchableOpacity, ActivityIndicator, Button, Vibration, ScrollView } from 'react-native';
import medicineListData from '../data/medicineListData';
import Swipeout from 'react-native-swipeout';
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Globals from '../Globals';


//console.disableYellowBox = true;


class HamburgerIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  }
  goback = () => {
    this.props.navigationProps.goBack(null);
  }
  render() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={this.goback.bind(this)} >
          <Image
            source={require("./image/back.png")}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
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
  },
  setFontSize: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#fff'
  },
  setColorRed: {
    color: '#f44336'
  },
  setAlign: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'
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
      medicineListData: medicineListData
    });
    this.state.medicineListData.map(medicineitem => {
      console.log(medicineitem.date)
    })
    this._onPressAdd = this._onPressAdd.bind(this);
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
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 15, marginTop: -27, fontWeight: '500', fontSize: 20, }}>Medicine</Text>
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 175, marginTop: -27, fontWeight: '500', fontSize: 20, }}>Dosages</Text>
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 300, marginTop: -27, fontWeight: '500', fontSize: 20, }}>Duration</Text>
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
                        <FlatListItem item={item} index={index} parentFlatList={this}>

                        </FlatListItem>);
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

const First_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_1,
    navigationOptions: ({ navigation }) => ({
      title: 'Rx History',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#F6F9FC',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
		marginTop: 0,
        height: Dimensions.get('window').height / 8
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

const MyDrawerNavigator = createDrawerNavigator({

  Home: {

    screen: First_2_Tabs,

  },

  Settings: {

    screen: Second_2_Tabs,

  },

});

export default createAppContainer(MyDrawerNavigator);