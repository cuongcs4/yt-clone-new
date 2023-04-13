import React, { useContext, useEffect } from "react";
import { Context } from "../context/contextApi";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { mobileMenu, loading, searchResults } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  });

  return (
    <div
      className={`flex flex-1 flex-row h-screen mt-[56px] dark:bg-[#0F0F0F] ${
        mobileMenu ? "md:ml-[240px]" : "md:ml-[80px]"
      }`}>
      {/* <LeftNav /> */}
      <div className="grow h-full overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 md:p-5">
          {!loading &&
            searchResults.map((item) => {
              if (item.id.kind !== "youtube#video") return false;
              return (
                <VideoCard
                  key={item.id.videoId}
                  video={item}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
