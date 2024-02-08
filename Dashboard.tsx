// Dashboard.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App"; // Make sure this import path is correct
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import Config from "react-native-config";
import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";
const ffmpeg = createFFmpeg({ log: true });

const API_URL = Config.API_URL;

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [savedRecordings, setSavedRecordings] = useState<
    Array<{ uri: string; name: string }>
  >([]);
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    // This space is reserved for any initialization code if FFmpegKit requires it in future releases or for your specific use case.
    console.log("Dashboard component mounted.");
  }, []);

  const handleMicrophonePress = async () => {
    if (isRecording) {
      setIsRecording(false);
      await stopRecording();
    } else {
      setIsRecording(true);
      await startRecording();
    }
  };

  async function startRecording() {
    try {
      const permissionResponse = await Audio.requestPermissionsAsync();
      if (permissionResponse.status !== "granted") {
        Alert.alert(
          "Permissions required",
          "Please grant microphone access to use this feature."
        );
        setIsRecording(false);
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
    } catch (err) {
      setIsRecording(false);
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setRecording(null);

    if (uri) {
      const fileUri = `${
        FileSystem.documentDirectory
      }${new Date().toISOString()}.m4a`;
      try {
        await FileSystem.moveAsync({ from: uri, to: fileUri });
        const recordingInfo = {
          uri: fileUri,
          name: `Recording ${new Date().toISOString()}`,
        };
        setSavedRecordings((prev) => [...prev, recordingInfo]);
        console.log("Recording saved to", fileUri);
      } catch (error) {
        console.error("Error saving recording", error);
      }
    }
    if (uri) {
      convertAndUploadAudio(uri);
    }
  }

  const convertAndUploadAudio = async (fileUri: string) => {
    const wavUri = await convertAudioToWav(fileUri);
    uploadAudioFile(wavUri);
  };

  const convertAudioToWav = async (fileUri: string): Promise<string> => {
    const outputFileName = `${
      FileSystem.cacheDirectory
    }${new Date().toISOString()}.wav`;

    await FFmpegKit.execute(`-i ${fileUri} ${outputFileName}`).then(
      async (session) => {
        const returnCode = await session.getReturnCode();
        if (ReturnCode.isSuccess(returnCode)) {
          console.log("Conversion successful:", outputFileName);
        } else if (ReturnCode.isCancel(returnCode)) {
          console.log("Conversion cancelled by the user.");
        } else {
          console.error(`Conversion failed with return code: ${returnCode}.`);
        }
      }
    );

    return outputFileName;
  };

  const uploadAudioFile = async (fileUri: string) => {
    const formData = new FormData();

    // Directly append the file URI to FormData
    // Note: Direct casting to 'any' to bypass TypeScript error, specific to React Native
    (formData as any).append("file", {
      uri: fileUri,
      type: "audio/wav",
      name: "audio.wav",
    });

    try {
      const response = await fetch(API_URL!, {
        method: "POST",
        headers: {
          // Omitting "Content-Type": "multipart/form-data" might be necessary
          // as React Native might set the correct content type with boundary itself.
        },
        body: formData,
      });

      // Handle response...
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  async function playRecording(fileUri: string) {
    const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
    await sound.playAsync();
  }

  const handleProfileButton = () => {
    navigation.navigate("Settings");
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("./assets/Bg11.png")}
        style={styles.background}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Image
              source={require("./assets/backbutton.png")}
              style={styles.backButtonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Welcome back!</Text>
        </View>

        {/* Microphone button */}
        <TouchableOpacity
          style={[
            styles.microphoneButton,
            isRecording && { backgroundColor: "red" },
          ]} // Change color when recording
          onPress={handleMicrophonePress}
        >
          <Image
            source={require("./assets/Microphone.png")}
            style={styles.microphoneIcon}
          />
        </TouchableOpacity>
        <Text style={styles.readyToListenText}>
          {isRecording ? "Recording..." : "Ready to listen!"}
        </Text>

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.footerButton}>
            <Image
              source={require("./assets/home.png")}
              style={styles.footerHomeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Image
              source={require("./assets/stats.png")}
              style={styles.footerStatsIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleProfileButton}
            style={styles.footerButton}
          >
            <Image
              source={require("./assets/profile.png")}
              style={styles.footerProfileIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSettingsPress}
            style={styles.footerButton}
          >
            <Image
              source={require("./assets/settings.png")}
              style={styles.footerSettingsIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
            Saved Recordings:
          </Text>
          <ScrollView style={{ maxHeight: 200, width: "100%", marginTop: 10 }}>
            {savedRecordings.map((recording, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: "#ddd",
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                }}
                onPress={() => playRecording(recording.uri)}
              >
                <Text style={{ color: "#000" }}>{recording.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.footerContainer}>{}</View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    position: "absolute",
    top: 100,
    left: 70,
  },
  microphoneButton: {
    width: 250,
    height: 250,
    borderRadius: 130,
    backgroundColor: "#6F58ED",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 300,
  },
  microphoneIcon: {
    width: 75,
    height: 75,
  },
  readyToListenText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6338C5",
    marginBottom: 20,
    position: "absolute",
    top: 600,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#6F58ED",
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    borderRadius: 24,
  },
  footerButton: {
    padding: 10,
  },
  backButtonIcon: {
    width: 15,
    height: 15,
  },
  footerHomeIcon: {
    width: 26,
    height: 25,
  },
  footerStatsIcon: {
    width: 22,
    height: 21,
  },
  footerProfileIcon: {
    width: 22,
    height: 23,
  },
  footerSettingsIcon: {
    width: 24,
    height: 24,
  },
});

export default DashboardScreen;
