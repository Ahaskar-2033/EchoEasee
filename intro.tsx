import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts, Raleway_500Medium } from "@expo-google-fonts/raleway";
import { RootStackParamList } from "./App"; // Adjust the path as necessary if you defined RootStackParamList elsewhere

type IntroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Intro"
>;

// Replace with the actual path to your images
const backgroundImagePath = "./assets/background2.png";
const lungsImagePath = "./assets/Logo2.png";

const Intro = () => {
  const navigation = useNavigation<IntroScreenNavigationProp>();
  const fadeAnim = useState(new Animated.Value(1))[0]; // Initial opacity is 1

  const [fontsLoaded] = useFonts({
    Raleway_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Wait for 3 seconds before starting the fade-out animation
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000, // Fade out duration is 2 seconds
          useNativeDriver: true,
        }).start(() => navigation.navigate("Home")); // Navigate to "Home" after the fade out
      }, 1000);
    }
  }, [fadeAnim, navigation, fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show a loading message while fonts are loading
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground
        source={require(backgroundImagePath)}
        style={styles.background}
      >
        {/* Image and Text elements from the previous intro.tsx */}
        <Image source={require(lungsImagePath)} style={styles.lungsImage} />
        <Text style={styles.text}>EchoEase</Text>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lungsImage: {
    width: 200, // Adjust to your image size
    height: 200, // Adjust to your image size
  },
  text: {
    fontSize: 24, // Adjust to your design
    color: "#270E58", // Adjust to your design
    fontFamily: "Raleway_500Medium", // Adjust to your font
    fontWeight: "700",
    position: "absolute",
    bottom: 20,
  },
});

export default Intro;
