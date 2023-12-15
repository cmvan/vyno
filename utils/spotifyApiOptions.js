import axios from "axios";
import getEnv from "./env";

const {
  SPOTIFY_API: { ALBUM_API_GETTER, SEARCH_ALBUM_API_GETTER, TRACKS_API_GETTER },
} = getEnv();

const ERROR_ALERT = new Error(
  "Oh no! Something went wrong; probably a malformed request or a network error.\nCheck console for more details."
);

/* Pulls out the relevant data from the API response and puts it in a nicely structured object. */
const formatter = (data) =>
  data.map((val) => {
    const artists = val.artists?.map((artist) => ({ name: artist.name }));
    // returning undefined for now to not confuse students, ideally a fix would be a hosted version of this
    return {
      songTitle: val.name,
      songArtists: artists,
      albumName: val.album?.name,
      imageUrl: val.album?.images[0]?.url ?? undefined,
      duration: val.duration_ms,
      externalUrl: val.external_urls?.spotify ?? undefined,
      previewUrl: val.preview_url ?? undefined,
    };
  });

/* Fetches data from the given endpoint URL with the access token provided. */
const fetcher = async (url, token) => {
  try {
    return await axios(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Fetches top tracks from the Spotify API
// export const getMyTopTracks = async (token) => {
//   try {
//     let res = await fetcher(TOP_TRACKS_API, token);
//     return formatter(res.data?.items);
//   } catch (e) {
//     console.error(e);
//     alert(ERROR_ALERT);
//     return null;
//   }
// };

// Fetches album from search query from Spotify API
export const queryAlbum = async (name, artist, year, token) => {
  try {
    artist = artist.replace(/\s*\(\d+\)$/, "");
    let query = `${name} artist:${artist} year:${year}`;
    let res = await fetcher(SEARCH_ALBUM_API_GETTER(query), token);
    let album = res.data.albums.items[0];
    return {
      albumId: album.id,
      albumName: album.name,
      albumArtists: album.artists?.map((artist) => ({ name: artist.name })),
      albumDate: album.release_date,
      albumImageUrl: album.images[0].url,
    };
  } catch (e) {
    console.error(e);
    alert(ERROR_ALERT);
    return null;
  }
};

// Fetches the given album from the Spotify API
export const getAlbumTracks = async (albumId, token) => {
  try {
    let res = await fetcher(ALBUM_API_GETTER(albumId), token);
    const trackIds = res.data?.items?.map((item) => {
      return item.id;
    });
    res = await fetcher(TRACKS_API_GETTER(trackIds), token);
    return formatter(res.data.tracks);
  } catch (e) {
    console.error(e);
    alert(ERROR_ALERT);
    return null;
  }
};
