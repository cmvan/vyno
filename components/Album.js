import { Dimensions, StyleSheet, Pressable, Text, Image } from "react-native";
import { Link } from "expo-router";
import { Themes } from "../assets/Themes";

const windowWidth = Dimensions.get("window").width;

const Album = ({ spotifyId, albumName, albumArtists, imageUrl, authToken, discogsId }) => {
  const artistList = JSON.parse(albumArtists).map((artist) => artist.name);
  const artists = artistList.join(", ");
  return (
    <Link
      href={{
        pathname: "/details",
        params: {
          albumName: albumName,
          albumArtists: artistList,
          spotifyId: spotifyId,
          imageUrl: imageUrl,
          authToken: authToken,
          discogsId: discogsId,
        },
      }}
      asChild
    >
      <Pressable style={styles.albumContainer}>
        <Image source={{ uri: imageUrl }} style={styles.albumImage} />
        <Text style={[styles.text, styles.whiteText]} numberOfLines={1} ellipsizeMode="tail">
          {albumName}
        </Text>
        <Text style={[styles.text, styles.grayText]}>{artists}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  albumContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 5,
    width: "50%",
  },
  albumImage: {
    height: windowWidth * 0.4,
    width: windowWidth * 0.4,
    marginBottom: 10,
  },
  text: {
    maxWidth: windowWidth * 0.4,
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 2,
  },
  whiteText: {
    color: Themes.colors.white,
  },
  grayText: {
    color: Themes.colors.gray,
  },
});

export default Album;
