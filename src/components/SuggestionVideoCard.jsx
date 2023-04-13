import { abbreviateNumber } from "js-abbreviation-number";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoLength from "../shared/videoLength";
import { request } from "../utils/api";

const SuggestionVideoCard = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;
  const [duration, setDuration] = useState();
  const [live, setLive] = useState(false);
  const [view, setView] = useState();
  const seconds = moment.duration(duration).asSeconds();

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
    <Link to={`/video/_id/${id?.videoId}/_channel/${channelId}`}>
      <div className="flex mb-3">
        <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[160px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[160px] rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={medium.url}
            alt="thumbnails"
          />
          {seconds && (
            <VideoLength
              time={seconds}
              live={live}
            />
          )}
        </div>
        <div className="flex flex-col ml-3 overflow-hidden">
          <span className="text-[#0f0f0f] dark:text-white text-sm lg:text-xs xl:text-sm font-bold line-clamp-2">
            {title}
          </span>
          <span className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-[#727272] dark:text-white/[0.7] items-center ">
            {channelTitle}
          </span>
          <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] dark:text-white/[0.7] truncate overflow-hidden">
            <span>{`${abbreviateNumber(view, 0)} views`}</span>
            <span className="flex text-[24px] leading-none font-bold dark:text-white/[0.7] relative top-[-10px] mx-1">
              .
            </span>
            <span className="truncate">{moment(publishedAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SuggestionVideoCard;
