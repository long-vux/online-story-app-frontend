import React from "react";
import rectangle80 from "../assets/rectangle-80.png";
// import google from "./google.png";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const navigate = useNavigate();

//   const handleSignUp = () => {
//     // Perform sign-up logic here
//     // For now, let's just navigate to the homepage
//     navigate("/home");
//   };
  return (
    <div className="w-screen h-screen flex bg-[#f9fbfb] overflow-hidden">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 flex justify-center items-center border-r border-[#1f1f1f]">
        <div className="w-[448px] max-w-[90%]">
          <h2 className="text-[32px] font-semibold text-center mt-4">
            <span className="text-[#1f1f1f]">Create </span>
            <span className="text-[#78a2b3]">Account</span>
          </h2>

          <p className="text-sm text-center text-[#1f1f1fbf] mt-2">
            Join us to discover manga, track your progress, and enjoy reading!
          </p>

          {/* Name Field */}
          <div className="mt-8">
            <label className="block text-xs font-normal text-[#1f1f1f] mb-1 ml-3">Full Name</label>
            <input
              type="text"
              className="w-full border border-[#1f1f1f80] rounded-lg px-4 py-3 outline-none"
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label className="block text-xs font-normal text-[#1f1f1f] mb-1 ml-3">Email</label>
            <input
              type="email"
              className="w-full border border-[#1f1f1f80] rounded-lg px-4 py-3 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className="block text-xs font-normal text-[#1f1f1f] mb-1 ml-3">Password</label>
            <input
              type="password"
              className="w-full border border-[#1f1f1f80] rounded-lg px-4 py-3 outline-none"
              placeholder="********"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mt-4">
            <label className="block text-xs font-normal text-[#1f1f1f] mb-1 ml-3">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-[#1f1f1f80] rounded-lg px-4 py-3 outline-none"
              placeholder="********"
            />
          </div>

          {/* Agreement */}
          <div className="flex items-center gap-2 mt-4 text-xs">
            <input type="checkbox" className="w-4 h-4 border border-[#1f1f1f] rounded" />
            <p className="text-[#1f1f1f]">
              I agree to the <span className="text-[#78a2b3] font-bold cursor-pointer">Terms & Conditions</span>
            </p>
          </div>

          {/* Sign Up Button */}
          <button className="w-full mt-6 bg-[#78a2b3] text-white font-bold py-3 rounded-lg hover:opacity-90 transition">
            Sign up
          </button>

          {/* Bottom Links */}
          <div className="mt-6 text-center text-sm">
            <p>
              <span className="text-[#1f1f1f]">Already have an account? </span>
              <span className="text-[#78a2b3] font-bold cursor-pointer" onClick={() => navigate('/login')}>Log in</span>
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

export default RegisterPage;
