import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/contextApi";
import Loader from "../shared/loader";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import ytLogoDark from "../images/yt-logo-dark.png";
import userBlank from "../images/user.png";

import { useSelector } from "react-redux";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, mobileMenu, setMobileMenu } = useContext(Context);

  const userString = useSelector((state) => state.auth.user);
  const user =
    typeof userString === "string" ? JSON.parse(userString) : userString;

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed w-full top-0 z-40 flex flex-row items-center justify-between h-14 px-4 md:px-5 dark:bg-[#0F0F0F] bg-white">
      {loading && <Loader />}
      <div className="flex h-5 items-center">
        {/* {pageName !== "video" && (
          
        )} */}
        <div
          className="flex md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
          onClick={mobileMenuToggle}>
          {/* {mobileMenu ? (
              <CgClose className="dark:text-white text-xl" />
            ) : (
              <SlMenu className="dark:text-white text-xl" />
            )} */}
          <SlMenu className="dark:text-white text-xl" />
        </div>
        <Link
          to="/"
          className="flex h-5 items-center">
          <img
            className="h-full hidden md:dark:hidden md:block"
            src={ytLogo}
            alt="Youtube"
          />
          <img
            className="h-full hidden md:dark:block"
            src={ytLogoDark}
            alt="Youtube"
          />
          <img
            className="h-full md:hidden"
            src={ytLogoMobile}
            alt="Youtube"
          />
        </Link>
      </div>
      <div className="group flex items-center py-2">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-10 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="dark:text-white text-,xl" />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none dark:text-white pr-5 pl-5 md:pl-0  w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            placeholder="Search"
            value={searchQuery}
          />
        </div>
        <button
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
          onClick={() => searchQueryHandler("searchButton")}>
          <IoIosSearch className="dark:text-white text-xl" />
        </button>
      </div>
      <div className="flex items-center">
        <div className="hidden md:flex">
          <div
            className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
            onClick={switchTheme}>
            {theme === "light" ? (
              <BsToggle2Off className=" text-xl cursor-pointer" />
            ) : (
              <BsToggle2On className="text-xl text-white cursor-pointer" />
            )}
          </div>
          <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <RiVideoAddLine className="dark:text-white text-xl cursor-pointer" />
          </div>
          <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <FiBell className="dark:text-white text-xl cursor-pointer" />
          </div>
        </div>
        <div className="flex h-8 overflow-hidden rounded-full md:ml-4">
          <img
            src={user ? user.photoURL : userBlank}
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
