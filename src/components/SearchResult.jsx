import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/contextApi";
import { fetchDataFromApi } from "../utils/api";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
  const { setLoading, mobileMenu } = useContext(Context);
  const { searchQuery } = useParams();
  console.log(searchQuery);
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchSearchResults = () => {
      setLoading(true);
      fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
        setResult(res?.items);
        setLoading(false);
      });
    };
    fetchSearchResults();
  }, [searchQuery, setLoading]);

  if (result === undefined) return <h4>Loading</h4>;
  else
    return (
      <div
        className={`flex flex-row mt-[56px] h-screen md:ml-[80px] ${
          mobileMenu ? "lg:ml-[240px]" : "lg:ml-[200px]"
        } lg:w-[calc[100%-240px]]`}>
        {/* <LeftNav /> */}
        <div className="grow h-full overflow-y-auto dark:bg-[#0F0F0F]">
          <div className="grid grid-cols-1 gap-2 md:p-5">
            {result?.map((item) => {
              if (item?.id?.kind !== "youtube#video") return false;
              return (
                <SearchResultVideoCard
                  key={item?.id?.videoId}
                  video={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default SearchResult;
