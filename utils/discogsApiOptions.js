import axios from "axios";
import getEnv from "./env";
import { queryAlbum, getAlbumTracks } from "./spotifyApiOptions";

const { DISCOGS_TOKEN, COLLECTION_URI } = getEnv();

const ERROR_ALERT = new Error(
  "Oh no! Something went wrong; probably a malformed request or a network error.\nCheck console for more details."
);

const albumFormatter = (data) =>
  data.map((val) => {
    const artists = val.basic_information.artists?.map((artist) => ({ name: artist.name }));
    return {
      name: val.basic_information.title,
      artists: artists,
      year: val.basic_information.year,
    };
  });

/* Fetches data from the given endpoint URL with the access token provided. */
const fetcher = async (url) => {
  try {
    return await axios(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Discogs token=" + DISCOGS_TOKEN,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchDiscogsAlbums = async (spotifyToken) => {
  try {
    let albums = await fetchCollection();
    let albumsObj = [];
    for await (const album of albums) {
      let res = await queryAlbum(album.name, album.artists[0].name, album.year, spotifyToken);
      albumsObj.push(res);
    }
    // console.log(albumsObj);
    return albumsObj;
  } catch (e) {
    console.error(e);
    alert("Albums could not be fetched from Discogs!");
    return null;
  }
};

export const fetchCollection = async () => {
  try {
    let res = await fetcher(COLLECTION_URI);
    // console.log(res.data.releases);
    return albumFormatter(res.data.releases);
  } catch (e) {
    console.error(e);
    alert(ERROR_ALERT);
    return null;
  }
};
