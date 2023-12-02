import { useState, useEffect } from "react";
import getEnv from "./env";

import { getMyTopTracks, getAlbumTracks } from "./apiOptions";

const { ALBUM_ID } = getEnv();

const useSpotifyTracks = (token) => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        if (token) {
          const res = await getMyTopTracks(token);
          const tracks = res.map((track) => ({
            ...track,
            songArtists: JSON.stringify(track.songArtists),
          }));
          console.log(tracks);
          setTopTracks(tracks);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchTracks();
  }, [token]);
  return topTracks;
};

export default useSpotifyTracks;
