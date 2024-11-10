"use client";

import { assets } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Use useCallback to memoize fetchBlogData
  const fetchBlogData = useCallback(async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: {
          id: params.id,
        },
      });
      setData(response.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setError("Failed to load the blog. Please try again later.");
      setLoading(false); // Set loading to false on error
    }
  }, [params.id]); // Include params.id as a dependency

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]); // Include fetchBlogData in the dependency array

  if (loading) {
    return (
      <div className="text-center my-24">
        <p>Loading...</p> {/* Placeholder for loading */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-24">
        <p className="text-red-500">{error}</p> {/* Error message */}
      </div>
    );
  }

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28 ">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={assets.prathameshLogo}
              width={180}
              alt="logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started
            <Image src={assets.arrow} alt="arrow" />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={assets.profile_icon}
            height={100}
            width={100}
            priority
            alt="author"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          width={1280}
          height={720}
          alt="blog-image"
          className="border-4 border-white "
        />
        <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="my-24 ">
          <p className="text-black font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <Image src={assets.facebook_icon} width={50} alt="facebook" />
            <Image src={assets.twitter_icon} width={50} alt="twitter" />
            <Image src={assets.googleplus_icon} width={50} alt="google-plus" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : null;
};

export default Page;
