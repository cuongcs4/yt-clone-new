import { abbreviateNumber } from "js-abbreviation-number";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoLength from "../shared/videoLength";
import { request } from "../utils/api";

const SearchResultVideoCard = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      description,
      thumbnails: { medium, high },
    },
  } = video;

  const [duration, setDuration] = useState(null);
  const [live, setLive] = useState(false);
  const [channelIcon, setChannelIcon] = useState(null);
  const [view, setView] = useState(null);

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
      setView(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [id?.videoId]);
  return (
    <Link to={`/watch/_id/${id?.videoId}/_channel/${channelId}`}>
      <div className="flex flex-col sm:flex-row mb-5 md:mb-3 lg:hover:bg-white/[0.1] rounded-xl md:p-2">
        <div className="relative flex shrink-0 sm:w-80 rounded-xl dark:bg-slate-800 overflow-hidden h-[50vw] sm:h-40">
          <img
            className="h-full w-full hidden md:block object-cover"
            src={medium?.url}
            alt="thumbnail"
          />
          <img
            className="h-full w-full md:hidden object-cover"
            src={high?.url}
            alt="thumbnail"
          />
          {seconds && (
            <VideoLength
              time={seconds}
              live={live}
            />
          )}
        </div>
        <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          <span className=" dark:text-white xl:text-lg line-clamp-2 font-[500]">
            {title}
          </span>
          <span className="empty:hidden text-sm  md:pr-24 md:my-4 dark:text-white/[0.7] line-clamp-2 xl:line-clamp-1">
            {description}
          </span>
          <div className="flex items-center">
            <div className="flex items-start mr-3">
              <div className="flex h-9 w-9 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={channelIcon?.url}
                  alt="avatar"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="dark:text-white/[0.7] text-sm mt-2 flex items-center">
                {channelTitle}
                {/* {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="dark:text-white/50 text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
                )} */}
              </span>
              <div className="dark:text-white/[0.7] text-sm flex truncate overflow-hidden">
                <span>{`${abbreviateNumber(view, 2)} views`}</span>
                <span className="flex text-[24px] leading-none relative top-[-10px] font-bold mx-1">
                  .
                </span>
                <span className="truncate">
                  {moment(publishedAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultVideoCard;
