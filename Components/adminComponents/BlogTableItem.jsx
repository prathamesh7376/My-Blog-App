// BlogTableItem.jsx

import { assets } from "@/Assets/assets";
import Image from "next/image";

const BlogTableItem = ({
  authorImg,
  title,
  author,
  date,
  deleteBlog,
  mongoId,
}) => {
  const BlogDate = new Date(date);

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
      <th
        scope="row"
        className="flex items-center gap-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={assets.Prathamesh} // Fallback to default image
          width={40}
          height={40}
          priority
          alt="Author"
          className="rounded-full"
        />
        <p className="hidden sm:block">{author ? author : "No Author"}</p>
      </th>
      <td className="px-6 py-4">{title ? title : "No Title"}</td>
      <td className="px-6 py-4">{BlogDate.toDateString()}</td>
      <td
        onClick={() => deleteBlog(mongoId)}
        className="px-6 py-4 cursor-pointer text-red-500 hover:text-red-700"
      >
        Delete
      </td>
    </tr>
  );
};

export default BlogTableItem;
