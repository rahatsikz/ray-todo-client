import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
  const { user, logOut } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleToSignUP = () => {
    navigate("/register");
  };
  const handleToLogin = () => {
    navigate("/login");
  };
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <div className="wrapper">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="banner flex-col">
        <div className="content">
          <h1 className="text-4xl font-bold text-white max-w-lg text-center tracking-wide leading-tight">
            Become focused, organized and calm with Todoist
          </h1>
        </div>

        {/* <div className="flex flex-col lg:flex-row lg:h-auto h-64 w-1/3 mx-auto mt-8 buttons">
          <div className="grid flex-grow card rounded-box place-items-center">
            <div className="btn-custom">
              <button onClick={handleToSignUP} className="btn-1">
                Sign Up
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
          <div className="divider self-center text-[#f5f3f2] font-semibold ">
            OR
          </div>
          <div className=" grid flex-grow card rounded-box place-items-center lg:-mt-0 -mt-6">
            <div className="btn-custom">
              <button onClick={handleToLogin} className="btn-2">
                Log in
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div> */}
        {user?.uid ? (
          <div className="btn-custom mt-8 buttons">
            <button onClick={handleLogOut} className="btn-1">
              Log Out
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:h-auto h-64 w-1/3 mx-auto mt-8 buttons">
            <div className="grid flex-grow card rounded-box place-items-center">
              <div className="btn-custom">
                <button onClick={handleToSignUP} className="btn-1">
                  Sign Up
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <div className="divider self-center text-[#f5f3f2] font-semibold ">
              OR
            </div>
            <div className=" grid flex-grow card rounded-box place-items-center lg:-mt-0 -mt-6">
              <div className="btn-custom">
                <button onClick={handleToLogin} className="btn-2">
                  Log in
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
