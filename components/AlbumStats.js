import { Dimensions, Image, Text, View, StyleSheet } from "react-native";
import { Themes } from "../assets/Themes";
import VynoHeader from "../components/SongListHeader";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;

const AlbumStats = ({
  url,
  name,
  artists,
  labels,
  formats,
  country,
  date,
  genres,
  albumStyles,
}) => {
  const scrollRender = (val, type) => {
    if (val && val.length > 0) {
      if (val.length <= 30) {
        return <Text style={styles.whiteText}>{val}</Text>;
      } else {
        return (
          <ScrollView horizontal contentContainerStyle={styles.scrollable}>
            <Text style={styles.whiteText}>{val}</Text>
          </ScrollView>
        );
      }
    } else {
      return <Text style={styles.whiteText}>Loading {type}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: url }} style={styles.albumImage} />
      <Text style={[styles.whiteText, styles.albumName]}>{name}</Text>
      <Text style={[styles.grayText, styles.albumName]}>{artists}</Text>
      <View style={styles.table}>
        <Grid>
          <Col size={30}>
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
              <Text style={styles.whiteText}>Date</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>Genre</Text>
            </Row>
            <Row style={styles.cell}>
              <Text style={styles.whiteText}>Style</Text>
            </Row>
          </Col>
          <Col size={70}>
            <Row style={styles.cell}>{scrollRender(labels, "Labels")}</Row>
            <Row style={styles.cell}>{scrollRender(formats, "Formats")}</Row>
            <Row style={styles.cell}>{scrollRender(country, "Countries")}</Row>
            <Row style={styles.cell}>{scrollRender(date, "Date")}</Row>
            <Row style={styles.cell}>{scrollRender(genres, "Genres")}</Row>
            <Row style={styles.cell}>{scrollRender(albumStyles, "Styles")}</Row>
          </Col>
        </Grid>
      </View>
      <VynoHeader title={"Track List"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
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
    minWidth: 300,
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
    overflow: "scroll",
  },
  scrollable: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AlbumStats;
