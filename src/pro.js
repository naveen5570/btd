import React, { Component } from 'react';
import flatListData from '../data/flatListData';
import medicineListData from '../data/medicineListData';
import {
  StyleSheet, Dimensions, Text, View, TouchableOpacity, Image, Platform, ActivityIndicator
} from 'react-native';
import { Button, CheckBox } from 'react-native-elements'
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Logout from './Logout';
import signin3 from './signin3';
import AboutUs from '../Profile/AboutUs';
import ContactUs from '../Profile/ContactUs';
import MySubscriptions from '../Profile/MySubscriptions';
import PaymentHistory from '../Profile/PaymentHistory';
import KnowYourPrakirti from '../Profile/KnowYourPrakirti';
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
    this.props.navigation.navigate('Second');

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

    return (



      <View style={styles.container}>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("SugarInput1", {
          patient_id: this.state.patient_id,
          name: this.state.name,
          email: this.state.email,
          batch_id: this.state.batch_id,
          phone: this.state.phone
        })}>

          <View style={{
            backgroundColor: '#F7F7F7',
            height: hp('21%'),
            margin: 5,
            width: wp('47%'),

          }}>
            <Image
              style={{
                flex: 1,
                height: hp('20%'),
                width: wp('47%')
              }}
              source={require("./image/sugar.jpg")} />



            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("SugarInput1")} >Sugar Input</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("BTDMessaging")}>

          <View style={{
            backgroundColor: '#F7F7F7',
            height: hp('21%'),
            margin: 5,
            width: wp('47%'),
          }}>
            <Image
              style={{
                flex: 1,
                height: hp('20%'),
                width: wp('47%')

              }}
              source={require("./image/broadcasts1.jpg")} />

            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("BTDMessaging", {
              patient_id: this.state.patient_id,
              name: this.state.name,
              email: this.state.email,
              batch_id: this.state.batch_id,
              phone: this.state.phone
            })}>BTD Messaging</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={(items) => this.props.navigation.navigate('MyChatp')}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: hp('21%'),
            margin: 5,
            width: wp('47%'),

          }}>
            <Image
              style={{
                flex: 1,

              }}
              source={{ uri: 'https://image.freepik.com/free-vector/family-with-child-doctor-consultation-online-using-medical-care-application-smartphone_121223-256.jpg' }}
            />

            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate('MyChatp')} >Consult Doctor</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.rxhistory(); this.redirectaddmedi(); }} >
          <View style={{
            backgroundColor: '#F7F7F7',
            height: hp('21%'),
            margin: 5,
            width: wp('47%'),
          }}>
            <Image
              style={{
                flex: 1,

              }}
              source={{ uri: 'https://image.freepik.com/free-photo/colorful-pills-plastic-bottle_23-2147983113.jpg' }}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => { this.rxhistory(); this.redirectaddmedi(); }} >Medicine</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("Recipe1")}>
          <View style={{
            backgroundColor: '#F7F7F7',

            height: hp('21%'),
            margin: 5,
            width: wp('47%'),
          }}>
            <Image
              style={{
                flex: 1,

              }}
              source={{ uri: 'https://cashurscrap.000webhostapp.com/wp-content/uploads/recipe.jpg' }}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Recipe1")} >Recipe</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("Membership1")}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: hp('21%'),
            margin: 5,
            width: wp('47%'),
          }}>
            <Image
              style={{
                flex: 1,

              }}
              source={{ uri: 'https://image.freepik.com/free-photo/fitness-membership_53876-47423.jpg' }}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Membership1")} >Membership</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("Events1")}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: hp('21%'),
            margin: 5,
            width: wp('47%'),
          }}>
            <Image
              style={{
                flex: 1,
                height: hp('20%'),
                width: wp('47%')

              }}
              source={require("./image/events1.jpg")} />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("Events1")} >Upcoming Events</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatScreen1")}>
          <View style={{
            backgroundColor: '#F7F7F7',
            height: hp('21%'),
            margin: 5,
            width: wp('47%'),
          }}>
            <Image
              style={{
                flex: 1,

              }}
              source={{ uri: 'https://image.freepik.com/free-photo/close-up-doctor-with-fruits-vegetables-writing_23-2148302127.jpg' }}
            />
            <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("ChatScreen1")} >Consult Nutritionist</Text>

          </View>
        </TouchableOpacity>


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
  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    let { image } = this.state;

    return (

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={this._pickImage} style={styles.avatarplaceholder}>

              {image &&
                <Image source={{ uri: image }} style={styles.avatar} />}
            </TouchableOpacity>
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
                onPress={() => this.props.navigation.navigate("pro1", {
                  name: this.state.name,
                  email: this.state.email,
                  patient_id: this.state.patient_id,
                  phone: this.state.phone,
                })}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 8,

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
                onPress={() => this.props.navigation.navigate("MySubscriptions")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 8,

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
                onPress={() => this.props.navigation.navigate("PaymentHistory")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 8,

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
                onPress={() => this.props.navigation.navigate("KnowYourPrakirti")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 8,

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
                onPress={() => this.props.navigation.navigate("AboutUs")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 8,

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
                onPress={() => this.props.navigation.navigate("ContactUs")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 8,

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
                onPress={() => this.props.navigation.navigate("")}
                titleStyle={{
                  color: '#039BE5',
                  fontSize: 18,
                  marginTop: 8,

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

}, {
  tabBarPosition: 'top',

  swipeEnabled: true,

  tabBarOptions: {

    activeTintColor: '#fff',
    pressColor: '#004D40',
    inactiveTintColor: '#fff',
    style: {
      marginTop: -70,
      backgroundColor: '#fff'

    },

    labelStyle: {
      fontSize: 16,
      fontWeight: '200',
      textAlign: 'center'
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

      marginTop: -70,
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
      title: 'Home',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#F6F9FC',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
        textAlign: 'center',
        marginLeft: '0%',
        marginTop: 0,
        height: Dimensions.get('window').height / 8
        // remove shadow on iOS
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

  },
  Know_Your_Prakirti: {

    screen: KnowYourPrakirti,

  },
  PaymentHistory: {

    screen: PaymentHistory,

  },
  MySubscriptions: {

    screen: MySubscriptions,

  },
  AboutUs: {
    screen: AboutUs,
  },
  ContactUs: {
    screen: ContactUs
  },
  Logout: {
    screen: signin3,
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

  text:
  {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
  container: {

    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  box: {
    backgroundColor: '#00BCD4',
    height: 150,
    margin: 5,
    width: 170,

  },
  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0

  },

  GridViewBlockStyle: {

    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 150,
    margin: 5,
    backgroundColor: '#00BCD4'

  }
  ,

  GridViewInsideTextItemStyle: {

    color: '#000000',
    padding: 10,
    fontSize: 17,
    justifyContent: 'center',
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
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  avatarplaceholder: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    backgroundColor: 'aqua'
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