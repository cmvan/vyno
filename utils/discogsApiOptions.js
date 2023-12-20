import axios from "axios";
import getEnv from "./env";
import { queryAlbum } from "./spotifyApiOptions";

const {
  DISCOGS_API: { DISCOGS_TOKEN, COLLECTION_URI, RELEASE_STATS_API_GETTER },
} = getEnv();

const NO_URL = "NO_IMAGE_URL";
const NO_SPOTIFY_ID = "NO_SPOTIFY_ID";

const albumFormatter = (data) =>
  data.map((val) => {
    // remove numbering Discogs uses to distinguish artists of same name
    const artists = val.basic_information.artists?.map((artist) => ({
      name: artist.name.replace(/\s*\(\d+\)$/, ""),
      id: artist.id,
    }));
    return {
      name: val.basic_information.title,
      artists: artists,
      year: val.basic_information.year,
      discogsId: val.basic_information.id,
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
      let spotifyAlbumInfo = await queryAlbum(
        album.name,
        album.artists[0].name,
        album.year,
        spotifyToken
      );
      let updatedAlbum = { ...album, ...spotifyAlbumInfo };
      albumsObj.push(updatedAlbum);
    }
    return albumsObj;
  } catch (e) {
    console.error(e);
    alert("Albums could not be queried from Spotify!");
    return null;
  }
};

export const fetchCollection = async () => {
  try {
    let res = await fetcher(COLLECTION_URI);
    return albumFormatter(res.data.releases);
  } catch (e) {
    console.error(e);
    alert("Albums could not be fetched from Discogs!");
    return null;
  }
};

export const fetchReleaseStats = async (releaseId) => {
  try {
    const res = await fetcher(RELEASE_STATS_API_GETTER(releaseId));
    const formatList = [res.data.formats[0].name, ...res.data.formats[0].descriptions];
    if (res.data.formats[0].text) {
      formatList.push(res.data.formats[0].text);
    }
    const labels = res.data?.labels?.map((val) => val.name);
    stats = {
      date: res.data.released,
      country: res.data.country,
      formats: formatList,
      genres: res.data.genres,
      labels: labels,
      styles: res.data.styles ? res.data.styles : ["N/A"],
    };
    return stats;
  } catch (e) {
    console.error(e);
    alert("Failed to get Discogs release stats!");
    return null;
  }
};
