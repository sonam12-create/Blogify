import React from "react";
import { FiTrash2 } from "react-icons/fi";

const PublishedBlogCard = ({ blog, onDelete, onView }) => (
  <div
    className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer w-full"
    onClick={() => onView(blog)}
  >
    {blog.image && (
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
      />
    )}
    <h3 className="text-lg sm:text-xl font-semibold">{blog.title}</h3>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2 mb-4">
      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm w-fit">
        Published
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(blog._id);
        }}
        className="flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-fit"
      >
        <FiTrash2 className="mr-1" /> Delete
      </button>
    </div>

    <p className="text-gray-700 text-sm sm:text-base line-clamp-3">
      {blog.content}
    </p>

    {blog.tags?.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 px-6 py-3 rounded-full text-sm break-words max-w-full"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default PublishedBlogCard;
