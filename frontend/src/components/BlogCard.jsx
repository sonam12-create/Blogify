import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/${blog._id}`);
  };
  return (
    <div
      className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-96"
      onClick={handleClick}
    >
      {/* Image container with fixed height */}
      <div className="w-full h-48 overflow-hidden">
        {blog.mediaUrl && (
          <img
            src={blog.mediaUrl}
            alt="Blog"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content container with fixed height and overflow handling */}
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">
          {blog.title}
        </h2>
        <p className="text-gray-600 line-clamp-3 flex-1">{blog.content}</p>
        <div className="mt-4 text-sm text-gray-500 flex justify-between">
          <span className="capitalize">{blog.authorName}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
