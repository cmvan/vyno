import { Dimensions, Image, Pressable, StyleSheet, Text } from "react-native";
import { Images, Themes } from "../assets/Themes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SpotifyAuthButton = ({ onPress }) => {
  return (
    <Pressable style={styles.authButton} onPress={() => onPress()}>
      <Image source={Images.spotify} style={styles.spotifyLogo} />
      <Text style={styles.authButtonText}>CONNECT WITH SPOTIFY</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default SpotifyAuthButton;
