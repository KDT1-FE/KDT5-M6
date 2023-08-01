import axios from "axios";

export async function getVideos() {
    try {
        const res = await axios.get('https://www.googleapis.com/youtube/v3/search',
            {
                params: {
                    part: 'snippet',
                    type: 'video',
                    maxResults: 25,
                    q: '빅씨스',
                    key: import.meta.env.VITE_REACT_APP_YOUTUBE_API_KEY,
                }
            })
        return res.data.items.map((item:YoutubeType) => ({...item, videoId:item.id.videoId}))
    } catch (error) {
        console.error()
    }
}

export async function fakeGetVideos() {
    try {
        const res = await axios.get('src/Api/videos/ht.json')
        return res.data.items.map((item:YoutubeType) => ({...item, videoId:item.id.videoId}))
    } catch(error) {
        console.error()
    }
}


