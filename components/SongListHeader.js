import { Dimensions, Image, View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Themes } from "../assets/Themes";

const windowWidth = Dimensions.get("window").width;

const SongListHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <FontAwesome5
        name="record-vinyl"
        size={18}
        color="white"
        style={styles.vynoLogo}
      />
      <Text style={styles.headerText}>TrackList</Text>
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
    fontSize: 18,
    color: Themes.colors.white,
  },
  vynoLogo: {
    marginRight: 5,
  },
});

export default SongListHeader;
