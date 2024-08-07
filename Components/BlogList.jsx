"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {loading ? (
        // Loading Spinner
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-6 my-10">
            <button
              onClick={() => setMenu("All")}
              className={
                menu === "All" ? "bg-black text-white py-1 px-4 rounded-md" : ""
              }
            >
              All
            </button>
            <button
              onClick={() => setMenu("Technology")}
              className={
                menu === "Technology"
                  ? "bg-black text-white py-1 px-4 rounded-md"
                  : ""
              }
            >
              Technology
            </button>
            <button
              onClick={() => setMenu("Startup")}
              className={
                menu === "Startup"
                  ? "bg-black text-white py-1 px-4 rounded-md"
                  : ""
              }
            >
              Startup
            </button>
            <button
              onClick={() => setMenu("Lifestyle")}
              className={
                menu === "Lifestyle"
                  ? "bg-black text-white py-1 px-4 rounded-md"
                  : ""
              }
            >
              Lifestyle
            </button>
          </div>
          <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
            {blogs
              .filter((item) =>
                menu === "All" ? true : item.category === menu
              )
              .map((item, index) => (
                <BlogItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogList;
