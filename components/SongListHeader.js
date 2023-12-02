import { Dimensions, Image, View, StyleSheet, Text } from "react-native";
import { Images, Themes } from "../assets/Themes";

const windowWidth = Dimensions.get("window").width;

const SongListHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={Images.spotify} style={styles.spotifyLogo} />
      <Text style={styles.headerText}>My Top Tracks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Themes.colors.white,
  },
  spotifyLogo: {
    height: windowWidth * 0.07,
    width: windowWidth * 0.07,
    marginRight: 8,
  },
});

export default SongListHeader;
