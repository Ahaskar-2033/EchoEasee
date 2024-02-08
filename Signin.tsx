// Signin.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App"; // Make sure this import path is correct

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

const SigninScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<SignInScreenNavigationProp>();

  // Define animation values for each logo
  const [googleAnimation] = useState(new Animated.Value(1));
  const [microsoftAnimation] = useState(new Animated.Value(1));
  const [appleAnimation] = useState(new Animated.Value(1));
  const [twitterAnimation] = useState(new Animated.Value(1));

  // Generic function to create animation for each logo
  const handlePress = (animation: Animated.Value) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animation, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSignIn = () => {
    // Implement your sign-in logic here
    // navigation.navigate('NextScreen');
    navigation.navigate("Dashboard");
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("./assets/Bg10.png")}
      style={styles.backgroundImage}
    >
      {/* Removed backButtonContainer for brevity, add it back if necessary */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Image
          source={require("./assets/backbutton.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.title}>EchoEase</Text>

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </View>

      <View style={styles.socialLoginContainer}>
        <TouchableWithoutFeedback onPress={() => handlePress(googleAnimation)}>
          <Animated.Image
            source={require("./assets/Google.png")}
            style={[styles.icon, { transform: [{ scale: googleAnimation }] }]}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => handlePress(microsoftAnimation)}
        >
          <Animated.Image
            source={require("./assets/Microsoft.png")}
            style={[
              styles.icon,
              { transform: [{ scale: microsoftAnimation }] },
            ]}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handlePress(appleAnimation)}>
          <Animated.Image
            source={require("./assets/Apple.png")}
            style={[styles.icon, { transform: [{ scale: appleAnimation }] }]}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handlePress(twitterAnimation)}>
          <Animated.Image
            source={require("./assets/Twitter.png")}
            style={[styles.icon, { transform: [{ scale: twitterAnimation }] }]}
          />
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center", // This will center the login in the middle of the screen.
    paddingVertical: 120, // Increase this value to push everything lower
  },
  title: {
    position: "absolute",
    top: 120, // adjust to your desired top position
    left: 52,
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 80, // Adjust the space above the title if necessary
  },
  input: {
    height: 50,
    marginHorizontal: 40,
    marginBottom: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "transparent",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7744DB",
    padding: 10,
    marginHorizontal: 40,
    borderRadius: 10,
    marginTop: 25, // Adjust the value to increase the space
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
  },
  forgotPassword: {
    position: "absolute",
    alignItems: "center",
    fontWeight: "bold",
    top: 555,
    fontSize: 16,
    color: "#270E58",
    alignSelf: "center",
    padding: 10,
    marginTop: 15, // Adjust the space above the forgot password if necessary
  },
  socialLoginContainer: {
    position: "absolute",
    top: 635,
    left: 53,
    marginTop: 10, // Adjust this value to control the spacing between the forgotPassword and socialLoginContainer
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  backButton: {
    position: "absolute",
    top: 75, // Adjust as needed for your layout
    left: 46,
    zIndex: 10, // Ensure the button is above other elements
  },
  backIcon: {
    width: 15, // Adjust as needed for your layout
    height: 15, // Adjust as needed for your layout
  },
});

export default SigninScreen;
