// HomeScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App"; // Make sure this import path is correct

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Handlers for button presses can navigate to different screens
  const handleCreateAccountPress = () => {
    navigation.navigate("Signup");
  };

  const handleSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ImageBackground
      source={require("./assets/Bg6.png")} // Replace with your actual background image path
      style={styles.container}
      resizeMode="cover" // or 'stretch' to fit the screen
    >
      <View style={styles.container}>
        <Image
          source={require("./assets/Logobg.png")} // Replace with your logo image path
          style={styles.logo}
        />
        <Text style={styles.title}>EchoEase</Text>
        <Text style={styles.subtitle}>
          Your pathway to better respiratory health
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateAccountPress}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={handleSignInPress}>
          <Text style={styles.linkButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7856C3", // This should be the color of your background
  },
  logo: {
    width: 100, // Adjust to your logo size
    height: 100, // Adjust to your logo size
    //marginBottom: 360, // Adjust the margin as needed
    position: "absolute",
    bottom: 650,
  },
  title: {
    fontSize: 32, // Adjust to match the size in your design
    fontWeight: "bold", // Adjust to match your design (you'll need to import the font if it's custom)
    color: "#FFFFFF", // This should be the color of your title text
    marginBottom: 15, // Adjust the margin as needed
    position: "absolute",
    bottom: 580,
  },
  subtitle: {
    fontSize: 18, // Adjust to match the size in your design
    color: "#FFFFFF", // This should be the color of your subtitle text
    marginBottom: 48, // Adjust the margin as needed
    textAlign: "center",
    position: "absolute",
    bottom: 500,
  },
  button: {
    paddingHorizontal: 64, // Adjust the padding as needed
    paddingVertical: 12, // Adjust the padding as needed
    borderRadius: 25, // Adjust the border radius as needed
    backgroundColor: "#7744DB", // This should be the color of your button
    marginBottom: 16, // Adjust the margin as needed
    position: "absolute",
    top: 710,
  },
  buttonText: {
    fontSize: 20, // Adjust to match the size in your design
    color: "#FFFFFF", // This should be the color of your button text
    fontWeight: "bold", // Adjust to match your design
  },
  linkButton: {
    position: "absolute",
    top: 780,
    // If you have specific styles for your link button, apply them here
  },
  linkButtonText: {
    fontSize: 18, // Adjust to match the size in your design
    fontWeight: "bold",
    color: "#270E58", // This should be the color of your link text
    textDecorationLine: "underline", // This creates an underline effect
  },
});

export default HomeScreen;
