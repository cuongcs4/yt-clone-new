import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/contextApi";
import { getCommentsById } from "../utils/api";
import Comment from "./Comment";

const Comments = ({ id }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const { setLoading } = useContext(Context);
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const res = await getCommentsById(id, "relevance");
      setComments(res.items);
    };
    fetchComments();
  }, [id, setLoading]);

  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="comments">
      <p>{comments.length} comments</p>
      <div className="my-2 flex w-full">
        <img
          src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt="avatar"
          className="mr-3 rounded-full w-[50px] h-[50px] object-contain"
        />
        <form className="flex grow">
          <input
            type="text"
            className="flex grow bg-transparent border-b-2 border-solid border-[#353946] dark:text-white focus:outline-none"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <button className="ml-2 p-2 bg-[#F2F2F2] dark:bg-[#353946] dark:text-white focus:border-none focus:outline-none tracking-[0.5px]">
          Comment
        </button>
      </div>
      <div className="comments__list block md:hidden">
        <div>
          {comments.length > 0 && <Comment comment={comments[0]} />}
          {comments.length > 1 && !showComments ? (
            <center>
              <button
                className="dark:text-white uppercase font-semibold my-2"
                onClick={handleToggleComments}>
                Show {comments.length - 1} more
              </button>
            </center>
          ) : (
            ""
          )}
          {showComments &&
            comments.slice(1).map((comment, i) => (
              <Comment
                comment={comment}
                key={i}
              />
            ))}
          {showComments && (
            <center>
              <button
                className="dark:text-white uppercase font-semibold my-2"
                onClick={handleToggleComments}>
                Show less
              </button>
            </center>
          )}
        </div>
      </div>

      <div className="comment__list hidden md:block">
        {comments.map((comment, i) => (
          <Comment
            comment={comment}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
