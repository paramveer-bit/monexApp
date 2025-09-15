import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  // State for the mobile number input
  const [mobileNumber, setMobileNumber] = useState("");
  // State for the checkbox
  const isButtonActive = mobileNumber.length === 10;

  // Function to handle opening URLs for policies
  const handleLinkPress = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.content}
        className="h-full justify-between pt-16 pb-5"
      >
        <View>
          {/* Logo and Brand Name */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logo.png")} // <-- IMPORTANT: Update this path
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandName}>monex</Text>
          </View>

          <View className="relative">
            <TextInput
              placeholder="Enter mobile number"
              placeholderTextColor="#8E8E93"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              maxLength={10}
              className="mt-4 rounded-xl border-2 border-blue-500 p-3 py-5 pl-8 text-xl"
            />

            {/* put label after input so it renders on top */}
            <Text
              pointerEvents="none"
              className="absolute top-2 left-3 bg-white px-2 text-blue-600 font-semibold text-sm z-10"
            >
              Mobile Number
            </Text>
          </View>
        </View>

        <View>
          {/* Continue Button */}
          <TouchableOpacity
            disabled={!isButtonActive}
            style={styles.continueButton}
            onPress={() => Alert.alert("Continue Pressed!")}
            className={`${isButtonActive ? "bg-blue-500" : "bg-[#EFEFEF]"} mt-5`}
          >
            <Text style={styles.continueButtonText}>CONTINUE</Text>
          </TouchableOpacity>

          {/* Agreement Checkbox */}
          <View style={styles.agreementContainer}>
            <Text style={styles.agreementText}>
              By continuing you agree to all our{" "}
              <Text
                style={styles.linkText}
                onPress={() => handleLinkPress("https://example.com/terms")}
              >
                terms of service
              </Text>{" "}
              and{" "}
              <Text
                style={styles.linkText}
                onPress={() => handleLinkPress("https://example.com/privacy")}
              >
                privacy policy
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    width: 80,
    height: 60,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
  },
  input: {
    height: 50,
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  continueButton: {
    // backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  agreementContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 24,
  },
  agreementText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
