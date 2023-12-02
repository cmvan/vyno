import { View, StyleSheet, StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import { Stack, useLocalSearchParams } from "expo-router";
import { Themes } from "../assets/Themes";

export default function Page() {
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Song Preview",
          headerStyle: { backgroundColor: Themes.colors.background },
          headerTitleStyle: {
            color: Themes.colors.white,
            fontWeight: "bold",
          },
          headerTintColor: Themes.colors.white,
          headerBackTitleVisible: false,
        }}
      />
      <WebView source={{ uri: params.previewUrl }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  custom: {
    color: Themes.colors.white,
  },
});
