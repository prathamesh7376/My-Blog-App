import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/adminComponents/Sidebar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <>
      <ToastContainer theme="dark" />
      <div className="flex mb-4">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <div className="flex-grow flex items-center justify-center">
              <h3 className="font-medium">Admin Panel</h3>
            </div>
            <Image
              src={assets.Prathamesh}
              width={40}
              height={40}
              alt="Profile Icon"
            />
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
