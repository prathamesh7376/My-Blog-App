"use client";

import { assets } from "@/Assets/assets";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Toggle Button for small screens */}
      <button
        onClick={toggleSidebar}
        className={`sm:hidden absolute top-4 left-4 bg-white border border-black p-2 rounded-full shadow-md flex items-center justify-center transition-transform ${
          isOpen ? "z-10" : "z-50"
        }`}
        aria-label="Toggle Sidebar"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`flex flex-col bg-slate-100 fixed top-0 left-0 h-full border border-black z-40 transition-transform ${
          isOpen ? "transform-none" : "-translate-x-full"
        } sm:relative sm:translate-x-0`}
      >
        <div className="px-2 sm:pl-14 py-2 border border-black">
          <Image
            src={assets.prathameshLogo}
            width={120}
            height={120}
            alt="Logo"
          />
        </div>
        <div className="w-full sm:w-80 py-12 border border-black flex flex-col items-center sm:items-start">
          <Link
            href="/admin/addProduct"
            className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] w-full text-center sm:text-left"
            onClick={closeSidebar} // Close the sidebar on link click
          >
            <Image
              src={assets.add_icon}
              alt="Add Blog"
              width={28}
              height={28}
            />
            <p>Add blog</p>
          </Link>
          <Link
            href="/admin/blogList"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] w-full text-center sm:text-left"
            onClick={closeSidebar} // Close the sidebar on link click
          >
            <Image
              src={assets.blog_icon}
              alt="Blog List"
              width={28}
              height={28}
            />
            <p>Blog List</p>
          </Link>
          <Link
            href="/admin/subscription"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] w-full text-center sm:text-left"
            onClick={closeSidebar} // Close the sidebar on link click
          >
            <Image
              src={assets.email_icon}
              alt="Subscription"
              width={28}
              height={28}
            />
            <p>Subscription</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
