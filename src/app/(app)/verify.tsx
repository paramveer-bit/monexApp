import React, { useRef } from "react";
import {
  Alert,
  Image,
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const length = 6;
  const [otp, setOtp] = React.useState(new Array(length).fill(""));
  const inputRef = useRef<(TextInput | null)[]>(Array(length).fill(null));

  const handelChange = (text: string, index: number) => {
    if (isNaN(Number(text))) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < length - 1) {
      inputRef.current?.[index + 1]?.focus();
    }
    if (newOtp.join("").length === length) {
      Keyboard.dismiss();
    }
  };
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    // On backspace, if the current input is empty, focus the previous one
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const isButtonActive = otp.join("").length === length;
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.content}
        className="h-full justify-between pt-16 pb-5"
      >
        <View>
          {/* Logo and Brand Name */}
          <View style={styles.logoContainer} className="pb-8">
            <Image
              source={require("../../../assets/logo.png")} // <-- IMPORTANT: Update this path
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandName}>monex</Text>
          </View>

          <View>
            <Text className="text-3xl font-semibold">
              Enter Verification Code
            </Text>
            <Text className="mt-1 text-md">Sent to +91 9896206234</Text>
            <View className="flex flex-row justify-between w-full mt-4">
              {Array.from({ length }).map((_, i) => (
                <TextInput
                  key={i}
                  ref={(el) => {
                    inputRef.current[i] = el;
                  }}
                  // style={styles.inputBox}
                  keyboardType="numeric"
                  maxLength={1}
                  // value={values[i]}
                  className="h-14 w-14 md:w-16 border-2 text-center text-xl md:text-2xl font-medium border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  onChangeText={(text) => handelChange(text, i)}
                  onKeyPress={(e) => handleKeyPress(e, i)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          disabled={!isButtonActive}
          style={styles.continueButton}
          onPress={() => Alert.alert("Continue Pressed!")}
          className={`${isButtonActive ? "bg-blue-500" : "bg-[#EFEFEF]"} mt-5`}
        >
          <Text style={styles.continueButtonText}>CONTINUE </Text>
        </TouchableOpacity>
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
