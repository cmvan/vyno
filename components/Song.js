import { Dimensions, StyleSheet, View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Themes } from "../assets/Themes";
import { millisToMinutesAndSeconds } from "../utils";

const windowWidth = Dimensions.get("window").width;

const Song = ({ songTitle, songArtists, albumName, duration, imageUrl, previewUrl }) => {
  const formattedDuration = millisToMinutesAndSeconds(duration);
  const artistList = JSON.parse(songArtists).map((artist) => artist.name);
  const artists = artistList.join(", ");
  return (
    <View style={styles.songContainer}>
      <Link
        href={{
          pathname: "/preview",
          params: {
            previewUrl: previewUrl,
          },
        }}
        asChild
      >
        <Pressable>
          <Ionicons
            name="ios-play-circle"
            size={24}
            color={Themes.colors.spotify}
            style={styles.playIcon}
          />
        </Pressable>
      </Link>
      <View style={styles.songTitleArtist}>
        <Text style={[styles.text, styles.whiteText]} ellipsizeMode={"tail"} numberOfLines={1}>
          {songTitle}
        </Text>
        <Text style={[styles.text, styles.grayText]} ellipsizeMode={"tail"} numberOfLines={1}>
          {artists}
        </Text>
      </View>
      <Text style={[styles.text, styles.whiteText]}>{formattedDuration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    minWidth: 300,
    width: "auto",
  },
  playIcon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
  whiteText: {
    color: Themes.colors.white,
  },
  grayText: {
    color: Themes.colors.gray,
  },
  songTitleArtist: {
    flexBasis: windowWidth * 0.5,
    flexDirection: "column",
    marginRight: 10,
  },
});

export default Song;
