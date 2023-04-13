import axios from "axios";

// const BASE_URL = "https://youtube138.p.rapidapi.com";
// const options = {
//   params: { hl: "en", gl: "US" },
//   headers: {
//     "X-RapidAPI-Key": process.env.REACT_APP_YOUTUBE_API_KEY,
//     "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
//   },
// };

const BASE_URL = "https://youtube.googleapis.com/youtube/v3/";

export const request = axios.create({
  baseURL: BASE_URL,
  params: {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
});

// GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY] HTTP/1.1

export const fetchDataFromApi = async (query) => {
  const { data } = await request(query, {
    params: {
      part: "snippet",
      maxResults: 2,
    },
  });
  return data;
};

export const getVideoById = async (id) => {
  const {
    data: { items },
  } = await request("/videos", {
    params: {
      part: "snippet,contentDetails,statistics",
      id: id,
    },
  });
  return items;
};

export const getChannelById = async (id) => {
  const { data } = await request("/channels", {
    params: {
      part: "snippet,contentDetails,statistics",
      id: id,
    },
  });
  return data;
};

export const getCommentsById = async (id, order) => {
  const { data } = await request("/commentThreads", {
    params: {
      part: "snippet",
      // maxResults: 15,
      order: order,
      videoId: id,
    },
  });
  console.log(data);
  return data;
};

// export const getRelatedVideosById = async (id) => {
//   const { data } = await request("/search", {
//     params: {
//       part: "snippet",
//       relatedToVideoId: id,
//     },
//   });
//   return data;
// }

// export const fetchDataFromApi = async (url) => {
//   const { data } = await axios.get(`${BASE_URL}/${url}`, options);
//   return data;
// };
