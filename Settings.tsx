// Settings.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface LabelledInputProps extends TextInputProps {
  label: string;
}

const LabelledInput: React.FC<LabelledInputProps> = ({
  label,
  onChangeText,
  ...props
}) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={styles.label}>{label}</Text>
    {/* Now explicitly typing the parameter of onChangeText */}
    <TextInput
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        ...props,
      }}
      onChangeText={(text: string) => onChangeText?.(text)}
    />
  </View>
);

const genderOptions = [
  {
    label: "Male",
    value: "male",
    icon: require("./assets/male.png"),
    iconStyle: { width: 30, height: 30 },
  },
  {
    label: "Female",
    value: "female",
    icon: require("./assets/female.png"),
    iconStyle: { width: 24, height: 32 },
  },
  {
    label: "Other",
    value: "other",
    icon: require("./assets/others.png"),
    iconStyle: { width: 30, height: 30 },
  },
];

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
    gender: "",
  });

  const handleInputChange = (field: keyof typeof user, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleUploadPress = () => {
    Alert.alert(
      "Upload Image",
      "The image upload functionality is not implemented yet."
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("./assets/Bg12.png")}
      style={styles.backgroundImage}
    >
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Image
          source={require("./assets/backbutton.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Account</Text>

        <View style={styles.profilePictureContainer}>
          <Image
            source={require("./assets/pp.png")}
            style={styles.profilePicture}
          />
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUploadPress}
          >
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <LabelledInput
            label="Name"
            value={user.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <LabelledInput
            label="Email"
            value={user.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
          />
          <LabelledInput
            label="Age"
            value={user.age}
            onChangeText={(text) => handleInputChange("age", text)}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.genderOption,
                  user.gender === option.value && styles.genderOptionSelected,
                ]}
                onPress={() => handleInputChange("gender", option.value)}
              >
                <Image source={option.icon} style={option.iconStyle} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 20,
    zIndex: 10,
  },
  backIcon: {
    width: 18,
    height: 18,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    position: "absolute",
    top: 120,
    left: 20,
  },
  profilePictureContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    top: 0,
  },
  uploadButton: {
    backgroundColor: "#7856C3",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    top: 105,
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    top: 130,
  },
  label: {
    fontWeight: "bold",
    marginVertical: 8,
    color: "#fff",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  genderOption: {
    alignItems: "center",
    justifyContent: "center",
  },
  genderOptionSelected: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 50,
  },
  // Add other styles as needed
});

// A component for labeled input to reduce repetition

export default SettingsScreen;
