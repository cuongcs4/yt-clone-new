import React, { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/contextApi";
import { log_out } from "../redux/actions/auth.action";
import { categories } from "../utils/constants";

import LeftNavMenuItem from "./LeftNavMenuItem";

const LeftNav = () => {
  const { setSelectedCategory, mobileMenu } = useContext(Context);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCategory(name);
      case "home":
        return setSelectedCategory(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  const logoutHandler = () => {
    dispatch(log_out());
  };

  return (
    <div
      className={`md:block w-[240px] dark:bg-[#0F0F0F] bg-white fixed overflow-y-auto h-full py-4 z-40 transition-all ${
        mobileMenu ? "" : "md:w-[80px] hidden"
      }`}>
      <div>
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <LeftNavMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                }}
                // className={`${
                //   selectedCategory === item.name ? "bg-white/[0.15]" : ""
                // }`}
              />
              {item.divider && <hr className="my-5 border-white/[0.2]" />}
            </React.Fragment>
          );
        })}
        <hr className="my-5 dark:border-white/[0.2] border-black/[0.5]" />
        <div
          className="px-3 flex items-center dark:text-white cursor-pointer h-10"
          onClick={() => {
            logoutHandler();
            navigate("/auth");
          }}>
          <span className="text-xl ml-5">
            <FiLogOut />
          </span>
          <span className={mobileMenu ? "ml-5" : "hidden"}>Log out</span>
        </div>
        <hr className="my-5 dark:border-white/[0.2] border-black/[0.5]" />

        <div
          className={`text-[#727272] flex justify-center dark:text-white/[0.5] text-[12px] ${
            mobileMenu ? "" : "hidden"
          }`}>
          Cloned by: Dimash Nguyen
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
