import React, { Component } from 'react';

import { StyleSheet, ActivityIndicator, TouchableOpacity, ListView, Text, View, Alert } from 'react-native';
import { Root, Popup } from 'popup-ui'
import Globals from '../Globals';


class Myproject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  GetItem(name, phone) {

    Alert.alert(name, phone);

  }


  componentDidMount() {

    return fetch('http://192.168.1.142/User_Project/auth-screens/src/pat.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 50 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>

        <ListView

          dataSource={this.state.dataSource}

          renderSeparator={this.ListViewItemSeparator}

          renderRow={(rowData) => <Text style={styles.rowViewContainer}
            //onPress={this.GetItem.bind(this, rowData.name, (rowData.phone))} >{rowData.name} {rowData.phone} {rowData.age} {rowData.email}</Text>}
            onPress={(GetItem) => this.props.navigation.navigate("medi")} >{rowData.name} {rowData.phone} {rowData.age} {rowData.email}</Text>}

        />


      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex: 1,
    margin: 10

  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});

export default Myproject;