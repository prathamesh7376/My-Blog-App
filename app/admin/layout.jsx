import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/adminComponents/Sidebar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  return (
    <>
      <ToastContainer theme="dark" />
      <div className="flex mb-4">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col w-full">
          {/* Header Section */}
          <header className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <div className="flex-grow flex items-center justify-center">
              <h3 className="font-medium text-lg">Admin Panel</h3>{" "}
              {/* Improve title text */}
            </div>
            <div className="flex items-center space-x-2">
              {/* Profile Picture with fallback */}
              <Image
                src={assets.Prathamesh || "/default-profile.png"} // Fallback image if asset is missing
                width={40}
                height={40}
                alt="Admin Profile Icon"
                className="rounded-full" // Adding rounded full for the image
              />
            </div>
          </header>

          {/* Main content (children) */}
          <main className="flex-grow">{children}</main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
