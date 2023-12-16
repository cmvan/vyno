import { Dimensions, View, Image, Pressable, StyleSheet, Text } from "react-native";
import { Images, Themes } from "../assets/Themes";
import { FontAwesome5 } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const VynoLogin = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="record-vinyl" size={200} color="white" style={styles.vynoLogo} />
      <Text style={styles.brand}>Vyno</Text>
      <Text style={styles.slogan}>By Music Lovers, For Music Lovers</Text>
      <Pressable style={styles.authButton} onPress={() => onPress()}>
        <Image source={Images.spotify} style={styles.spotifyLogo} />
        <Text style={styles.authButtonText}>CONNECT WITH SPOTIFY</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  authButton: {
    backgroundColor: Themes.colors.spotify,
    borderRadius: windowHeight,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  authButtonText: {
    fontWeight: "bold",
    color: Themes.colors.white,
  },
  spotifyLogo: {
    height: windowWidth * 0.05,
    width: windowWidth * 0.05,
    marginRight: 8,
  },
  brand: {
    fontWeight: "bold",
    color: Themes.colors.white,
    fontSize: 40,
    marginBottom: 10,
  },
  slogan: {
    fontWeight: "bold",
    color: Themes.colors.gray,
    fontSize: 18,
    marginBottom: 20,
  },
  vynoLogo: {
    marginBottom: 5,
  },
});

export default VynoLogin;
