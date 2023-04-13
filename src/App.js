import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Feed from "./components/Feed";
import Header from "./components/Header";
import LeftNav from "./components/LeftNav";
import LoginScreen from "./components/loginScreen/LoginScreen";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="app__container">
        <LeftNav />
        {children}
      </div>
    </>
  );
};

const App = () => {
  const {accessToken, loading} = useSelector(state => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate('/auth')
    }
  },[accessToken, loading, navigate])

  return (
    <AppContext>
        <div className="dark:bg-[#0F0F0F]">
          {/* <Header />
          <LeftNav /> */}
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Feed />
                </Layout>
              }></Route>
            <Route
              path="/searchResult/:searchQuery"
              element={
                <Layout>
                  <SearchResult />
                </Layout>
              }></Route>
            <Route
              path="/watch/_id/:id/_channel/:channelId"
              element={
                <Layout>
                  <VideoDetails />
                </Layout>
              }></Route>
            <Route
              path="/auth"
              element={<LoginScreen />}></Route>
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }></Route>
          </Routes>
        </div>
    </AppContext>
  );
};

export default App;
