import React, { useEffect, useState } from "react";
import { api } from "../../config/url";

interface ScreenImage {
  imageUrl: string;
  tags: string[];
}

interface ScreenData {
  appName: string;
  type: string;
  images: ScreenImage[];
}

function AllScreens() {
  const [screens, setScreens] = useState<ScreenData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const CHUNK_SIZE = 10;

  const fetchScreens = async (pageNum: number) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const res = await api.post("/api/screen/public", {
  page: pageNum,
  chunkSize: CHUNK_SIZE,
});
      console.log("Raw API response:", res.data);

      const payload = res.data?.data;
      if (!payload || payload.code !== 1) {
        throw new Error(payload?.message || "Failed to load screens");
      }

      const newData: ScreenData[] = payload.data || [];
      console.log("Screens fetched:", newData);

      setScreens((prev) =>
        pageNum === 1 ? newData : [...prev, ...newData]
      );
      setHasMore(newData.length === CHUNK_SIZE);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching public screens:", err.message);
        setError(err.message);
      } else {
        console.error("Unknown error:", err);
        setError("Failed to load screens");
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchScreens(1);
  }, []);

  if (loading) return <p>Loading screens...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>All Screens</h2>
      {screens.length === 0 ? (
        <p>No screens available</p>
      ) : (
        screens.map((screen, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3>{screen.appName}</h3>
            <p>Type: {screen.type}</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {screen.images.map((img, i) => (
                <div key={i}>
                  <img
                    src={img.imageUrl}
                    alt={screen.appName}
                    style={{ width: "150px", borderRadius: "8px" }}
                  />
                  {/*<p>Tags: {img.tags.join(", ")}</p>*/}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      {hasMore && !loadingMore && (
        <button onClick={() => fetchScreens(screens.length / CHUNK_SIZE + 1)}>
          Load More
        </button>
      )}
      {loadingMore && <p>Loading more...</p>}
    </div>
  );
}

export default AllScreens;
