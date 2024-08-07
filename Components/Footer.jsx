import { assets } from "@/Assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center bg-black py-5 gap-2 sm:gap-0">
      <Image
        src={assets.prathameshLogo}
        alt="Prathamesh Lokhande Logo"
        width={120}
        height={40} // Added height to avoid layout shifts
      />
      <p className="text-sm text-white text-center">
        All rights reserved by Prathamesh Lokhande
      </p>
      <div className="flex gap-4">
        {/* Added gap for spacing between icons */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={assets.facebook_icon}
            alt="Facebook"
            width={40}
            height={40} // Added height for consistency
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Image
            src={assets.twitter_icon}
            alt="Twitter"
            width={40}
            height={40} // Added height for consistency
          />
        </a>
        <a
          href="https://plus.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={assets.googleplus_icon}
            alt="Google Plus"
            width={40}
            height={40} // Added height for consistency
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
