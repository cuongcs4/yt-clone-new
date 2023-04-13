import React, { useContext } from "react";
import { Context } from "../context/contextApi";

const LeftNavMenuItem = ({ text, icon, className, action }) => {
  const { mobileMenu } = useContext(Context);
  return (
    <div
      className={`text-black hover:bg-slate-600 dark:text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg`}
      onClick={action}>
      <span className="text-xl ml-5">{icon}</span>
      <span className={mobileMenu ? "ml-5" : "hidden"}>{text}</span>
    </div>
  );
};

export default LeftNavMenuItem;
