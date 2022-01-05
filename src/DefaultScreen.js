import React, { Component } from 'react';
import flatListData from '../data/flatListData';
import {
  StyleSheet, Dimensions, Text, View, TouchableOpacity, Image, ActivityIndicator, FlatList, Alert, Platform, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Moment from 'react-moment';
import GradientButton from "react-native-gradient-buttons";
import { Button, CheckBox } from 'react-native-elements';
import Globals from '../Globals';

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
      dataSource: [],
      name: params.name,
      batch_id: params.batch_id,
      TextInput_date: '',
      patient_id: params.patient_id,
      phone: params.phone,
      info: "",
      loading: true, isAppReady: false,
    };
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
        console.log(responseJson.result)

        flatListData.length = 0;
        // flatListData.splice(0,flatListData.length)
        if (responseJson.result == 1) {
          responseJson.data.medicine.map(rx =>
            flatListData.push(rx)
          )
        }
        this.props.navigation.navigate("addmedi1", {
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
  componentDidMount() {
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

        this.setState({
          loading: false,
          dataSource: responseJson.data
        }, function () {
          // In this block you can do something with new state.
        });
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
        <ScrollView>
          <View>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title>DATE</DataTable.Title>
                <DataTable.Title numeric>FASTING</DataTable.Title>
                <DataTable.Title numeric>PP1</DataTable.Title>
                <DataTable.Title numeric>PP2</DataTable.Title>
                <DataTable.Title numeric>PP3</DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {
                  this.state.dataSource.map(item => {
                    return (
                      <DataTable.Row>
                        <DataTable.Cell>{item.date}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.fasting}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.pp1}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.pp2}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.pp3}</DataTable.Cell>
                      </DataTable.Row>
                    )
                  })}
              </ScrollView>
            </DataTable>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <GradientButton
            style={{ marginTop: -10 }}
            textStyle={{ fontSize: 20 }}
            buttonType='clear'
            text='Chat'
            height={50}
            gradientBegin="#00b8ff"
            gradientEnd="#0083ff"
            onPressAction={() => this.props.navigation.navigate("MyChatp")}

          />
        </View>
        <View style={styles.buttonContainer1}>
          <GradientButton
            style={{ marginTop: -5 }}
            textStyle={{ fontSize: 20 }}
            buttonType='clear'
            text='Medicine'
            height={50}
            gradientBegin="#00b8ff"
            gradientEnd="#0083ff"
            onPressAction={() => this.redirectaddmedi()} />

        </View>
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
    var { params } = this.props.navigation.state;
    this.state = {
      dataSource: [],
      name: params.name,
      email: params.email,
      batch_id: params.batch_id,
      TextInput_date: '',
      patient_id: params.patient_id,
      phone: params.phone,
      info: "",
      loading: true, isAppReady: false,
    };
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

        this.setState({
          loading: false,
          dataSource: responseJson.data
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
      <View style={styles.MainContainer}>
        <ScrollView>
          <View>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title>DATE</DataTable.Title>
                <DataTable.Title numeric>BPMAX</DataTable.Title>
                <DataTable.Title numeric>BPMIN</DataTable.Title>

              </DataTable.Header>
              {
                this.state.dataSource.map(item => {
                  return (
                    <DataTable.Row>
                      <DataTable.Cell>{item.date}</DataTable.Cell>
                      <DataTable.Cell numeric>{item.bp_max}</DataTable.Cell>
                      <DataTable.Cell numeric>{item.bp_min}</DataTable.Cell>

                    </DataTable.Row>
                  )
                })}

            </DataTable>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <GradientButton
            style={{ marginTop: -15 }}
            textStyle={{ fontSize: 20 }}
            buttonType='clear'

            text='Chat'
            height={50}
            gradientBegin="#00b8ff"
            gradientEnd="#0083ff"


            onPressAction={() => this.props.navigation.navigate("MyChatp")}

          />
        </View>
        <View style={styles.buttonContainer1}>
          <GradientButton
            style={{ marginTop: -5 }}
            textStyle={{ fontSize: 20 }}
            buttonType='clear'

            text='Medicine'
            height={50}
            gradientBegin="#00b8ff"
            gradientEnd="#0083ff"


            onPressAction={() => this.props.navigation.navigate("addmedi1", {
              patient_id: this.state.patient_id,
              name: this.state.name,
              email: this.state.email,
              batch_id: this.state.batch_id,
              phone: this.state.phone
            })} />
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
    var { params } = this.props.navigation.state;
    this.state = {
      name: params.name,
      email: params.email,
      batch_id: params.batch_id,
      patient_id: params.patient_id,
      phone: params.phone,
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
  },
  MainContainer1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 10
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