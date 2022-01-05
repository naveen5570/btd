/*Example of React Native Action Button*/
import React, { Component } from 'react';
//Import React
import { StyleSheet, View, Text } from 'react-native';
//Import code react native elements
import ActionButton from 'react-native-action-button';
//Import ActionButton
import Icon from 'react-native-vector-icons/Ionicons';
//Import Icon for the ActionButton

export default class App extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#f3f3f3',
          justifyContent: 'center',
          alignContent: 'center',
          padding:20
        }}>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
          }}>
          Example of Action Button in React Native
        </Text>
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 25 }}>
          

    Home


        </Text>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          {/*Inner options of the action button*/}
          {/*Icons here https://infinitered.github.io/ionicons-version-3-search/*/}
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Add to Watch Later"
            onPress={() => alert('Added to watch later')}>
            <Icon name="md-eye" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Add to Favourite"
            onPress={() => alert('Added to favourite')}>
            <Icon name="md-star" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Share"
            onPress={() => alert('Share Post')}>
            <Icon name="md-share-alt" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});