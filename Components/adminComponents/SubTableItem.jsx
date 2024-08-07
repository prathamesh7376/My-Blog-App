import React from "react";

const SubTableItem = ({ email, mongoID, deleteEmail, date }) => {
  // Convert the date string to a Date object
  let emailDate;
  try {
    emailDate = new Date(date);
  } catch (error) {
    console.error("Invalid date format:", date);
    emailDate = new Date(); // Fallback to current date
  }

  // Function to handle delete click with error handling
  const handleDeleteClick = () => {
    if (typeof deleteEmail === "function") {
      deleteEmail(mongoID);
    } else {
      console.error("deleteEmail is not a function.");
    }
  };

  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email || "No Email"}
      </th>
      <td className="px-6 py-4 hidden sm:block">
        {emailDate ? emailDate.toDateString() : "Invalid Date"}
      </td>
      <td
        className="px-6 py-4 cursor-pointer text-red-800"
        onClick={handleDeleteClick}
        title="Delete"
        aria-label="Delete Email"
      >
        Delete
      </td>
    </tr>
  );
};

export default SubTableItem;
