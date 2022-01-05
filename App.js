import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer, DrawerItems, createDrawerNavigator } from 'react-navigation';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar, AsyncStorage, Vibration, Platform
} from "react-native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AnimatedSplash from "react-native-animated-splash-screen";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
//Implementing Patient Screens

import SignIn1 from "./src/SignIn1";
import pro1 from "./src/pro1";
import User from './User';
import SugarInput1 from './src/SugarInput1';
import DefaultScreen1 from './src/DefaultScreen1';
import addmedi1 from './src/addmedi1';
import BTDMessaging from './src/BTDMessaging';
import BroadCasts from './src/BroadCasts';
import Recipe1 from './src/Recipe1';
import MyChat from './src/MyChat';
import Membership1 from './src/Membership1';
import Events1 from './src/Events1';
import Detail from './src/Detail';
import CustomSideBarMenu from './src/CustomSidebarMenu';
import SignUp1 from './src/SignUp1';
import ForgotPassword1 from './src/ForgotPassword1';
import VerifyOTP from './src/VerifyOTP';
import Userinformation2 from './src/Userinformation2';
import OTP from './src/OTP';
import ResetPassword from './src/ResetPassword';
import FAQ from './Profile/FAQ';
import Healthpartners from './Profile/Healthpartners';
import AboutUs from './Profile/AboutUs';
import ContactUs from './Profile/ContactUs';
import MySubscriptions from './Profile/MySubscriptions';
import PaymentHistory from './Profile/PaymentHistory';
import KnowYourPrakirti from './Profile/KnowYourPrakirti';
import Privacy from './Profile/Privacy';
import Recipedetail from './src/Recipedetail';
import Globals from './Globals';


//Implementing Doctor Screens
import Dashboard from "./src/Dashboard";
import Sugardoc1 from './src/Sugardoc1';
import DefaultScreen3 from './src/DefaultScreen3';
import addmedi from './src/addmedi';
import Recipe from './src/Doctor/Recipe'
import Membership from './src/Doctor/Membership';
import Events from './src/Doctor/Events';
import EventDetails from './src/Doctor/EventDetails';

//Implementing Dieticiean Dashboard

import DieticieanDashboard from './src/DieticieanDashboard/DieticianDashboard';
import PatientList from './src/DieticieanDashboard/PatientList';
import PatientLogs from './src/DieticieanDashboard/PatientLogs';
import RecommendedMedicine from './src/DieticieanDashboard/RecommendedMedicine';
import RecipeDiet from './src/DieticieanDashboard/RecipeDiet';
import EventsDiet from './src/DieticieanDashboard/EventsDiet';
import EventDetailsDiet from './src/DieticieanDashboard/EventDetailsDiet';
import MembershipDiet from './src/DieticieanDashboard/MembershipDiet';


// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
const PatientStack = createStackNavigator({
  PatientDashboard: {
    screen: pro1,
  },
  SugarInput1: { screen: SugarInput1, },
  DefaultScreen1: { screen: DefaultScreen1, },
  addmedi1: { screen: addmedi1, },
  BTDMessaging: { screen: BTDMessaging, },
  BroadCasts: { screen: BroadCasts, },
  Recipe1: { screen: Recipe1, },
  MyChat: { screen: MyChat, },
  Membership1: { screen: Membership1, },
  Events1: { screen: Events1, },
  Detail: { screen: Detail, },
  FAQ: { screen: FAQ },
  Healthpartners: { screen: Healthpartners },
  AboutUs: { screen: AboutUs },
  ContactUs: { screen: ContactUs },
  MySubscriptions: { screen: MySubscriptions },
  PaymentHistory: { screen: PaymentHistory },
  KnowYourPrakirti: { screen: KnowYourPrakirti },
  Recipedetail: { screen: Recipedetail },
  Privacy: {
    screen: Privacy,
  }

},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },

);


const DoctorStack = createStackNavigator({
  DoctorDashboard: {
    screen: Dashboard,
  },
  Sugardoc1: {
    screen: Sugardoc1
  },
  DefaultScreen3: {
    screen: DefaultScreen3
  },
  addmedi: {
    screen: addmedi
  },
  MyChat: {
    screen: MyChat
  },
  Recipe: {
    screen: Recipe
  },
  Events: {
    screen: Events
  },
  EventDetails: {
    screen: EventDetails
  },
  Membership: {
    screen: Membership
  },
  FAQ: { screen: FAQ },
  Healthpartners: { screen: Healthpartners },
  AboutUs: {
    screen: AboutUs,
  },
  ContactUs: {
    screen: ContactUs,
  },
  Recipedetail: {
    screen: Recipedetail,
  },
  Privacy: {
    screen: Privacy,
  },
},

  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);
const DieticieanStack = createStackNavigator(
  {
    DieticieanDashboard: {
      screen: DieticieanDashboard
    },
    PatientList: {
      screen: PatientList
    },
    PatientLogs: {
      screen: PatientLogs
    },
    RecommendedMedicine: {
      screen: RecommendedMedicine
    },
    MyChat: {
      screen: MyChat
    },
    RecipeDiet: {
      screen: RecipeDiet
    },
    EventsDiet: {
      screen: EventsDiet
    },
    EventDetailsDiet: {
      screen: EventDetailsDiet
    },
    MembershipDiet: {
      screen: MembershipDiet
    },
    FAQ: { screen: FAQ },
    Healthpartners: { screen: Healthpartners },
    AboutUs: {
      screen: AboutUs,
    },
    ContactUs: {
      screen: ContactUs,
    },
    Recipedetail: {
      screen: Recipedetail,
    },
    Privacy: {
      screen: Privacy,
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,

    },

  }
);
const AuthStack = createStackNavigator(
  {
    SignIn1: SignIn1,
    SignUp1: SignUp1,
    ForgotPassword1: ForgotPassword1,
    VerifyOTP: VerifyOTP,
    Userinformation2: Userinformation2,
    OTP: OTP,
    ResetPassword: ResetPassword
  }
);

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expoPushToken: '',
      notification: {},
      isLoaded: false,
    }
    this._loadData();

  }

  async componentDidMount() {
    //await loadAsync()
    this.setState({ isLoaded: true })
    this.registerForPushNotifications();
    this._notificationSubscription = Notifications.addNotificationResponseReceivedListener(this._handleNotification);
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator
          color='#bc2b78'
          size="large"
        />

      </View>

    )
  }


  registerForPushNotifications = async (user_id = 0) => {

    const { status } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = status;
    if (status !== 'granted') {
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

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('defaultchannel', {
        name: 'defaultchannel',
        sound: true,
        priority: 'high',
        vibrate: [0, 250, 250, 250],
      });
    }
    console.log(token);
    this.setState({ expoPushToken: token });

  }

  _handleNotification = notification => {
    Vibration.vibrate();
    //console.log(notification);
    //console.log('this is to check navigation working or not')
    //this.props.navigation.navigate("Recipe1")
    this.setState({ notification: notification });

    const { origin } = notification;
    console.log('this is to check navigation working or not');
    if (origin !== 'selected') {

      if (User.doctorStatus == 'doctor') {
        let { patient_id, name, phone, batch_id, firebase_id, avatar, page } = notification.data;
        if (page == "suger logs") {
          this.props.navigation.navigate("DefaultScreen3", {
            patient_id: patient_id,
            name: name,
            batch_id: batch_id,
            phone: phone,
            firebase_id: firebase_id,
          })
        }
        else if (page == "Chat") {
          this.props.navigation.navigate("MyChat", {
            firebase_id: firebase_id,
            name: name
          })
        }
      } else if (User.doctorStatus == 'patient') {
        let { page } = notification.data;
        if (page == "Recommended Medicine") {
          this.props.navigation.navigate("DefaultScreen1")
        } else if (page == "Chat") {
          let { name, firebase_id } = notification.data;
          this.props.navigation.navigate("MyChat", {
            firebase_id: firebase_id,
            name: name
          })
        } else if (page == "BTD Message") {
          this.props.navigation.navigate("BTD Messaging")
        } else if (page == "Recipe") {
          this.props.navigation.navigate("Recipe1")
        }


        //  this.props.navigation.navigate('PatientApp');
      } else if (User.doctorStatus == 'dietician') {
        let { patient_id, name, phone, batch_id, firebase_id, avatar, page } = notification.data;
        if (page == "suger logs") {
          this.props.navigation.navigate("DefaultScreen1", {
            patient_id: patient_id,
            name: name,
            batch_id: batch_id,
            phone: phone,
            firebase_id: firebase_id,
          })
        }
        else if (page == "Chat") {
          this.props.navigation.navigate("MyChat", {
            firebase_id: firebase_id,
            name: name
          })
        }
        // this.props.navigation.navigate('DieticieanApp');
      }

      // this.props.navigation.navigate('DefaultScreen1');
    } else if (origin === 'received') {
      if (User.doctorStatus == 'patient') {
        let { page } = notification.data;
        if (page == "Approval") {
          let { firebase_id, patient_id, program_id, batch_id, app_access } = notification.data;
          User.app_access = app_access;
          User.patient_id = patient_id;
          User.program_id = program_id;
          User.batch_id = batch_id;
          User.firebase_id = firebase_id;
          User.approved = 1;
        } else if (page == "disApproval") {

          User.approved = 0;
          User.firebase_id = '';
        }
      }
    }


  };

  _loadData = async () => {
    //await AsyncStorage.clear();
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn !== '1') {

      this.props.navigation.navigate('Auth');
    } else {

      let userDetail = await AsyncStorage.getItem('userDetail');
      userDetail = JSON.parse(userDetail)
      for (const property in userDetail) {
        User[property] = userDetail[property]
      }
      this.registerForPushNotifications(User.id);
      this._notificationSubscription = Notifications.addNotificationResponseReceivedListener(this._handleNotification);
      if (User.doctorStatus == 'doctor') {
        this.props.navigation.navigate('DoctorApp');
      } else if (User.doctorStatus == 'patient') {
        this.props.navigation.navigate('PatientApp');
      } else if (User.doctorStatus == 'dietician') {
        this.props.navigation.navigate('DieticieanApp');
      }
    }

  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});




export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    PatientApp: PatientStack,
    DoctorApp: DoctorStack,
    DieticieanApp: DieticieanStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
/*
import SignIn from "./src/SignIn";
import Signin2 from "./src/Signin2";
import SocialAuth from "./src/SocialAuth";
import SignUp from "./src/SignUp";
import ForgotPassword from "./src/ForgotPassword";
import ForgotPassword1 from "./src/ForgotPassword1";
import OTP from "./src/OTP";
import Resend from "./src/Resend";
import ResetPassword from "./src/ResetPassword";
import Profile from "./src/Profile";
import profile1 from "./src/profile1";
import pro from "./src/pro";
import pro1 from "./src/pro1";
import UserInformation from "./src/UserInformation";
import SugarInput from "./src/SugarInput";
import SugarInput1 from "./src/SugarInput1";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import ChatScreen2 from "./screens/ChatScreen2";
import SignUp1 from "./src/SignUp1";
import medicine from "./src/medicine";
import medi from "./src/medi";
import recommend_med from "./src/recommend_med";
import addmedi from "./src/addmedi";
import addmedi1 from "./src/addmedi1";
import addmedi2 from "./src/addmedi2";
import Events from "./src/Events";
import Events1 from "./src/Events1";
import Detail from "./src/Detail";
import Userinformation1 from "./src/Userinformation1";
import DefaultScreen from "./src/DefaultScreen";
import medicinerec from "./src/medicinerec";
import BlueScreen from "./src/BlueScreen";
import Recipe from "./src/Recipe";
import Recipe1 from "./src/Recipe1";
import BTDMessaging from "./src/BTDMessaging";
import BPValue1 from "./src/BPValue1";
import BPInput from "./components/BPInput";
import BPInput1 from "./components/BPInput1";
import DefaultScreen1 from "./src/DefaultScreen1";
import ChatScreen1 from "./screens/ChatScreen1";
import Membership from "./src/Membership";
import Membership1 from "./src/Membership1";
import HomePage from "./components/Page/HomePage";
import News from "./components/Page/News";
import Notifications from "./components/Page/Notifications";
import SettingsPage from "./components/Page/SettingsPage";
import Notification1 from "./src/Notification1";
import Insert1 from "./src/Insert1";
import Dashboard from "./src/Dashboard";
import PatientProfile from "./src/PatientProfile";
import AboutUs from "./Profile/AboutUs";
import ContactUs from "./Profile/ContactUs";
import KnowYourPrakirti from "./Profile/KnowYourPrakirti";
import MySubscriptions from "./Profile/MySubscriptions";
import PaymentHistory from "./Profile/PaymentHistory";
import LogOut from "./Profile/LogOut";
import patientmed from "./src/patientmed";
import sugardoc from "./src/sugardoc";
import Sugardoc1 from "./src/Sugardoc1";
import DefaultScreen2 from "./src/DefaultScreen2";
import DefaultScreen3 from "./src/DefaultScreen3";
import Userinformation2 from "./src/Userinformation2";
import MyChat from "./src/MyChat";
import MyChatp from "./src/MyChatp";
import SignUp2 from "./src/SignUp2";
import signin3 from "./src/signin3";
import DietDashboard from "./dietscreens/DietDashboard";
import LoginView from "./src/LoginView";
import values from "./src/values";
import VerifyOTP from "./src/VerifyOTP";
import AllMedi from "./src/AllMedi";
import RxHistory from "./src/RxHistory";
import Logout from "./src/Logout";
import BroadCasts from "./src/BroadCasts";
import Dietician from './src/Dietician';
const AuthStack = createStackNavigator(
  {

    signin3,
    LoginView,
    SignIn,
    SignUp2,
    SignUp1,
    Signin2,
    SignUp,
    ForgotPassword,
    ForgotPassword1,
    SocialAuth,
    OTP,
    Resend,
    Profile,
    UserInformation,
    Userinformation1,
    SugarInput,
    SugarInput1,
    GoalInput,
    GoalItem,
    LoginScreen,
    ChatScreen,
    ChatScreen2,
    medicine,
    medi,
    recommend_med,
    addmedi,
    addmedi1,
    addmedi2,
    Events,
    Events1,
    Detail,
    DefaultScreen,
    medicinerec,
    BlueScreen,
    profile1,
    pro,
    pro1,
    Recipe,
    Recipe1,
    BPInput,
    BPInput1,
    BTDMessaging,
    BPValue1,
    DefaultScreen1,
    ChatScreen1,
    Membership,
    Membership1,
    HomePage,
    News,
    Notifications,
    SettingsPage,
    Notification1,
    Insert1,
    Dashboard,
    PatientProfile,
    AboutUs,
    ContactUs,
    KnowYourPrakirti,
    MySubscriptions,
    PaymentHistory,
    LogOut,
    patientmed,
    sugardoc,
    Sugardoc1,
    DefaultScreen2,
    DefaultScreen3,
    MyChat,
    MyChatp,
    DietDashboard,
    values,
    Userinformation2,
    VerifyOTP,
    AllMedi,
    ResetPassword,
    RxHistory,
    Logout,
    BroadCasts,
    Dietician,
  },
  {
    headerMode: "none"
  }
);

const App = createAppContainer(AuthStack);

export default App;
*/