import React from "react";
import './RoleSelection.css'; // Import the custom styles
import logo from '../../assets/ZAP_QUEST.png'; // Import the logo image
import { useNavigate } from "react-router-dom"; // Import navigation hook

function RoleSelectionPage() {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="w-full h-full flex flex-col items-center justify-center gap-6" style={{ background: "#fab4c7" }}>
        {/* Logo */}
        <img src={logo} alt="ZapQuest Logo" className="h-32 w-auto mb-6" />
        <h2 className="text-2xl font-bold text-neutral-950">Choose Your Role</h2>
        
        {/* Buttons to navigate to Parent or Child login */}
        <div className="flex gap-5 mt-3">
          <button
            className="flex-1 px-6 py-2 bg-neutral-50 hover:bg-neutral-200 rounded-full border border-neutral-300 text-neutral-950 transition-transform transform hover:scale-105"
            onClick={() => navigate("/parent-login")}
          >
            Parent
          </button>
        
          <button
            className="flex-1 px-6 py-2 bg-neutral-950 hover:bg-neutral-800 rounded-full text-neutral-50 transition-transform transform hover:scale-105"
            onClick={() => navigate("/child-login")}
          >
            Child
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelectionPage;