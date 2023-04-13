import moment from "moment/moment";
import React from "react";

const Comment = ({ comment }) => {
  const {
    snippet: {
      topLevelComment: {
        snippet: {
          authorDisplayName,
          authorProfileImageUrl,
          publishedAt,
          textDisplay,
        },
      },
    },
  } = comment;

  if (comment === undefined) return <h4>Loading</h4>;
  else
    return (
      <div className="comment p-2 flex text-[0.9rem]">
        <img
          src={authorProfileImageUrl}
          alt="avatar"
          className="mr-3 rounded-full h-[45px] w-[45px] object-contain"
        />
        <div className="comment__body overflow-hidden">
          <div className="flex">
            <p className="mb-1 comment__header dark:text-white text-[13px] font-medium leading-[18px]">
              {authorDisplayName}
            </p>
            <p className="ml-2 text-sm dark:text-white/[0.7] text-[12px] leading-[18px]">
              {moment(publishedAt).fromNow()}
            </p>
          </div>
          <p
            className="mb-0 dark:text-white"
            dangerouslySetInnerHTML={{ __html: textDisplay }}></p>
        </div>
      </div>
    );
};

export default Comment;
