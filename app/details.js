import { Dimensions, FlatList, Image, Text, View, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Themes } from "../assets/Themes";
import { useSpotifyTracks } from "../utils";
import SongListHeader from "../components/SongListHeader";
import Song from "../components/Song";

const windowWidth = Dimensions.get("window").width;

export default function Page() {
  const params = useLocalSearchParams();
  const tracks = useSpotifyTracks(params.albumId, params.authToken);

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
      <Image source={{ uri: params.imageUrl }} style={styles.albumImage} />
      <Text style={[styles.whiteText, styles.albumName]}>{params.albumName}</Text>
      <Text style={[styles.grayText, styles.albumName]}>{params.albumArtists}</Text>
      <FlatList data={tracks} renderItem={renderSong} ListHeaderComponent={<SongListHeader />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    flex: 1,
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
});
