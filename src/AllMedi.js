import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import shortid from "shortid";
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import Globals from '../Globals';


class HomeScreen extends Component {
  handleSelectItem(item, index) {
    const { onDropdownClose } = this.props;
    onDropdownClose();
    console.log(item);
  }

  render() {
    const autocompletes = [...Array(1).keys()];

    const apiUrl = "https://beatthediabetes.org/btd/apptapp/Sugar/medi.php";

    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

    return (
      <View style={styles.autocompletesContainer}>
        <SafeAreaView>
          {autocompletes.map(() => (
            <Autocomplete
              key={shortid.generate()}
              style={styles.input}
              scrollToInput={ev => scrollToInput(ev)}
              handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
              onDropdownClose={() => onDropdownClose()}
              onDropdownShow={() => onDropdownShow()}

              fetchDataUrl={apiUrl}
              minimumCharactersCount={2}
              highlightText
              valueExtractor={item => item.name}
              rightContent
              rightTextExtractor={item => item.properties}
            />
          ))}
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 30
  },
  input: { maxHeight: 40 },
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },
});

export default withKeyboardAwareScrollView(HomeScreen);
