
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, TouchableOpacity, Button, Vibration } from 'react-native';
import flatListData from '../data/flatListData';
import Swipeout from 'react-native-swipeout';

import AddModal1 from './AddModal';
import EditModal from './EditModal';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { createAppContainer,  createDrawerNavigator, createStackNavigator } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Globals from '../Globals';

//console.disableYellowBox = true;


console.log(getStatusBarHeight(true));
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
class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
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
            this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this);
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

                <Text style={styles.flatListItem}>  {this.props.item.country}</Text>
                <Text style={styles.flatListItem1}>  {this.props.item.foodDescription}-{this.props.item.foodDescription1}-{this.props.item.foodDescription2}</Text>
                <Text style={styles.flatListItem2}>  {this.props.item.foodDescription3} {this.props.item.itemValue}</Text>
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
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 50,

  },
  fabIcon: {
    fontSize: 50,
    color: 'transparent'
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
    this.state = ({
      deletedRowKey: null,
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
  _onPressAdd() {
    // alert("You add Item");
    this.refs.addModal.showAddModal();
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 60 : 30 }}>
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 15, marginTop: -27, fontWeight: '500', fontSize: 20, }}>Medicine</Text>
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 155, marginTop: -27, fontWeight: '500', fontSize: 20, }}>Dosages</Text>
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 280, marginTop: -27, fontWeight: '500', fontSize: 20, }}>Duration</Text>

        <FlatList
          ref={"flatList"}
          data={flatListData}
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
        <AddModal1 ref={'addModal'} parentFlatList={this} >

        </AddModal1>
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
      title: 'Recommended Medicine',
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

  }

});

export default createAppContainer(MyDrawerNavigator);