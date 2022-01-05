import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Globals from '../Globals';



console.log(getStatusBarHeight());

console.log(getStatusBarHeight(true));

export default class AddItems extends Component {
  onAdd() {
    alert('Hello');
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 60 : 30 }}>
        <View style={addItemStyles.wrapper}>
          <View>
            <Text>Item to give cash credit for:</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TextInput placeholder="Test" style={{ justifyContent: 'flex-start', }}
                  keyboardType={'numeric'} />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput placeholder="Test" style={{ justifyContent: 'flex-end', }}
                  keyboardType={'numeric'} />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput placeholder="Test" style={{ justifyContent: 'flex-start', }}
                  keyboardType={'numeric'} />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput placeholder="Test" style={{ justifyContent: 'flex-end', }}
                  keyboardType={'numeric'} />
              </View>
            </View>
          </View>

        </View>
      </View>
    );
  }
}

const addItemStyles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
  inputLabels: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 7,
  },
  inputField: {
    backgroundColor: '#EEEEEE',
    padding: 10,
    color: '#505050',
    height: 50
  },
  inputWrapper: {
    paddingBottom: 20,
  },
  saveBtn: {
    backgroundColor: '#003E7D',
    alignItems: 'center',
    padding: 12,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
  }


});