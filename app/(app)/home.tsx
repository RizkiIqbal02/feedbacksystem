import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  console.log("Home");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello World.</Text>
      <Link href={'/details'}>To details screen</Link>
    </View>
  );
}
