// SignupScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App"; // Make sure this import path is correct
type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup"
>;

const SignupScreen: React.FC = () => {
  // Add your sign-up logic and state variables here
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleBackPress = () => {
    navigation.goBack(); // This will take the user back to the previous screen
  };
  const handleSignUpPress = () => {
    // Assuming 'Gender' is the name of your route in the navigation stack
    navigation.navigate("Gender");
  };

  return (
    <ImageBackground
      source={require("./assets/Bg7.png")} // Replace with your actual background image path
      style={styles.container}
      resizeMode="cover" // or 'stretch' to fit the screen
    >
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Image
          source={require("./assets/backbutton.png")} // Replace with your actual back button image path
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      <Text style={styles.header}>EchoEase</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        // onChangeText={...} // Handle changes
        // value={...} // Full Name value
      />

      <TextInput
        placeholder="Email ID"
        style={styles.input}
        // onChangeText={...} // Handle changes
        // value={...} // Email value
      />

      <TextInput
        placeholder="Age"
        style={styles.input}
        // onChangeText={...} // Handle changes
        // value={...} // Age value
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        // onChangeText={...} // Handle changes
        // value={...} // Password value
      />

      <TouchableOpacity onPress={handleSignUpPress} style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity>
          <Image
            source={require("./assets/Twitter.png")} // Replace with your Twitter logo image path
            style={styles.socialLogo}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("./assets/Google.png")} // Replace with your Google logo image path
            style={styles.socialLogo}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("./assets/Microsoft.png")} // Replace with your Microsoft logo image path
            style={styles.socialLogo}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("./assets/Apple.png")} // Replace with your Apple logo image path
            style={styles.socialLogo}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 50,
    position: "absolute",
    bottom: 640,
    right: 220,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  signupButton: {
    width: "100%",
    backgroundColor: "#7744DB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  socialLogo: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  backButton: {
    position: "absolute",
    top: 60, // Adjust the position as needed
    left: 10, // Adjust the position as needed
    padding: 12, // Padding to make it easier to tap
  },
  backButtonImage: {
    width: 18, // Adjust the size as needed
    height: 18, // Adjust the size as needed
  },
});

export default SignupScreen;
