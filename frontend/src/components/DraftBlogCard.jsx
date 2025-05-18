import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const DraftBlogCard = ({ blog, onEdit, onDelete }) => (
  <div className="bg-white p-6 rounded-lg shadow relative">
    <h3 className="text-xl font-semibold">{blog.title}</h3>
    <div className="flex items-center mt-2 mb-4">
      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Draft</span>
    </div>
    <p className="text-gray-700 line-clamp-3">{blog.content}</p>
    {blog.tags?.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {blog.tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{tag}</span>
        ))}
      </div>
    )}
    <div className="flex justify-end space-x-2 mt-4">
      <button onClick={() => onEdit(blog)} className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        <FiEdit2 className="mr-1" /> Edit
      </button>
      <button onClick={() => onDelete(blog._id)} className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
        <FiTrash2 className="mr-1" /> Delete
      </button>
    </div>
  </div>
);

export default DraftBlogCard;
