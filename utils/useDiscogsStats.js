import { useState, useEffect } from "react";

import { fetchReleaseStats } from "./discogsApiOptions";

const useDiscogsStats = (releaseId) => {
  const [releaseStats, setReleaseStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await fetchReleaseStats(releaseId);
        setReleaseStats(stats);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchStats();
  }, []);
  return releaseStats;
};

export default useDiscogsStats;
