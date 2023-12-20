import { FlatList, View, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Themes } from "../assets/Themes";
import { useSpotifyTracks } from "../utils";
import Song from "../components/Song";
import useDiscogsStats from "../utils/useDiscogsStats";
import AlbumStats from "../components/AlbumStats";

export default function Page() {
  const params = useLocalSearchParams();
  const tracks = useSpotifyTracks(params.spotifyId, params.authToken);
  const releaseStats = useDiscogsStats(params.discogsId);

  const commaListMaker = (list) => {
    let commaList = list ? list.join(", ") : "";
    return commaList;
  };

  const labels = commaListMaker(releaseStats.labels);
  const formats = commaListMaker(releaseStats.formats);
  const genres = commaListMaker(releaseStats.genres);
  const albumStyles = commaListMaker(releaseStats.styles);

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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Album Details",
          headerStyle: { backgroundColor: Themes.colors.background },
          headerTitleStyle: {
            color: Themes.colors.white,
            fontWeight: "bold",
          },
          headerTintColor: Themes.colors.white,
          headerBackTitleVisible: false,
        }}
      />
      <FlatList
        data={tracks}
        renderItem={renderSong}
        nestedScrollEnabled={true}
        ListHeaderComponent={
          <AlbumStats
            url={params.imageUrl}
            name={params.albumName}
            artists={params.albumArtists}
            labels={labels}
            formats={formats}
            country={releaseStats.country}
            date={releaseStats.date}
            genres={genres}
            albumStyles={albumStyles}
          />
        }
        contentContainerStyle={styles.test}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  test: {
    justifyContent: "center",
    alignItems: "center",
  },
});
