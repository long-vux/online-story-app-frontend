import React from "react";
import rectangle80 from "../assets/rectangle-80.png";
// import google from "./google.png";
// import lock1 from "./lock-1.svg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-screen h-screen flex bg-[#f9fbfb] overflow-hidden">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 flex justify-center items-center border-r border-[#1f1f1f]">
        <div className="w-[448px] max-w-[90%]">
          <h2 className="text-[32px] font-semibold text-center mt-4">
            <span className="text-[#1f1f1f]">Welcome </span>
            <span className="text-[#78a2b3]">back</span>
            <span className="text-[#1f1f1f]">!</span>
          </h2>

          <p className="text-sm text-center text-[#1f1f1fbf] mt-2">
            Discover manga, manhua and manhwa, track your progress, have fun, read manga.
          </p>

          {/* Email Field */}
          <div className="mt-10">
            <label className="block text-xs font-normal text-[#1f1f1f] mb-1 ml-3">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full border border-[#1f1f1f80] rounded-lg px-4 py-3 outline-none"
                placeholder="you@example.com"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#1f1f1fbf] text-lg">@</span>
            </div>
          </div>

          {/* Password Field */}
          <div className="mt-5">
            <label className="block text-xs font-normal text-[#1f1f1f] mb-1 ml-3">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full border border-[#1f1f1f80] rounded-lg px-4 py-3 outline-none"
                placeholder="********"
              />
              {/* <img src={lock1} alt="lock" className="absolute right-4 top-4 h-4 w-4" /> */}
            </div>
          </div>

          {/* Remember Me + Recovery */}
          <div className="flex justify-between items-center mt-4 text-xs">
            <label className="flex items-center gap-2 text-[#1f1f1f]">
              <input type="checkbox" className="w-4 h-4 border border-[#1f1f1f] rounded" />
              Remember me
            </label>
            <span className="text-[#78a2b3] font-bold cursor-pointer">Recovery password</span>
          </div>

          {/* Login Button */}
          <button className="w-full mt-6 bg-[#78a2b3] text-white font-bold py-3 rounded-lg hover:opacity-90 transition">
            Log in
          </button>

          {/* Bottom Links */}
          <div className="mt-6 text-center text-sm">
            <p>
              <span className="text-[#1f1f1f]">Don’t have an account? </span>
              <span className="text-[#78a2b3] font-bold cursor-pointer" onClick={() => navigate('/register')}>Sign up</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:block w-1/2 h-full">
        <img src={rectangle80} alt="Background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default LoginPage;
