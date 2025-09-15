import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-5xl">Edit app/index.tsx to edit this screen.</Text>
      <Link href="/(app)/landing" className="mt-5 text-3xl text-blue-500">
        Go to Landing
      </Link>
      <Link href="/verify" asChild>
        <Text className="mt-5 text-3xl text-blue-500">
          Go to OTP Verification
        </Text>
      </Link>
    </View>
  );
}
