"use client";

import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(null); // Initial value set to null
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Prathamesh Lokhande",
    authorImg: "/auther_img.png",
  });

  // Handle cleanup of object URL to prevent memory leaks
  useEffect(() => {
    if (image) {
      const objectURL = URL.createObjectURL(image);
      return () => URL.revokeObjectURL(objectURL); // Cleanup URL
    }
  }, [image]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Prathamesh Lokhande",
          authorImg: "/auther_img.png",
        });
        setImage(null);
      } else {
        toast.error("Upload failed, please try again.");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <form onSubmit={onSubmitHandler} className="space-y-6">
        <div className="text-center">
          <p className="text-2xl font-semibold">Upload Thumbnail</p>
          <label htmlFor="image" className="block mt-4 cursor-pointer">
            <Image
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              width={200}
              height={100}
              alt="Upload area"
              className="mx-auto border border-spacing-6 rounded-lg shadow-md"
              placeholder="blur"
              blurDataURL="/path/to/placeholder.jpg" // Add an actual placeholder image path
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div>
          <p className="text-xl font-semibold">Blog Title</p>
          <input
            name="title"
            type="text"
            placeholder="Type here"
            required
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChangeHandler}
            value={data.title}
          />
        </div>

        <div>
          <p className="text-xl font-semibold">Blog Description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            placeholder="Write content here."
            rows={6}
            required
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <p className="text-xl font-semibold">Blog Category</p>
          <select
            name="category"
            onChange={onChangeHandler}
            value={data.category}
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="Startup">Startups</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-6 h-12 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition-colors"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Page;
