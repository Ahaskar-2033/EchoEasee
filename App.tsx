import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from "./intro"; // Adjust the path as necessary
import HomeScreen from "./HomeScreen"; // Adjust path if necessary
import Signup from "./Signup";
import GenderScreen from "./Gender";
import SigninScreen from "./Signin";
import DashboardScreen from "./Dashboard";
import SettingsScreen from "./Settings";

export type RootStackParamList = {
  Intro: undefined;
  Home: undefined;
  Signup: undefined;
  Gender: undefined;
  SignIn: undefined;
  Dashboard: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }} // Set this according to your preference
        />
        <Stack.Screen
          name="Gender"
          component={GenderScreen}
          options={{ headerShown: false }} // Adjust this as needed
        />
        <Stack.Screen
          name="SignIn"
          component={SigninScreen}
          options={{ headerShown: false }} // Add the sign-in screen to the stack
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }} // Add the Dashboard screen to the stack
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }} // Adjust this as needed
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
