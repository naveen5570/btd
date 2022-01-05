import React, { Component } from 'react';

import { StyleSheet, ActivityIndicator, Text, View, Alert } from 'react-native';
import Globals from '../Globals';
import ListView from "deprecated-react-native-listview";

class Myproject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  GetItem(medicine_name) {

    Alert.alert(medicine_name);

  }


  componentDidMount() {

    return fetch('http://192.168.1.118/sid/med.php')
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
        <View style={{ flex: 1, paddingTop: 20 }}>
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
            onPress={this.GetItem.bind(this, rowData.medicine_name)} >{rowData.medicine_name}</Text>}

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