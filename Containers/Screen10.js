import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,

  Platform
} from 'react-native';
import ListView from "deprecated-react-native-listview";
import { Toolbar } from 'react-native-material-ui';
export default class Screen2 extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: '' };
    this.arrayholder = [];
  }
  componentDidMount() {
    return fetch('http://192.168.1.142/User_Project/auth-screens/src/pat.php')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function () {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,
    });
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.5,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };
  static navigationOptions = {
    drawerLabel: 'Screen Ten',
    drawerIcon: () => (
      <Image
        source={{ uri: `https://dummyimage.com/60x60/000/fff.jpg&text=2` }}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
    )
  }

  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 350 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList

          data={this.state.dataSource}

          ItemSeparatorComponent={this.FlatListItemSeparator}

          renderItem={({ item }) =>

            <View style={{ flex: 1, flexDirection: 'row' }}>

              <Image source={{ uri: item.patient_image_url }} style={styles.imageView} />

              <Text onPress={(GetItem) => this.props.navigation.navigate("addmedi")} style={styles.textView} >{item.name}  ({item.batch_id})</Text>

            </View>

          }

          keyExtractor={(item, index) => index.toString()}

        />
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
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    padding: 16,
  },
  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 0,
    marginTop: (Platform.OS === 'ios') ? 20 : 30,

  },
  textStyle: {
    padding: 20,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  imageView: {

    width: '10%',
    height: 50,
    margin: 7,
    borderRadius: 10

  },
  textView: {

    width: '50%',
    textAlignVertical: 'center',
    padding: 0,
    color: '#000'

  }
})
