
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Globals from '../Globals';
import { createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
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
            source={require("../src/image/back.png")}
            style={{ tintColor: '#fff', resizeMode: 'contain', width: 50, height: 50, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
class AboutUs extends Component {

  static navigationOptions =
    {
      title: 'AboutUs',

    };

  constructor(props) {
    super(props);
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed ");
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Image style={styles.logo} source={require("../assets/about.png")} />
          <Text style={styles.slogan}>Our Vision</Text>
          <View style={styles.descriptionContent}>
            <Text style={styles.description}>
              BTD is devoted in Spreading Awareness of Diabetes, Provide Education, Healthy Lifestyle Tips, Inspiration and Support to Diabetic and family members.{'\n'}{'\n'}
              Believing In Natural Healing Mechanism{'\n'}{'\n'}
              Saying No To Medicine{'\n'}{'\n'}
              Saying Yes To Dessert{'\n'}{'\n'}
            </Text>
            <View style={styles.container}>
              <Text style={styles.companyName}>Leadership</Text>
              <Text style={styles.slogan}>Dr.Dinesh Ishwar</Text>
              <Text style={styles.description}>
                Dr. Dinesh Ishwar Is the man Behind “ BEAT THE DAIBETES” Taking keen interest In Reversing Diabetes and Related Disorder and creating a healthy vibrant in People.{'\n'}{'\n'}
                He got admission into prestigious college AVPM, Sion(Mumbai).After his UG, as a first step into MD (AYU), Maharashtra University of Health Science from VAM, Amravati( Maharashtra) . During PG, he completed his PG Diploma in public health from Chennai. Also another PG Diploma in Diabetology from Delhi in year 2015.{'\n'}{'\n'}
                He attended the Doctors training for Reversal Diabetes and other chronic disorder with Various successful Diabetologist.{'\n'}{'\n'}
                He adopted the insights to the Indian population and applied it to the patients to workshops and consultations. The actual results are amazing and have inspired him to take the possibility of natural healing to help many other more diabetics experiences vibrant health without drugs. Under his guidance many are free from diabetic medicine and some of them have lost weight naturally.


              </Text>

            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={styles.companyName}>About Team Member </Text>
              <Text style={styles.description}>BTD Team Including Dedicated Doctors and Nutritionist/ Dietitian will Guide you during your Diabetes Reversal Journey and can be reached out 24/7 on call or chat with Doctor or Dietitian/ Nutritionist on Our mobile APP and Customer support Number.{'\n'}{'\n'}BTD has team of Associate Doctors, Nutritionist/ Dietitian, researcher and office staff who are Passionate for BTD mission</Text>
              <Text style={{
                flex: 1, paddingLeft: 5, color: '#e8f7ff', fontSize: 18,
                fontWeight: '400',
              }}> </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

class Settings_Screen extends Component {

  static navigationOptions =
    {
      title: 'Settings',
    };

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Settings Screen Activity.</Text>

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
    screen: AboutUs,
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
      title: 'About Us',
      headerTitleStyle: {
        fontStyle: 'italic'
      },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#74cdf0',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
        textAlign: 'center',
        marginLeft: '0%'
        // remove shadow on iOS
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

  Home: {

    screen: First_2_Tabs,

  },

  Settings: {

    screen: Second_2_Tabs,

  }

});


export default createAppContainer(MyDrawerNavigator);
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    flex: 1,
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 30,
  },
  companyName: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center'
  },
  slogan: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 10,
  },
  descriptionContent: {
    padding: 30
  },
  description: {
    fontSize: 18,

    marginTop: 10,
    color: '#6b6e72',
    alignSelf: 'center',
    textAlign: 'auto'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
  },
  sendButton: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: '#EE82EE',
  }
}); 