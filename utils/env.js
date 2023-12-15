import { Platform } from "react-native";

// Spotify envs
const CLIENT_ID = "e637ee27b78b4e3cb142e71f0cf86a6d";
const REDIRECT_URI = "exp://10.29.37.198:19000";
const ALBUM_ID = "4UUICitfodUVCNhzmDFbrO?si=BVrWbEMFQM-e8Uv1hALjgw"; // Set to Red Velvet's Chill Kill album"

// Discogs envs
const DISCOGS_TOKEN = "KjyhwyNrIFCCAbAizZQFPDmCDyZWXFlEuMJvUiPe";
const COLLECTION_URI = "https://api.discogs.com/users/cmvan/collection/folders/6624952/releases";

const redirectUri = (uri) => {
  if (!uri) {
    const err = new Error(
      "No redirect URI provided.\nPlease provide a redirect URI in env.js.\n You can find the file in utils/env.js."
    );
    console.error(err);
    alert(err);
  }
  return Platform.OS === "web" ? "http://localhost:19006/" : uri;
};

const ENV = {
  CLIENT_ID: CLIENT_ID,
  SCOPES: [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "streaming",
    "user-read-email",
    "user-read-private",
  ],
  REDIRECT_URI: redirectUri(REDIRECT_URI),
  ALBUM_ID: ALBUM_ID,
  SPOTIFY_API: {
    // Endpoints for auth & token flow
    DISCOVERY: {
      authorizationEndpoint: "https://accounts.spotify.com/authorize",
      tokenEndpoint: "https://accounts.spotify.com/api/token",
    },
    TOP_TRACKS_API: "https://api.spotify.com/v1/me/top/tracks?limit=20&offset=0",
    SEARCH_ALBUM_API_GETTER: (query) =>
      "https://api.spotify.com/v1/search?q=" + encodeURIComponent(query) + "&type=album",
    ALBUM_API_GETTER: (albumId) => "https://api.spotify.com/v1/albums/" + albumId + "/tracks",
    TRACKS_API_GETTER: (trackIds) => "https://api.spotify.com/v1/tracks?ids=" + trackIds.join(","),
  },
  DISCOGS_TOKEN: DISCOGS_TOKEN,
  COLLECTION_URI: COLLECTION_URI,
};

const getEnv = () => ENV;
export default getEnv;
// ^ use this type of exporting to ensure compliance with webpack and expo-web
