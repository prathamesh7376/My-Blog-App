"use client";

import SubTableItem from "@/Components/adminComponents/SubTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails);
    } catch (error) {
      toast.error("Failed to fetch subscriptions");
    }
  };

  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete("/api/email", {
        params: {
          id: mongoId,
        },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        fetchEmails(); // Refresh the list after deletion
      } else {
        toast.error("Error deleting email");
      }
    } catch (error) {
      toast.error("Failed to delete email");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        All Subscriptions
      </h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscriptions
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Subscriptions Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item) => (
              <SubTableItem
                key={item._id} // Use unique _id as the key prop
                mongoID={item._id}
                deleteEmail={deleteEmail}
                email={item.email}
                date={item.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
