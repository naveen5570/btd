import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  StatusBar,
  Dimensions, ToastAndroid, AsyncStorage,
} from "react-native";

import signin3 from "./src/signin3";
import pro1 from "./src/pro1";
import Dashboard from "./src/Dashboard";


// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
const RootStack = createStackNavigator(
  {
    PatDashboard: pro1,
    DoctorDashboard: Dashboard,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#1e90ff"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1
      }
    }
  },
);
const AuthStack = createStackNavigator({ SignIn: signin3 });

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadData();
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }

  _loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : 'App');
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});




export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
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