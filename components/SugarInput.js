import React, { useState } from "react";
import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";


export default function SugarInput() {
  const [enteredSugarInput, setEnteredSugarInput] = useState('');
  const [enteredBreakfastInput, setEnteredBreakfastInput] = useState('');
  const [enteredLunchInput, setEnteredLunchInput] = useState('');
  const [enteredDinnerInput, setEnteredDinnerInput] = useState('');
  const [enteredBPMinInput, setEnteredBPMinInput] = useState('');
  const [enteredBPMaxInput, setEnteredBPMaxInput] = useState('');

  const [SugarsInput, setSugarsInput] = useState([]);
  const [BreakfastInput, setBreakfastInput] = useState([]);
  const [LunchInput, setLunchInput] = useState([]);
  const [DinnerInput, setDinnerInput] = useState([]);
  const [BPMinInput, setBPMinInput] = useState([]);
  const [BPMaxInput, setBPMaxInput] = useState([]);

  const SugarInputhandler = (enteredText) => {
    setEnteredSugarInput(enteredText);
  }
  const BreakfastInputhandler = (enteredText) => {
    setEnteredBreakfastInput(enteredText);
  }
  const LunchInputhandler = (enteredText) => {
    setEnteredLunchInput(enteredText);
  }
  const DinnerInputhandler = (enteredText) => {
    setEnteredDinnerInput(enteredText);
  }
  const BPMinInputhandler = (enteredText) => {
    setEnteredBPMinInput(enteredBPMinInput);
  }
  const BPMaxInputhandler = (enteredText) => {
    setEnteredBPMaxInput(enteredText);
  }
  const addSugarHandler = () => {
    setSugarsInput(currentSugarInput => [...SugarsInput, enteredSugarInput]);
  }
  const addBreakfastHandler = () => {
    setBreakfastInput(currentBreakfastInput => [...BreakfastInput, enteredBreakfastInput])
  }
  const addLunchHandler = () => {
    setLunchInput(currentLunchInput => [...LunchInput, enteredLunchInput])
  }
  const addDinnerHandler = () => {
    setDinnerInput(currentDinnerInput => [...DinnerInput, enteredDinnerInput])
  }
  const addBPMinHandler = () => {
    setBPMinInput(currentBPMinInput => [...BPMinInput, enteredBPMinInput])
  }
  const addBPMaxHandler = () => {
    setBPMaxInput(currentBPMaxInput => [...BPMaxInput, enteredBPMaxInput])
  };
  return (
    <View style={styles.screen}>
      <View style={styles.InputConatiner}>
        <TextInput
          placeholder="Fasting"
          style={styles.TextInputContainer}
          onChangeText={SugarInputhandler}
          value={enteredSugarInput}
        />
        <Button title="ADD" onPress={addSugarHandler} />
      </View>
      <View>
        {SugarsInput.map((goal) => <Text key={goal}>{goal}</Text>)}
      </View>

      <View style={styles.InputConatiner}>
        <TextInput
          placeholder="Breakfast"
          style={styles.TextInputContainer}
          onChangeText={BreakfastInputhandler}
          value={enteredBreakfastInput}
        />
        <Button title="ADD" onPress={addBreakfastHandler} />
      </View>
      <View>
        {BreakfastInput.map((Breakfast) => <Text key={Breakfast}>{Breakfast}</Text>)}
      </View>

      <View style={styles.InputConatiner}>
        <TextInput
          placeholder="Lunch"
          style={styles.TextInputContainer}
          onChangeText={LunchInputhandler}
          value={enteredLunchInput}
        />
        <Button title="ADD" onPress={addLunchHandler} />
      </View>
      <View>
        {LunchInput.map((Lunch) => <Text key={Lunch}>{Lunch}</Text>)}
      </View>
      <View style={styles.InputConatiner}>
        <TextInput
          placeholder="Dinner"
          style={styles.TextInputContainer}
          onChangeText={DinnerInputhandler}
          value={enteredDinnerInput}
        />
        <Button title="ADD" onPress={addDinnerHandler} />
      </View>
      <View>
        {DinnerInput.map((Dinner) => <Text key={Dinner}>{Dinner}</Text>)}
      </View>
      <View style={styles.InputConatiner}>
        <TextInput
          placeholder="B.P Min"
          style={styles.TextInputContainer}
          onChangeText={BPMinInputhandler}
          value={enteredBPMinInput}
        />
        <Button title="ADD" onPress={addBPMinHandler} />
      </View>
      <View>
        {BPMinInput.map((BPMin) => <Text key={BPMin}>{BPMin}</Text>)}
      </View>
      <View style={styles.InputConatiner}>
        <TextInput
          placeholder="B.P Max"
          style={styles.TextInputContainer}
          onChangeText={BPMaxInputhandler}
          value={enteredBPMaxInput}
        />
        <Button title="ADD" onPress={addBPMaxHandler} />
      </View>
      <View>
        {BPMaxInput.map((BPMax) => <Text key={BPMax}>{BPMax}</Text>)}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  TextInputContainer: {
    width: '80%',
    borderBottomColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  InputConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },

});

