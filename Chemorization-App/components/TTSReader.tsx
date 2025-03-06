import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";

const chemistryExplanations = [
  "The periodic table organizes elements based on atomic number and chemical properties.",
  "A chemical reaction occurs when reactants transform into products, following the law of conservation of mass.",
  "Acids release hydrogen ions in water, while bases release hydroxide ions.",
];

const TTSReader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const speak = () => {
    Speech.speak(chemistryExplanations[currentIndex], {
      language: "en-US",
      pitch: 1,
      rate: 1,
    });
  };

  const nextExplanation = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % chemistryExplanations.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{chemistryExplanations[currentIndex]}</Text>
      
      {/* Play Button */}
      <TouchableOpacity style={styles.button} onPress={speak}>
        <FontAwesome name="play-circle" size={40} color="white" />
        <Text style={styles.buttonText}>Play Explanation</Text>
      </TouchableOpacity>

      {/* Next Explanation Button */}
      <TouchableOpacity style={styles.button} onPress={nextExplanation}>
        <FontAwesome name="arrow-right" size={40} color="white" />
        <Text style={styles.buttonText}>Next Explanation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TTSReader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D7D46",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
});
