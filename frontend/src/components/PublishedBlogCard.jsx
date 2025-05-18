import React from "react";
import { FiTrash2 } from "react-icons/fi";

const PublishedBlogCard = ({ blog, onDelete, onView }) => (
  <div
    className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
    onClick={() => onView(blog)}
  >
    {blog.image && (
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-lg mb-4" />
    )}
    <h3 className="text-xl font-semibold">{blog.title}</h3>
    <div className="flex items-center justify-between mt-2 mb-4">
      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Published</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(blog._id);
        }}
        className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        <FiTrash2 className="mr-1" /> Delete
      </button>
    </div>
    <p className="text-gray-700 line-clamp-3">{blog.content}</p>
    {blog.tags?.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {blog.tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{tag}</span>
        ))}
      </div>
    )}
  </div>
);

export default PublishedBlogCard;
