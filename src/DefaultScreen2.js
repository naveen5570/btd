import React, { Component } from 'react';

import {
  StyleSheet, Dimensions, Text, View, Button, TouchableOpacity, Image, ActivityIndicator, FlatList, Alert, Platform } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid'
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Moment from 'react-moment';
import Globals from '../Globals';
import FormButton from '../components/FormButton';
import ListView from "deprecated-react-native-listview";
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
      title: 'Sugar Value',

    };
  constructor(props) {

    super(props);
    var { params } = this.props.navigation.state;

    this.state = {
      name: params.name,
      email: params.email,
      batch_id: params.batch_id,
      TextInput_date: '',
      patient_id: params.patient_id,
      phone: params.phone,
      info: "",

      loading: true, isAppReady: false,

    }

  }

  componentDidMount() {

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
        console.log(responseJson)
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          loading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }



  GetGridViewItem(fruit_name) {

    Alert.alert(fruit_name);

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
      <View style={{ flex: 1, padding: 50 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <Grid>
              <Row style={styles.container}>
                <Col
                  style={[
                    styles.container,
                    { backgroundColor: "yellow" }
                  ]}
                >
                  <Text>{rowData}</Text>
                </Col>
                <Col
                  style={[
                    styles.container,
                    { backgroundColor: "green" }
                  ]}
                >
                  <Text>{rowData}</Text>
                </Col>
              </Row>
              <Row style={styles.container}>
                <Col
                  style={[
                    styles.container,
                    { backgroundColor: "skyblue" }
                  ]}
                >
                  <Text>{rowData.date}</Text>
                </Col>
                <Col
                  style={[
                    styles.container,
                    { backgroundColor: "orange" }
                  ]}
                >
                  <Text>{rowData.bpmax}</Text>
                </Col>
              </Row>
            </Grid>
          )}
        />
      </View>
    );
  }
}

class Settings_Screen extends Component {

  static navigationOptions =
    {
      title: 'BP VALUE',
    };
  constructor(props) {

    super(props);

    this.state = {

      loading: true

    }

  }

  componentDidMount() {

    return fetch('https://cashurscrap.000webhostapp.com/BPValues.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  GetGridViewItem(fruit_name) {

    Alert.alert(fruit_name);

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
      <View style={styles.MainContainer1}>
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 35, fontWeight: 'bold', fontSize: 20 }}>Date</Text>
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 130, marginTop: -25, fontWeight: 'bold', fontSize: 20 }}>BP MIN</Text>
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 230, marginTop: -27, fontWeight: 'bold', fontSize: 20 }}>BP MAX</Text>
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 215, marginTop: -27, fontWeight: 'bold', fontSize: 20 }}></Text>
        <Text style={{ flexDirection: 'column', justifyContent: 'space-around', marginLeft: 275, marginTop: -27, fontWeight: 'bold', fontSize: 20 }}></Text>
        <View style={styles.MainContainer}>




          <FlatList

            data={this.state.dataSource}
            renderItem={({ item }) =>

              <View style={styles.GridViewBlockStyle1}>

                <Text
                  style={styles.GridViewInsideTextItemStyle1}
                  onPress={() => this.props.navigation.navigate("medicinerec")} >

                  {item.date} {item.bpmin} {item.bpmax}
                </Text>


              </View>

            }

            keyExtractor={(item, index) => index}
            numColumns={2.5}

          />

        </View>
        <View style={styles.buttonContainer}>
          <FormButton
            buttonType='outline'

            title='Chat'
            buttonColor='#00b8ff'


            onPress={() => this.props.navigation.navigate("MyChat1")}

          />
        </View>
        <View style={styles.buttonContainer1}>
          <FormButton
            buttonType='outline'

            title='Medicine'
            buttonColor='#00b8ff'


            onPress={() => this.props.navigation.navigate("addmedi")}

          />
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
      title: 'Inputted Values',
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
      title: 'Sugar Values',
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

const styles = StyleSheet.create({

  MainContainer: {

    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 11

  },
  MainContainer1: {

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
  ActivityIndicator_Style: {

    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },

  GridViewBlockStyle: {

    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 60,
    margin: 1,
    backgroundColor: '#e8f7ff',
    shadowColor: 'red',

    borderRadius: 10,

  }
  ,
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  GridViewInsideTextItemStyle: {

    color: '#000000',
    padding: 10,
    fontSize: 13,
    justifyContent: 'center',


  },
  GridViewBlockStyle1: {

    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 60,
    margin: .55,
    backgroundColor: '#e8f7ff'

  }
  ,
  buttonContainer: {
    margin: 25,
    padding: 30,

  },
  buttonContainer1: {
    margin: 25,
    padding: 30,
    marginTop: -50,
  },
  GridViewInsideTextItemStyle1: {

    color: '#000000',
    padding: 5,
    fontSize: 16,
    justifyContent: 'center',

  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  },

});