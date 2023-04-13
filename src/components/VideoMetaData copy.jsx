import React from "react";
import ReactShowMoreText from "react-show-more-text";

const VideoMetaData = ({ video, videoId }) => {
  return (
    <div className="my-2 p-2 bg-[#F2F2F2] dark:bg-[#272727] rounded-lg">
      <div className="text-[0.9rem] whitespace-pre-line border-b-[0.2px] border-solid border-neutral-500">
        <ReactShowMoreText
          lines={3}
          more={<p className="mt-2">Show more</p>}
          less={<p className="mt-2">Show Less</p>}
          expanded={false}
          truncatedEndingComponent={"... "}
          keepNewLines={true}
          anchorClass="show-more-less-clickable"
          className="block my-4 dark:text-white text-[14px] leading-4"
          style={{ textDecoration: "none" }}>
          {video?.snippet?.description}
        </ReactShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
