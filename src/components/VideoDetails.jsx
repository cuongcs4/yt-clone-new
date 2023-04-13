import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { Context } from "../context/contextApi";
import { fetchDataFromApi, getChannelById, getVideoById } from "../utils/api";
import { abbreviateNumber } from "js-abbreviation-number";
import { AiOutlineEye, AiOutlineLike } from "react-icons/ai";
import SuggestionVideoCard from "./SuggestionVideoCard";
import VideoMetaData from "./VideoMetaData";
import Comments from "./Comments";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [channel, setChannel] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { setLoading } = useContext(Context);
  const { id, channelId } = useParams();

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setLoading(true);
      const res = await getVideoById(id);
      console.log("a");
      setVideo(res[0]);

      setLoading(false);
    };

    const fetchChannelDetails = async () => {
      setLoading(true);
      const res = await getChannelById(channelId);
      setChannel(res.items[0]);
      setLoading(false);
    };
    fetchChannelDetails();

    const fetchRelatedVideos = () => {
      setLoading(true);
      fetchDataFromApi(`search?relatedToVideoId=${id}&type=video`).then(
        ({ items }) => {
          setRelatedVideos(items);
          setLoading(false);
        }
      );
    };
    fetchVideoDetails();
    fetchChannelDetails();
    fetchRelatedVideos();
  }, [id, channelId, setLoading]);

  if (video === undefined) return <h4>Loading</h4>;
  else
    return (
      <div className="flex h-full justify-center flex-row w-auto mt-[56px] dark:bg-[#0F0F0F] md:ml-[80px]">
        {/* <LeftNav /> */}
        <div className="w-full h-full max-w-[1440px] flex flex-col lg:flex-row">
          <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 shrink-0">
            {/* Video player */}
            <div className="h-[50vw] md:h-[400px] lg:h-[400px] xl:h-[550px] mx-[-16px] lg:mx-0 ">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                style={{ backgroundColor: "#000000" }}
                playing={false}
                className="md:h-auto"
              />
            </div>
            {/* Title and channel details */}
            <div className="dark:text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
              {video?.snippet?.title}
            </div>
            <div className="flex flex-col sm:flex-row justify-between mt-4">
              <div className="flex">
                <div className="flex items-start">
                  <div className="flex h-11 w-11 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={channel?.snippet?.thumbnails?.default?.url}
                      alt="author"
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-3">
                  <div className="dark:text-white text-base font-semibold flex items-center">
                    {video?.snippet?.channelTitle}
                    {/* {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="dark:text-white/[0.5] text-[12px] ml-1" />
                  )} */}
                  </div>
                  <div className="dark:text-white/[0.5] text-sm">
                    {" "}
                    {`${abbreviateNumber(
                      channel?.statistics?.subscriberCount,
                      0
                    )} Subscribers`}
                  </div>
                </div>
                <div className="flex items-center ml-6 md:font-semibold justify-center h-11 px-4 rounded-3xl text-white bg-[#272727] dark:bg-red-600 text-sm uppercase">
                  subscribe
                </div>
              </div>
              <div className="flex dark:text-white mt-4 sm:mt-0">
                <div className="flex items-center justify-center h-11 px-4 rounded-3xl dark:bg-white/[0.15] bg-[#F2F2F2] mr-2 md:font-medium text-sm">
                  <AiOutlineLike className="text-xl dark:text-white mr-2" />
                  {`${abbreviateNumber(video?.statistics?.likeCount, 2)} Likes`}
                </div>
                <div className="flex items-center md:font-medium justify-center h-11 px-4 rounded-3xl dark:bg-white/[0.15] bg-[#F2F2F2] text-sm">
                  <AiOutlineEye className="text-xl dark:text-white mr-2" />
                  {`${abbreviateNumber(video?.statistics?.viewCount, 2)} Views`}
                </div>
              </div>
            </div>
            <VideoMetaData
              video={video}
              videoId={id}
            />
            <Comments id={id} />
          </div>
          <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
            {relatedVideos?.map((item) => {
              return (
                <SuggestionVideoCard
                  key={item?.id.videoId}
                  video={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default VideoDetails;
