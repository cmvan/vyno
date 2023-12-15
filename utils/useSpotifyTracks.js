import { useState, useEffect } from "react";
import getEnv from "./env";

import { getAlbumTracks } from "./spotifyApiOptions";

const useSpotifyTracks = (albumId, token) => {
  const [albumTracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        if (token) {
          const res = await getAlbumTracks(albumId, token);
          const tracks = res.map((track) => ({
            ...track,
            songArtists: JSON.stringify(track.songArtists),
          }));
          setTracks(tracks);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchTracks();
  }, [albumId, token]);
  return albumTracks;
};

export default useSpotifyTracks;
