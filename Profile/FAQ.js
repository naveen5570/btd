
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Image,
  ActivityIndicator,
  YellowBox, Platform, FlatList, ScrollView
} from 'react-native';
import ListView from "deprecated-react-native-listview";
import WebView from 'react-native-webview';
import { createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
import Globals from '../Globals';
class HamburgerIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  }
  goback = () => {
    this.props.navigationProps.goBack(null);
  }
  render() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={this.goback.bind(this)} >
          <Image
            source={require("../src/image/back.png")}
            style={{ tintColor: '#fff', resizeMode: 'contain', width: 50, height: 50, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


class Healthpartners extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2,) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          id: "1.",
          description: "As I am on Diabetes Tablet / Medicines. Do I need to take all four Reading - Fasting, PP1, PP 2, PP 3 and PP 4 readings?",
          answers: "Yes! In the beginning (for the first couple of months) the stages of Diabetes Reversal, it is good to take all 4 Sugar Reading.As we Move Forward your App doctor will reduce based on your Sugar level."
        },
        {
          id: "2.",
          description: "When can I eat / consume fruits?",
          answers: "Around 11 am (Mid – Morning). There should be gap of 2 hours between meal and fruit consumption. OR In the evening before 5:30 pm (only one)."
        },
        {
          id: "3.",
          description: "When I should not take fruit?",
          answers: "Never take fruit with or after cooked meals and after sunset (6pm)"
        },
        {
          id: "4.",
          description: "What is the ideal time to have nuts?",
          answers: "Best time is around 4-6 pm. Soak them for 2-4 hours in water or overnight will give better results."
        },
        {
          id: "5.",
          description: "Headache is Common on Juice Feasting day?  If yes, whatshould I do?",
          answers: "Yes, it is a part of natural detoxification process. Have Herbal tea or soup and take rest."
        },
        {
          id: "6.",
          description: "What’s the Ideal Time to take my fasting readings?",
          answers: "As soon as you get up in the morning on bed take your fasting sugar level. Before any activity like walking around / Brushing of teeth, etc."
        },
        {
          id: "7.",
          description: "Ideal time of taking PP Readings?",
          answers: "The ideal time is, Two hours after Starting your first bite / morsal of meal (breakfast, lunch or dinner)."
        },
        {
          id: "8.",
          description: "Why my sugars level rise if there is even a slight Deviation in diet?",
          answers: "BTD protocol diet is a vegan diet. It will take a while for the body to get used to this plant based diet. With time body will adjust to this diet and sugars will stop fluctuating during the reversal process."
        },
        {
          id: "9.",
          description: "What is GTT?",
          answers: "GTT Means Glucose Tolerance Test. This is a Pathology Test where you will be administered 75 grams of glucose orally. If your PP after 2 hours comes below 140 you will be declared GTT Passed which means you have Reversed Diabetes \n \nBasic Criteria for GTT – \n\nMonths after stoppage of all Medicine and insulin \n\n      Hba1c should be < 6.1"
        },
        {
          id: "10.",
          description: "Is it Necessary to take all three PP readings, when I am on Insulin?",
          answers: "Yes."
        },
        {
          id: "11.",
          description: "What are PP1, PP2 and PP3?",
          answers: "PP (Post Prandial) readings are after Two hours of breakfast lunch and dinner respectively after Anti-Gravity."
        },
        {
          id: "12.",
          description: "How much Quantity of Smoothie/ HarriSanjeevani can I take Daily?",
          answers: "Its Depends upon Your Prakruti If, \n \nVataPrakruti- Take 200ml /day \n    Pitta Prakruti - Take 500 ml /day\nKaphaPrakruti- Take 1000ml /day"
        },
        {
          id: "13.",
          description: "Which type of Wheat should I eat?",
          answers: "You can eat Khapli / Emmer wheat, orBansiWheat. Take wheat once in a Day, Best time to have is in the afternoon."
        },
        {
          id: "14.",
          description: "Soya milk is allowed daily?",
          answers: "No, soya milk is not allowed daily once in 15 days is okay. Allowed quantity is max 60 ml."
        },
        {
          id: "15.",
          description: "When Should I do Anti- Gravity (Staircaseclimbing) after lunch / Dinner?",
          answers: "After 1 hour 45 minutes of each meal, 300 steps up and down or 5 minutes according to your capability."
        },
        {
          id: "16.",
          description: "Should I take Medicines on Juice Feasting day?",
          answers: "If sugar below 140 throughout the day then no need to take Medicine or insulin on Juice feasting day."
        },
        {
          id: "17.",
          description: "BTD Smoothie",
          answers: "Following is the Recipe for Smoothie- \n \n• ANY ONE MAJOR GREEN (Spinach, Red /Green Amaranth, Radish leaves, any big leaves, etc.)\n• ANY TWO MINOR GREENS (Coriander, Mint, Curry leaves, etc.)\n• ANY ONE FRUIT (Apple, Guava, Berries)\n• SUPER GREENS (Spirulina, Wheatgrass, Moringa)\n• 1 tbsp 5 Spice Mix ( Cinnamon powder, Black pepper powder, Turmeric powder, Cumin powder, Dry Ginger powder / 1 inch Ginger)\n• 1 tbsp Lemon Juice\n• 1/2 tsp Rock salt\n• 1 glass Water (250 ml)\n \nPut all ingredients in blender with 1/2 cup water and churn for 3 minutes taking a break after every 30 seconds of churning to reduce the heat generated. Blend it into a smooth medium thin liquid. Add enough water to make it 500ml. Drink without straining it. It is really tasty, healthy and refreshing!"
        },
        {
          id: "18.",
          description: "Can I eat Grains like Wheat / brown Rice /Oats/Sattu for breakfast?",
          answers: "No, grain is not allowed at Breakfast. Any item made up of only daal can be taken in breakfast."
        },
        {
          id: "19.",
          description: "Is breakfast compulsory?",
          answers: "Yes, Breakfast is compulsory. We need more and more nutrients from our food to smoothen the Reversal Process. Please follow the BTD diet protocol i.e. Five Finger Rule.\n \n8am- smoothie; \n9am- breakfast; \n1 pm- lunch; \n5pm - snacking (nuts) and\n8pm dinner."
        },
        {
          id: "20.",
          description: "Can we have Seeds?",
          answers: "Yes, you can have, pumpkinseeds, melonseeds, Cucumber seeds, flax seeds, sesame seeds, sunflower seeds, hemp seeds. Up to 4 tsp. of seeds altogether are allowed in a day."
        },
        {
          id: "21.",
          description: "Can I have only fruits skipping Lunch?",
          answers: "During reversal having only fruits during lunch is not allowed.Maximum allowable quantity of the fruit is 1 medium size fruit in a day.Only apple, pear, guava and berries, dragon fruit and kiwi are allowed."
        },

        {
          id: "22.",
          description: "What can I eat for a late-night snack?",
          answers: "You can have Vegetable clear soup before sleeping so that you will not be hungry."
        },
        {
          id: "23.",
          description: "Sugar-free, dark chocolate are allowed as a snacking?",
          answers: "You can have 2-3 pieces if it is raw vegan as dark chocolates have milk solids in them. So it is better to avoid."
        },
        {
          id: "24.",
          description: "Can I drink almond milk?",
          answers: "Yes.                                   "
        },
        {
          id: "25.",
          description: "Can I eat Pickle?",
          answers: "No, Readymade Pickle is not allowed as they have refined salts and that too much refined oil in it. Homemade pickle you can eat. \n \n Below is the Recipe for homemade pickle - \n \n1 cup chopped vegetables (carrot, cauliflower, green peas, ginger, wet turmeric, tendli, etc.), \n1 tbsp. or more pickle masala,\nSalt and \n1 tbsp. lemon juice. \nMix everything together. Fill in the glass jar. And ferment it overnight. Then keep the jar in the fridge for 4 days and enjoy your healthy fresh pickle."
        },
        {
          id: "26.",
          description: "Egg / Non veg sometimes are allowed?",
          answers: "Eggs white are allowed after stoppage of medicine and insulin and meat are highly acidic, hence not allowed during reversal process."
        },
        {
          id: "27.",
          description: "Can we have buttermilk?",
          answers: "Yes one can have thin butter milk up to 100-150 ml in a day."
        },
        {
          id: "28.",
          description: "How to manage low Blood sugar level (Hypoglycemia)?",
          answers: "If you are on medication or on insulin and blood sugar is below 70, then have 3 tbsp. of sugar followed by fruit immediately. \n \nIf blood sugar level is between 70 to 80, then have a combination of2 dates + 1 Fruit and drink a glass of water. \n \nIf blood sugar level is between 80 to 100, then have a combination of 1 date + 1 Fruit and drink a glass of water."
        },
        {
          id: "29.",
          description: "How to loss belly fat?",
          answers: "By doing exercises such as, chair suryanamaskar, planks, oblique’s and crunches which help to lose belly fat."
        },
        {
          id: "30.",
          description: "Apple Cider Vinegar is allowed? ",
          answers: "Yes, it is allowed, Take 2 tsp. in a glass of water before bed time."
        },
        {
          id: "31.",
          description: "Ghee is allowed? ",
          answers: "Generally Ghee is not allowed,BTD Dietician / Nutritionist mightadvise if needed after three months."
        },
        {
          id: "32.",
          description: "Alcohol is allowed?",
          answers: "No. Not in initial three months."
        },
        {
          id: "33.",
          description: "Where Do I send my Medical Reports?",
          answers: "On beatthediabetes@gmail.com"
        },
        {
          id: "34.",
          description: "Whom should I contact about my medical reports after emailing the blood reports?",
          answers: "Having only fruits during reversal is not recommended. Have only half a fruit at a time. Maximum allowable quantity of the fruit is 1 medium size fruit in a day. During reversal, only apple, pear, guava and berries Dragon fruits and kiwi are recommended and it is already added in our smoothie. In the meal, all 4 elements – salad, cooked vegetable, dal/pulses, grain are recommended."
        },
        {
          id: "35",
          description: "BTD List of Important Tests.",
          answers: "LIST- \n \n1. Blood Sugar-Fasting & PP\n2. HbA1C\n3. Lipid profile\n4. Hemogram\n5. Vitamin B12\n6. Vitamin D3\n7. Liver Function Tests\n8. Kidney Function Tests with Glomerular Filtration Rate (eGFR)\n9. Thyroid Function Tests\n10. Urine Routine and Urine micro albumin\n11. Iron Study\n12. HSCRP\n13. Fasting Insulin \n \nType 1 Diabetics need to do C peptide (Fasting and PP) test in addition to the above tests. \n \nYou can get the tests done from any reputed Laboratory of your choice given below.\n \nIgeneticsDiagnostics and Healthians labs offer discount to BTD patients:\n \nIgenetics Diagnostics contact no – Mr. Amit Sharma – 9136986314 \n \nPlease send your reports to beatthediabetes@gmail.com\n \nHealthians Lab Contact no – Mr.BhanuPratap Singh – 9971753762 \n \nPlease send your reports to beatthediabetes@gmail.com"
        },


      ]),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ListView style={styles.notificationList} enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(notification) => {
              return (
                <View style={styles.notificationBox}>
                  <Text style={styles.description}>{notification.description}</Text>
                  <Text></Text>
                  <Text style={styles.answer}>{notification.answers}</Text>
                </View>
              )
            }} />
        </ScrollView>
      </View>
    );
  }
}
class Settings_Screen extends Component {

  static navigationOptions =
    {
      title: 'Settings',
    };

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Settings Screen Activity.</Text>

      </View>
    );
  }
}

class Student_Screen extends Component {

  static navigationOptions =
    {
      title: 'Student',

    };

  gotoNextActivity = () => {
    this.props.navigation.navigate('Forth');

  }

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Student Screen Activity.</Text>

        <Button onPress={this.gotoNextActivity} title='Open Details Activity' />

      </View>
    );
  }
}

class Details_Screen extends Component {

  static navigationOptions =
    {
      title: 'Details Screen',

    };

  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');

  }

  render() {

    return (

      <View style={styles.MainContainer}>

        <Text style={styles.text}>This is Details Screen Activity.</Text>

      </View>
    );
  }
}

export const Tab_1 = createMaterialTopTabNavigator({
  First: {
    screen: Healthpartners,
  },

}, {
  tabBarPosition: 'top',

  swipeEnabled: true,

  tabBarOptions: {

    activeTintColor: '#fff',
    pressColor: '#004D40',
    inactiveTintColor: '#fff',
    style: {
      marginTop: -70,
      backgroundColor: '#fff'

    },

    labelStyle: {
      fontSize: 16,
      fontWeight: '200',
      textAlign: 'center'
    }
  }

});

export const Tab_2 = createMaterialTopTabNavigator({
  Third: {
    screen: Student_Screen,
  },
  Forth: {
    screen: Details_Screen,
  }
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
      fontWeight: '200'
    }
  }

});

const First_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_1,
    navigationOptions: ({ navigation }) => ({
      title: 'FAQs',
      headerTitleStyle: {
        fontStyle: 'italic'
      },
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#74cdf0',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0,
        textAlign: 'center',
        marginLeft: '0%'
        // remove shadow on iOS
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
      title: 'Second Screen',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#00B8D4',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#fff',
    })
  },
});

const MyDrawerNavigator = createDrawerNavigator({

  Home: {

    screen: First_2_Tabs,

  },

  Settings: {

    screen: Second_2_Tabs,

  }

});


export default createAppContainer(MyDrawerNavigator);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC'
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    flexWrap: 'wrap'
  },
  icon: {
    width: 45,
    height: 45,
    fontWeight: '400',
    fontSize: 18
  },
  description: {
    fontSize: 18,
    color: "#000",
    marginLeft: 5,
    marginBottom: 5
  },
  answer: {
    fontSize: 16,
    color: "#6b6e72",
    marginLeft: 5,
  },
});
