import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import './style.css';
import logo from '../../assets/ZAP_QUEST.png';


const MainPage = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div id="webcrumbs" className="min-h-screen flex items-center justify-center bg-sky-50">
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-6"
        style={{ background: "#E0F7FA" }}
      >
        {/* LOGO */}
        <img src={logo} alt="Logo" className="h-50 w-auto mt-0 mb-0" />

        <h1 className="font-title font-bold text-4xl text-neutral-950">ZapQuest</h1>
        <p className="text-lg text-primary-300">A Quest for Success, One Task at a Time</p>

        {/* Buttons Section */}
        <div className="flex gap-5 mt-3">
          <button
            className="px-6 py-2 bg-neutral-50 hover:bg-neutral-200 rounded-full border border-neutral-300 text-neutral-950 transition-transform transform hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
          <button
            className="px-6 py-2 bg-neutral-950 hover:bg-neutral-800 rounded-full text-neutral-50 transition-transform transform hover:scale-105"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;