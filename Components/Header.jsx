"use client";

import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post("/api/email", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error: " + response.data.msg);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.prathameshLogo}
          width={130} // Consistent width
          height={130} // Added height for consistent layout
          alt="Prathamesh Lokhande Logo"
          className="w-[130px] sm:w-auto"
        />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
          Get Started
          <Image
            src={assets.arrow}
            alt="Arrow Icon"
            width={16} // Set a consistent width and height for the icon
            height={16}
          />
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Where Engaging Content Meets Insightful Reads for Every Interest
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="flex-1 py-3 px-4 outline-none border-none rounded-l-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="border-l border-black py-3 px-4 sm:px-8 bg-black text-white rounded-r-md hover:bg-gray-800 active:bg-gray-600"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
