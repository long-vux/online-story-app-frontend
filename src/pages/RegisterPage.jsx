import React, { useState, useEffect } from "react";
import rectangle80 from "../assets/rectangle-80.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, []); // Empty dependency array to run only once on mount

  const handleSubmit = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(API_URL + 'user/register',
        {
          username,
          email,
          password
        }
      )
      if (response.status === 201) {
        toast.success("Register successfully!");
        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="w-screen h-screen flex bg-[#f9fbfb] overflow-hidden">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 flex justify-center items-center border-r border-[#1f1f1f]">
        <div className="w-[448px] max-w-[90%]">
          <h2 className="text-[32px] font-semibold text-center mt-4">
            <span className="text-[#1f1f1f]">Create </span>
            <span className="text-[#78a2b3]">Account</span>
          </h2>

          <p className="text-md text-center text-[#1f1f1fbf] mt-2">
            Join us to discover manga, track your progress, and enjoy reading!
          </p>

          {/* Name Field */}
          <div className="mt-8">
            <label className="block text-md font-normal text-[#1f1f1f] mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-[#1f1f1f80] rounded-lg px-4 py-3 outline-none"
              placeholder="johndoe123"
            />
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label className="block text-md font-normal text-[#1f1f1f] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#1f1f1f80] rounded-lg px-4 py-3 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className="block text-md font-normal text-[#1f1f1f] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#1f1f1f80] rounded-lg px-4 py-3 outline-none"
              placeholder="********"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mt-4">
            <label className="block text-md font-normal text-[#1f1f1f] mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-[#1f1f1f80] rounded-lg px-4 py-3 outline-none"
              placeholder="********"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Agreement */}
          <div className="flex items-center gap-2 mt-4 text-md">
            <input type="checkbox" className="w-4 h-4 border border-[#1f1f1f] rounded" />
            <p className="text-[#1f1f1f]">
              I agree to the <span className="text-[#78a2b3] font-bold cursor-pointer">Terms & Conditions</span>
            </p>
          </div>

          {/* Sign Up Button */}
          <button className="w-full mt-6 bg-[#78a2b3] text-white font-bold py-3 rounded-lg hover:opacity-90 transition" onClick={handleSubmit}>
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
