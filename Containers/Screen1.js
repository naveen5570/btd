import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform  } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import Screen7 from './Screen7'
// import all basic components
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
export default class Screen1 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Screen One',
    drawerIcon: () => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  }

  render() {
    return (
      
         <View style={styles.container}>

<TouchableOpacity onPress={() => this.props.navigation.navigate("screen9")}>

  <View style={{
    backgroundColor: '#F7F7F7',
    height: hp('21%'),
    margin: 5,
    width: wp('47%'),

  }}>
    <Image
      style={{
        flex: 1,

      }}
      source={{ uri: 'https://cashurscrap.000webhostapp.com/wp-content/uploads/sugar.jpg' }}
    />


    <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("screen9")} >Sugar Input</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={() => this.props.navigation.navigate("screen10")}>

  <View style={{
    backgroundColor: '#F7F7F7',
    height: hp('21%'),
    margin: 5,
    width: wp('47%'),
  }}>
    <Image
      style={{
        flex: 1,

      }}
      source={{ uri: 'https://cashurscrap.000webhostapp.com/wp-content/uploads/bp1.jpg' }}
    />

    <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("screen10")} >BP Input</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={(items) => this.props.navigation.navigate('')}>
  <View style={{
    backgroundColor: '#F7F7F7', icon: 'gratipay',
    height: hp('21%'),
    margin: 5,
    width: wp('47%'),

  }}>
    <Image
      style={{
        flex: 1,

      }}
      source={{ uri: 'https://image.freepik.com/free-vector/family-with-child-doctor-consultation-online-using-medical-care-application-smartphone_121223-256.jpg' }}
    />

    <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate('')} >Consult Doctor</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={() => this.props.navigation.navigate("")}>
  <View style={{
    backgroundColor: '#F7F7F7', icon: 'heart',
    height: hp('21%'),
    margin: 5,
    width: wp('47%'),
  }}>
    <Image
      style={{
        flex: 1,

      }}
      source={{ uri: 'https://image.freepik.com/free-photo/colorful-pills-plastic-bottle_23-2147983113.jpg' }}
    />
    <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("addmedi")} >Medicine</Text>

  </View>
</TouchableOpacity>

<TouchableOpacity onPress={() => this.props.navigation.navigate("")}>
  <View style={{
    backgroundColor: '#F7F7F7',
    height: hp('21%'),
    margin: 5,
    width: wp('47%'),
  }}>
    <Image
      style={{
        flex: 1,

      }}
      source={{ uri: 'https://cashurscrap.000webhostapp.com/wp-content/uploads/recipe.jpg' }}
    />
    <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("")} >Recipe</Text>

  </View>
</TouchableOpacity>

<TouchableOpacity onPress={() => this.props.navigation.navigate("")}>
  <View style={{
    backgroundColor: '#F7F7F7',
    height: hp('21%'),
    margin: 5,
    width: wp('47%'),
  }}>
    <Image
      style={{
        flex: 1,

      }}
      source={{ uri: 'https://image.freepik.com/free-photo/fitness-membership_53876-47423.jpg' }}
    />
    <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("")} >Membership</Text>

  </View>
</TouchableOpacity>

<TouchableOpacity onPress={() => this.props.navigation.navigate("")}>
  <View style={{
    backgroundColor: '#F7F7F7',
    height: hp('21%'),
    margin: 5,
    width: wp('47%'),
  }}>
    <Image
      style={{
        flex: 1,

      }}
      source={{ uri: 'https://cashurscrap.000webhostapp.com/wp-content/uploads/events.jpg' }}
    />
    <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("")} >Upcoming Events</Text>

  </View>
</TouchableOpacity>

<TouchableOpacity onPress={() => this.props.navigation.navigate("")}>
  <View style={{
    backgroundColor: '#F7F7F7',
    height: hp('21%'),
    margin: 5,
    width: wp('47%'),
  }}>
    <Image
      style={{
        flex: 1,

      }}
      source={{ uri: 'https://image.freepik.com/free-photo/close-up-doctor-with-fruits-vegetables-writing_23-2148302127.jpg' }}
    />
    <Text style={styles.GridViewInsideTextItemStyle} onPress={() => this.props.navigation.navigate("")} >Consult Nutritionist</Text>

  </View>
</TouchableOpacity>


</View>
      
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
  text:
  {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
  container: {

    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  box: {
    backgroundColor: '#00BCD4',
    height: 150,
    margin: 5,
    width: 170,

  },
  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0

  },

  GridViewBlockStyle: {

    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 150,
    margin: 5,
    backgroundColor: '#00BCD4'

  }
  ,

  GridViewInsideTextItemStyle: {

    color: '#000000',
    padding: 10,
    fontSize: 17,
    justifyContent: 'center',
    textAlign: 'center',


  },
  itemIcon: {
    color: '#00b8ff',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    marginLeft: 20,
  },
});
