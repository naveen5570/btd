import React from 'react'
import { StyleSheet, Alert, Text, View, Image, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Icon, Button } from 'react-native-elements';
export default class DrawerContainer extends React.Component {
  constructor() {
    super();
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      'https://bootdey.com/img/Content/avatar/avatar6.png';
    this.items = [
      {
        navOptionThumb: 'camera',
        navOptionName: 'Home',
        screenToNavigate: 'screen1',
      },
      {
        navOptionThumb: 'card-membership',
        navOptionName: 'My Subscriptions',
        screenToNavigate: 'screen2',
      },
      {
        navOptionThumb: 'account-balance',
        navOptionName: 'Payment History',
        screenToNavigate: 'screen3',
      },
      {
        navOptionThumb: 'call-to-action',
        navOptionName: 'Know Your Prakirti ',
        screenToNavigate: 'screen4',
      },

      {
        navOptionThumb: 'info',
        navOptionName: 'AboutUs',
        screenToNavigate: 'screen5',
      },
      {
        navOptionThumb: 'message',
        navOptionName: 'ContactUs',
        screenToNavigate: 'screen6',
      },
      {
        navOptionThumb: 'exit-to-app',
        navOptionName: 'Logout',
        screenToNavigate: 'Auth',

      },

    ];
  }
  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'Auth' })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.sideMenuContainer}>
        <Image
          source={{ uri: this.proileImage }}
          style={styles.sideMenuProfileIcon}
        />
        <Text style={styles.name}>Siddharth Mishra </Text>
        <Text style={styles.userInfo}>mishra.siiid@gmail.com </Text>
        <Text style={styles.userInfo}>7905839710 </Text>
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              key={key}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.currentScreenIndex === key ? 'red' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>

            </View>
          ))}

        </View>

      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',


  },
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
})
