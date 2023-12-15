import { Dimensions, FlatList, Image, Text, View, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Themes } from "../assets/Themes";
import { useSpotifyTracks } from "../utils";
import SongListHeader from "../components/SongListHeader";
import Song from "../components/Song";
import { Col, Row, Grid } from "react-native-easy-grid";

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
      <View style={styles.table}>
        <Grid>
          <Col size={40}>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>Label</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>Format</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>Country</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>Released</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>Genre</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>Style</Text>
            </Row>
          </Col>
          <Col size={60}>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>S.M Entertainment</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>10 x File, FLAC, Album</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>South Korea</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>Nov 13, 2023</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>Pop</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>K-Pop</Text>
            </Row>
          </Col>
        </Grid>
      </View>
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
