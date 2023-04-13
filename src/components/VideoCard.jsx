import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoLength from "../shared/videoLength";
import { abbreviateNumber } from "js-abbreviation-number";
import { request } from "../utils/api";
import moment from "moment";
import { decode } from "html-entities";

const VideoCard = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium, high },
    },
  } = video;
  const [channelIcon, setChannelIcon] = useState(null);
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [live, setLive] = useState(false);

  const seconds = moment.duration(duration).asSeconds();

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: id?.videoId,
        },
      });
      if (items[0].snippet.liveBroadcastContent === "live") setLive(true);
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [id?.videoId]);

  return (
    <Link to={`/watch/_id/${id?.videoId}/_channel/${channelId}`}>
      <div className="flex flex-col mb-8">
        <div className="relative h-[50vw] sm:h-40 xl:h-[200px] rounded-xl overflow-hidden">
          <img
            className="h-full w-full hidden sm:block lg:hidden object-cover"
            src={medium.url}
            alt="thumbnail"
          />
          <img
            className="h-full w-full sm:hidden lg:block object-cover"
            src={high.url}
            alt="thumbnail"
          />
          <VideoLength
            time={seconds}
            live={live}
          />
        </div>
        <div className="flex dark:text-white mt-3">
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={channelIcon?.url}
                alt="author"
              />
            </div>
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">
              {decode(title)}
            </span>
            <span className="text-[14px] mt-2 text-[#0f0f0f] font-normal dark:text-white/[0.7] flex items-center leading-5">
              {channelTitle}
              {/* {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="dark:text-white/[0.5] text-[12px] ml-1" />
              )} */}
            </span>
            <div className="flex text-[14px] text-[#0f0f0f] dark:text-white/[0.7] truncate overflow-hidden leading-5">
              <span>{`${abbreviateNumber(views, 2)} views`}</span>
              <span className="flex text-[24px] leading-none font-bold dark:text-white/[0.7] relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncate">{moment(publishedAt).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
