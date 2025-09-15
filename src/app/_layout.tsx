import { Slot } from "expo-router";
import "../../global.css";
export default function RootLayout() {
  return <Slot />;
}

// Stack act as a stack but slot doesnot act as stack
// Doesn't store like stack and pop screens out
