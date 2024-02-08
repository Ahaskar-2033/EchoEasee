// Gender.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App"; // Make sure this import path is correct

type GenderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Gender"
>;

const GenderScreen: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const navigation = useNavigation<GenderScreenNavigationProp>();

  // Function to determine the background color based on selection
  const getButtonStyle = (gender: string) => {
    return [
      styles.genderButton,
      {
        backgroundColor:
          selectedGender === gender ? genderColors[gender] : "#fff",
      },
    ];
  };

  // Color mapping for different genders
  const genderColors: { [key: string]: string } = {
    Male: "#6495ED", // Blue color for Male
    Female: "#FF69B4", // Pink color for Female
    Other: "#80DB57", // Golden color for Other
  };

  const handleSelectGender = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleContinue = () => {
    // Navigate to the next screen or perform the next action
    // navigation.navigate('NextScreen');
    navigation.navigate("Dashboard");
  };

  const handleBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("./assets/Bg9.png")} // Replace with your actual background image path
      style={styles.container}
      resizeMode="cover"
    >
      <Image
        source={require("./assets/Logo2.png")} // Replace with your logo image path
        style={styles.logo}
      />
      <Text style={styles.title}>Gender</Text>

      {/* Male button */}
      <TouchableOpacity
        style={getButtonStyle("Male")}
        onPress={() => handleSelectGender("Male")}
      >
        <Image source={require("./assets/male.png")} style={styles.micon} />
        <Text style={styles.genderText}>Male</Text>
      </TouchableOpacity>

      {/* Female button */}
      <TouchableOpacity
        style={getButtonStyle("Female")}
        onPress={() => handleSelectGender("Female")}
      >
        <Image source={require("./assets/female.png")} style={styles.ficon} />
        <Text style={styles.genderText}>Female</Text>
      </TouchableOpacity>

      {/* Other button */}
      <TouchableOpacity
        style={getButtonStyle("Other")}
        onPress={() => handleSelectGender("Other")}
      >
        <Image source={require("./assets/others.png")} style={styles.oicon} />
        <Text style={styles.genderText}>Other</Text>
      </TouchableOpacity>

      {/* Continue button */}
      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Back button */}
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Image
          source={require("./assets/backbutton.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 110, // Adjust the size as needed
    width: 110, // Adjust the size as needed
    resizeMode: "contain",
    marginBottom: 20, // Adjust the space between the logo and the title
    position: "absolute",
    bottom: 650,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 72,
    color: "#270e58",
    textShadowColor: "#270e58",
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 1,
  },
  genderButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginBottom: 30,
    width: "80%",
  },
  selectedButton: {
    // This style is dynamically applied in getButtonStyle function
  },
  micon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  ficon: {
    width: 16,
    height: 24,
    marginRight: 10,
  },
  oicon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  genderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#270e58",
  },
  continueButton: {
    backgroundColor: "#7856c3",
    padding: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    marginTop: 60,
  },
  continueText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 65,
    left: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
});

export default GenderScreen;
