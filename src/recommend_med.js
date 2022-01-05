import React, { Component } from 'react';
import { Toolbar } from 'react-native-material-ui';

import { StyleSheet, ActivityIndicator, TouchableOpacity, ListView, Text, View, Alert, Image } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { Avatar } from 'react-native-elements';
import { ListItem } from 'react-native-elements'
import Globals from '../Globals';

class Myproject extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  GetItem(name, batch_id) {

    Alert.alert(name, batch_id);

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

  ListViewItemSeparator = (rowData) => {
    return (
      <UserAvatar size="80" name='AS' containerStyle='50' src="https://cdn2.iconfinder.com/data/icons/website-icons/512/User_Avatar-512.png">
        <View
          style={{
            height: 0,
            width: "100%",
            backgroundColor: "#000",
            paddingTop: 0,
            overflow: 'visible',
            position: 'absolute',
            top: 0,
          }}
        />
      </UserAvatar>
    );
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 300 }}>
          <ActivityIndicator />
        </View>
      );
    }


    return (

      <View style={styles.MainContainer}>

        <Toolbar
          leftElement="menu"
          centerElement="Patient List"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}

        />

        <ListView


          dataSource={this.state.dataSource}


          renderSeparator={this.ListViewItemSeparator}


          renderRow={(rowData) => <Text style={styles.rowViewContainer}

            iconName='md-person'
            //onPress={this.GetItem.bind(this, rowData.name, (rowData.phone))} >{rowData.name} {rowData.phone} {rowData.age} {rowData.email}</Text>}
            onPress={(GetItem) => this.props.navigation.navigate("addmedi")} > {rowData.name}  ({rowData.batch_id})</Text>}

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
    margin: 0,
    paddingTop: 0

  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 40,
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 70,

  }

});

export default Myproject;