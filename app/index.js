import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import { Stack } from "expo-router";
import { useSpotifyAuth, useSpotifyTracks } from "../utils";
import { Themes } from "../assets/Themes";
import SpotifyAuthButton from "../components/SpotifyAuthButton";
import Song from "../components/Song";
import SongListHeader from "../components/SongListHeader";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  const { token, getSpotifyAuth } = useSpotifyAuth();
  const tracks = useSpotifyTracks(token);
  StatusBar.setBarStyle("light-content");

  const renderSong = ({ item }) => {
    return (
      <Song
        songTitle={item.songTitle}
        songArtists={item.songArtists}
        albumName={item.albumName}
        duration={item.duration}
        imageUrl={item.imageUrl}
        externalUrl={item.externalUrl}
        previewUrl={item.previewUrl}
      />
    );
  };

  let contentDisplayed = null;

  if (token) {
    contentDisplayed = (
      <FlatList
        data={tracks}
        renderItem={renderSong}
        ListHeaderComponent={<SongListHeader />}
      />
    );
  } else {
    contentDisplayed = <SpotifyAuthButton onPress={getSpotifyAuth} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {contentDisplayed}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
});
