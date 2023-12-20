import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { Stack } from "expo-router";
import { useSpotifyAuth } from "../utils";
import { Themes } from "../assets/Themes";
import VynoLogin from "../components/VynoLogin";
import VynoHeader from "../components/SongListHeader";
import useDiscogsCollection from "../utils/useDiscogsCollection";
import Album from "../components/Album";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  const { token, getSpotifyAuth } = useSpotifyAuth();
  const { discogsAlbums, loading } = useDiscogsCollection(token);
  StatusBar.setBarStyle("light-content");

  const renderAlbum = ({ item }) => {
    return (
      <Album
        spotifyId={item.spotifyId}
        albumName={item.name}
        albumArtists={item.artists}
        imageUrl={item.imageUrl}
        authToken={token}
        discogsId={item.discogsId}
      />
    );
  };

  let contentDisplayed = null;

  if (loading) {
    contentDisplayed = (
      <ActivityIndicator animating={true} size="large" color={Themes.colors.white} />
    );
  }
  if (token) {
    contentDisplayed = (
      <FlatList
        data={discogsAlbums}
        renderItem={renderAlbum}
        numColumns={2}
        ListHeaderComponent={<VynoHeader title={"Vyno Collection"} />}
        contentContainerStyle={styles.albumList}
      />
    );
  } else {
    contentDisplayed = <VynoLogin onPress={getSpotifyAuth} />;
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
  albumList: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  info: {
    alignItems: "center",
  },
  whiteText: {
    color: Themes.colors.white,
  },
  grayText: {
    color: Themes.colors.gray,
  },
  albumImage: {
    height: windowWidth * 0.6,
    width: windowWidth * 0.6,
    marginVertical: 20,
  },
  albumName: {
    textAlign: "center",
    marginHorizontal: "5%",
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 24,
  },
  table: {
    width: "100%",
    height: 250,
    padding: 16,
  },
  cell: {
    borderWidth: 1,
    borderColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
