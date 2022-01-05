import React from 'react';
import {
  KeyboardAvoidingView, View, Animated, Clipboard,
  Image,
  Share,
  StatusBar, SafeAreaView, ImageBackground, ToastAndroid, AsyncStorage, Keyboard, TextInput, Dimensions, FlatList, TouchableOpacity, Text, Platform
} from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import styles from './constants/styles';
import User from '../User';
import firebase from 'firebase';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid';
import { firebaseConfig } from './Chatapi/index';
import * as Notifications from 'expo-notifications';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import Globals from '../Globals';

const isIOS = Platform.OS === 'ios';

class HamburgerIcon extends React.Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  }
  goback = () => {
    this.props.navigationProps.goBack(null);
  }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.goback.bind(this)} >
          <Image
            source={require("./image/back.png")}
            style={{ tintColor: 'white', resizeMode: 'contain', width: 50, height: 50, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', null)
    }
  }



  constructor(props) {
    super(props);

    this.state = {
      person: {
        device_token: '',
        name: props.navigation.getParam('name'),
        id: props.navigation.getParam('firebase_id'),
        firebase_id: props.navigation.getParam('firebase_id'),
      },

      currentUserfirebase_id: User.firebase_id,
      firebase_id: props.navigation.getParam('firebase_id'),
      textMessage: '',
      messageList: [],
      image: null,
      imagemessage: '',
      uploading: false,
      dbRef: firebase.database().ref('messages')
    }

    this.keyboardHeight = new Animated.Value(0);
    this.bottmPadding = new Animated.Value(60);
  }
  async componentDidMount() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationCategoryAsync('Chat', {
        name: 'Chat Messages',
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    this.keyboardShowListener = Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => this.keyboardEvent(e, true));
    this.keyboardHideListener = Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
      (e) => this.keyboardEvent(e, false));
    this.registerForPushNotifications();
    this.getUser();
    this.state.dbRef.child(this.state.currentUserfirebase_id).child(this.state.person.firebase_id)
      .on('child_added', (value) => {
        this.setState((prevState) => {
          return {
            messageList: [...prevState.messageList, value.val()]
          }
        })
      })
  }
  UNSAFE_componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAoCmSB4ta5sq-jXgQEOppcfOSPPhhtSMc",
      authDomain: "beatthediabetes-ddb70.firebaseapp.com",
      databaseURL: "https://beatthediabetes-ddb70.firebaseio.com",
      projectId: "beatthediabetes-ddb70",
      storageBucket: "beatthediabetes-ddb70.appspot.com",
      messagingSenderId: "1016690843275",
      appId: "1:1016690843275:web:0cbff4059987435fec3e8e",
      measurementId: "G-7KJFTB9S7P"
    };
    // Initialize Firebase
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig).firestore()
      : firebase.app().firestore();
  }
  _createNotificationAsync = () => {
    Notifications.presentLocalNotificationAsync({
      title: 'Chat',
      body: `You Have a New Message from ${User.name}`,
      android: {
        channelId: 'Chat',
        color: '#FF0000',
      },
    });
  }

  getUser = () => {

    fetch(Globals.base_url + 'apptapp/Sugar/getUser.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.firebase_id,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result == '1') {
          console.log(responseJson)
          this.state.person.device_token = responseJson.user.device_token
          console.log(this.state.person)
          // Showing response message coming from server after inserting records.
        }

      }).catch((error) => {
        console.error(error);
      });
  }
  componentWillReceiveProps({ data }) {
    this.setState({ data });
  }



  registerForPushNotifications = async () => {

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
      Notifications.setNotificationChannelAsync('Chat', {
        name: 'Chat',
        sound: true,
        priority: 'high',
        vibrate: [0, 250, 250, 250],
      });
    }
    console.log(token.data);
    this.setState({ expoPushToken: token.data });

  }

  sendPushNotification = async () => {
    /* const message = {
       to: this.state.person.device_token,
       sound: 'default',
       title: 'New Message',
       body: `You Have a New Message from ${User.name}`,
       data: {
         firebase_id: this.state.currentUserfirebase_id,
         name: User.name,
         page: "Chat"
       },
       _displayInForeground: true,
     };*/
    const message = [{
      to: this.state.person.device_token,
      title: 'New Message',
      priority: "high",
      body: `You Have a New Message from ${User.name}`,
      sound: 'default', // android 7.0 , 6, 5 , 4
      channelId: "Chat", // android 8.0 later
      vibrate: true,
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
      data: {
        firebase_id: this.state.currentUserfirebase_id,
        name: User.name,
        page: "Chat"
      },
    }]

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


  componentWillUnmount() {
    this.state.dbRef.off();
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }
  keyboardEvent = (event, isShow) => {
    let heightOS = isIOS ? 60 : 80;
    let bottomOS = isIOS ? 120 : 140;
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {

        toValue: isShow ? heightOS : 0
      }),
      Animated.timing(this.bottmPadding, {

        toValue: isShow ? bottomOS : 60
      })
    ]).start();
  }
  handleChange = key => val => {
    this.setState({ [key]: val })
  }

  convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + '' + d.getMonth() + '' + result;
    }
    return result;
  }

  sendMessage = async () => {

    if (this.state.textMessage.length > 0 || this.state.imagemessage.length > 0) {
      let msgId = this.state.dbRef.child(this.state.currentUserfirebase_id).child(this.state.person.firebase_id).push().key;
      let updates = {};
      let messageType = '';
      if (this.state.textMessage.length > 0) {
        messageType = 'text'
      } else if (this.state.imagemessage.length > 0) {
        messageType = 'image'
      }
      let message = {
        message: this.state.textMessage,
        imagemessage: this.state.imagemessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: this.state.currentUserfirebase_id,
        messageType: messageType,

      }

      updates[this.state.currentUserfirebase_id + '/' + this.state.person.firebase_id + '/' + msgId] = message;
      updates[this.state.person.firebase_id + '/' + this.state.currentUserfirebase_id + '/' + msgId] = message;
      this.state.dbRef.update(updates);
      console.log(this.state.person);
      if (this.state.person.device_token != "") {
        this.sendPushNotification();
      }
      this.setState({ textMessage: '', imagemessage: '' });
    }

  }
  saveFile = async (fileUri) => {
    console.log(fileUri)
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
  }
  downloadFile = async (uri) => {
    //const uri = "http://techslides.com/demos/sample-videos/small.mp4"
    let fileUri = FileSystem.documentDirectory + "" + uuid.v4() + ".jpg";

    await FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {

        this.saveFile(uri);
        ToastAndroid.show('File downloaded', ToastAndroid.SHORT)
        console.log(uri)
      })
      .catch(error => {
        console.error(error);
      })
  }


  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };
  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };
  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = this.uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  uploadImageAsync = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref('images')
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    let imgpath = await snapshot.ref.getDownloadURL();

    this.state.imagemessage = imgpath
    console.log(this.state)
    this.sendMessage()
    return imgpath;
  }

  renderRow = ({ item }) => {
    let { imagemessage } = this.state;
    return (
      <View>
        <View style={(item.messageType == 'image') ? { display: 'none' } :
          {
            flexDirection: 'row',
            width: '70%',
            alignSelf: item.from === this.state.currentUserfirebase_id ? 'flex-end' : 'flex-start',
            backgroundColor: item.from === this.state.currentUserfirebase_id ? '#0084ff' : '#44bec7',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
          }}>

          <Text style={{ color: '#fff', padding: '2%', fontSize: 16, margin: '2%', fontStyle: 'italic' }}>
            {item.message}
          </Text>
        </View>

        <View style={(item.messageType == 'text') ? { display: 'none' } :
          {
            flexDirection: 'row',
            width: '70%',
            alignSelf: item.from === this.state.currentUserfirebase_id ? 'flex-end' : 'flex-start',
            borderBottomLeftRadius: 15,
            borderBottomsRightRadius: 15
          }}>
          <TouchableOpacity onPress={() => this.downloadFile(item.imagemessage)} style={(item.messageType == 'text') ? { display: 'none' } :
            {
              flexDirection: 'row',
              width: '100%',
              alignSelf: item.from === this.state.currentUserfirebase_id ? 'flex-end' : 'flex-start',
              borderBottomLeftRadius: 15,
              borderBottomsRightRadius: 15
            }}>

            <Image source={{ uri: item.imagemessage }} style={{ width: '100%', height: 250 }} />
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          width: '70%',
          alignSelf: item.from === this.state.currentUserfirebase_id ? 'flex-end' : 'flex-start',
          backgroundColor: item.from === this.state.currentUserfirebase_id ? '#44bec7' : '#7289da',
          marginBottom: 10,
          borderBottomLeftRadius: 15,
          borderBottomsRightRadius: 15,

        }}>
          <Text style={{ color: '#eee', padding: '1%', fontSize: 12, marginLeft: "30%", fontStyle: 'italic' }}>{moment(item.time).format('LLL')}</Text>

        </View>
      </View>

    )
  }

  render() {
    let { height } = Dimensions.get('window');

    return (
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="height" enabled keyboardVerticalOffset={150}>
        <Animated.View style={[styles.bottomBar]}>

          <TextInput
            style={styles.inputMessage}
            value={this.state.textMessage}
            placeholder="Type Message...."
            onChangeText={this.handleChange('textMessage')}

          />

          <TouchableOpacity onPress={this._pickImage} style={styles.sendButton}>
            <Image source={require('../images/attachment.png')} style={{ tintColor: 'white', resizeMode: 'contain', height: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.sendMessage} style={styles.sendButton}>
            <Image source={require('../images/message.png')} style={{ tintColor: 'white', resizeMode: 'contain', height: 20 }} />
          </TouchableOpacity>
        </Animated.View>

        <FlatList
          backgroundColor="#c2f2d0"
          ref={ref => this.flatList = ref}
          onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
          onLayout={() => this.flatList.scrollToEnd({ animated: true })}
          style={{ padding: 5, height }}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<Animated.View style={{ height: this.bottmPadding }} />}
        />

      </KeyboardAvoidingView>
    )
  }
}




class Student_Screen extends React.Component {

  static navigationOptions =
    {
      title: '',

    };
  constructor(props) {
    super(props);

    this.state = {
      name: User.name,
      email: User.email,
      batch_id: User.batch_id,
      patient_id: User.patient_id,
      phone: User.phone,
      info: "",
    };
  }
  gotoNextActivity = () => {
    this.props.navigation.navigate('Forth');

  }

  render() {

    return (

      <View style={styles.container}>

      </View>
    );
  }
}

export const Tab_1 = createMaterialTopTabNavigator({
  First: {
    screen: ChatScreen,
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
      fontWeight: '200',
      fontStyle: 'italic'
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
      backgroundColor: '#74cdf0'
    },
    labelStyle: {
      fontSize: 16,
      fontWeight: '200',
      fontStyle: 'italic'
    }
  }
});

const First_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_1,
    navigationOptions: ({ navigation }) => ({
      title: 'Chats ',
      headerTitleStyle: {
        fontStyle: 'italic'
      },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#74cdf0',
        elevation: 3, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        fontStyle: 'italic',
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
      title: 'Chats',
      headerTitleStyle: {
        backgroundColor: '#74cdf0'
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

const MyDrawerNavigator = createDrawerNavigator({

  Home: {
    screen: First_2_Tabs,
  },
  Profile: {
    screen: Second_2_Tabs,
  }

});
export default createAppContainer(MyDrawerNavigator);