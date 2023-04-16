import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/auth.action";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken, navigate]);

  if (!accessToken)
    return (
      <div
        div
        className="login dark:bg-[#0F0F0F] grid place-items-center h-screen">
        <div className="login__container w-auto md:w-[500px] dark:bg-slate-600 rounded-md p-8 my-4 flex flex-col items-center">
          <h2 className="font-semibold text-lg">Youtube Clone</h2>
          <img
            className="w-32 h-32 object-contain"
            src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
            alt=""
          />
          <button
            className="p-2 border-none rounded-md mb-4 focus:outline-none bg-slate-100"
            onClick={handleLogin}>
            Login With GOOGLE
          </button>
          <p>This Project is made using YOUTUBE DATA API</p>
        </div>
      </div>
    );
};

export default LoginScreen;
