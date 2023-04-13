import moment from "moment/moment";
import React from "react";

const VideoLength = ({ time, live }) => {
  const videoLengthInSeconds = moment()
    ?.startOf("day")
    ?.seconds(time)
    ?.format("H:mm:ss");
  return (
    <>
      <span
        className={`absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md ${
          live ? "invisible" : "visible"
        }`}>
        {videoLengthInSeconds}
      </span>
      <span
        className={`absolute bottom-2 right-2 bg-[#B90503] py-1 px-2 text-white text-sm font-semibold rounded-md ${
          live ? "visible" : "invisible"
        }`}>
        LIVE
      </span>
    </>
  );
};

export default VideoLength;
