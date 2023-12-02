import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Themes } from "../assets/Themes";
import { millisToMinutesAndSeconds } from "../utils";

const windowWidth = Dimensions.get("window").width;

const Song = ({
  songTitle,
  songArtists,
  albumName,
  duration,
  imageUrl,
  externalUrl,
  previewUrl,
}) => {
  const formattedDuration = millisToMinutesAndSeconds(duration);
  const artistList = JSON.parse(songArtists).map((artist) => artist.name);
  const artists = artistList.join(", ");
  return (
    <Link
      href={{
        pathname: "/external",
        params: {
          externalUrl: externalUrl,
        },
      }}
      asChild
    >
      <Pressable style={styles.songContainer}>
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
        <View style={styles.albumImageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.albumImage} />
        </View>
        <View style={styles.songTitleArtist}>
          <Text
            style={[styles.text, styles.whiteText]}
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            {songTitle}
          </Text>
          <Text
            style={[styles.text, styles.grayText]}
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            {artists}
          </Text>
        </View>
        <Text
          style={[styles.text, styles.whiteText, styles.albumName]}
          ellipsizeMode={"tail"}
          numberOfLines={1}
        >
          {albumName}
        </Text>
        <Text style={[styles.text, styles.whiteText]}>{formattedDuration}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
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
  albumImageContainer: {
    marginRight: 10,
  },
  albumImage: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
  },
  songTitleArtist: {
    flexBasis: windowWidth * 0.25,
    flexDirection: "column",
    marginRight: 10,
  },
  albumName: {
    flexBasis: windowWidth * 0.25,
    marginRight: 10,
  },
});

export default Song;
