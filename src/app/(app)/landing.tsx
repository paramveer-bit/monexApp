import { Link } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Slide {
  id: string;
  image: any; // Use 'any' for require(), or be more specific if using URIs
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    id: "1",
    image: require("../../../assets/onBoarding1.png"),
    title: "Note Down Expenses",
    subtitle: "Daily note your expenses to help manage money",
  },
  {
    id: "2",
    image: require("../../../assets/onBoarding2.png"),
    title: "Simple Money Management",
    subtitle: "Get your notifications or alert when you do the over expenses",
  },
  {
    id: "3",
    image: require("../../../assets/onBoarding3.png"),
    title: "Easy to Track and Analyze", // Corrected typo from "Analize"
    subtitle: "Tracking your expenses helps make sure you don't overspend", // Improved grammar
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList<Slide>>(null);

  // Updates the current index based on which slide is visible
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      console.log(viewableItems);
      if (viewableItems.length > 0) {
        if (
          viewableItems[0].index !== null &&
          viewableItems[0].index !== undefined
        ) {
          setCurrentIndex(viewableItems[0].index);
        }
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Handles the "LET'S GO" button press
  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Logic for the last screen, e.g., navigate to Home screen
      console.log("Navigating to the main app...");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Header Logo */}
      <View style={styles.header}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Monex</Text>
      </View>

      {/* Swipable Slides */}
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          scrollEventThrottle={32}
        />
      </View>

      {/* Paginator */}
      <Paginator data={slides} currentIndex={currentIndex} />

      {/* LET'S GO Button */}
      <Link href="/login" asChild>
        <TouchableOpacity
          style={styles.button}
          onPress={scrollTo}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>LET'S GO</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

// --- Onboarding Item Component (Renders a single slide) ---
const OnboardingItem = ({ item }: { item: Slide }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.slideContainer, { width }]}>
      {/* Illustration */}
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
        className="mx-auto mt-5"
      />
      {/* Text Content */}
      <View style={{ flex: 0.3, paddingTop: 10 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

const Paginator = ({
  data,
  currentIndex,
}: {
  data: Slide[];
  currentIndex: number;
}) => {
  return (
    <View style={styles.paginatorContainer}>
      {data.map((_, i) => {
        const isActive = i === currentIndex;
        return (
          <View
            key={i.toString()}
            style={[styles.dot, isActive && styles.dotActive]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    marginTop: 15,
    flex: 0.5,
    justifyContent: "center",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 50, // Set font size to visually match the logo's height
    fontWeight: "bold",
    color: "#1F2937",
    marginLeft: 10, // Add space between the logo and text
  },
  logo: {
    width: 60,
    height: 50,
    resizeMode: "contain",
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0,
  },
  image: {
    flex: 0.6,
    justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 24,
    marginBottom: 10,
    color: "#1F2937", // Darker gray for title
    textAlign: "center",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontWeight: "400",
    fontSize: 16,
    color: "#6B7280", // Lighter gray for subtitle
    textAlign: "center",
    paddingHorizontal: 64,
  },
  paginatorContainer: {
    flexDirection: "row",
    height: 64,
    justifyContent: "center",
    paddingTop: 1,
    // alignItems: "center",
    // backgroundColor: "pink",
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB", // Inactive dot color
    marginHorizontal: 4,
    width: 8,
  },
  dotActive: {
    backgroundColor: "#3D5CFF", // Active dot color from your image
    width: 20,
  },
  button: {
    backgroundColor: "#3D5CFF", // Button color from your image
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    marginBottom: 40,
    shadowColor: "#3D5CFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginTop: 15,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
