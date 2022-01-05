import React from 'react';
import { StyleSheet, Text, View, Image, WebView } from 'react-native';
import WebView from 'react-native-webview';

export default class Screen3 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Screen Four',
    drawerIcon: () => (
      <Image
        source={{ uri: `https://dummyimage.com/60x60/000/fff.jpg&text=4` }}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#e8f7ff' }}>


        <WebView source={{ uri: "http://webquadrants.com/btd2/public/admin/questions/2" }} />


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
