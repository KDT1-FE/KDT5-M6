
import VideoCard from "./VideoCard.tsx";
import "@/Components/YouTube/youtube.scss";
import { useEffect, useState } from "react";
import { fakeGetVideos } from "@/Api/youtubeApi.ts";


export default function Youtube() {
  const [videos, setVideos] = useState([]);
  useEffect(
     () => {
      fakeGetVideos().then(res => setVideos(res));
    }, []
  );

  return (
    <section className={"container"}>
      {videos && (
        <ul className={"video-list"}>
          {videos.map((video: YoutubeType) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </ul>
      )}
    </section>
  );
}

