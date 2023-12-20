import { useState, useEffect } from "react";

import { fetchDiscogsAlbums } from "./discogsApiOptions";

const useDiscogsCollection = (token) => {
  const [discogsAlbums, setDiscogsAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        if (token) {
          const res = await fetchDiscogsAlbums(token);
          const albums = res.map((album) => ({
            ...album,
            artists: JSON.stringify(album.artists),
          }));
          console.log(albums);
          setDiscogsAlbums(albums);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error: ", error);
        setLoading(false);
      }
    };
    fetchAlbums();
  }, [token]);
  return { discogsAlbums, loading };
};

export default useDiscogsCollection;
