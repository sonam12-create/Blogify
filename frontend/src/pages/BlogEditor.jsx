import { useEffect, useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { toast } from "react-hot-toast";

export default function CreateBlogPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [blogId, setBlogId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const isEditMode = Boolean(id);

  const { backendUrl, token, navigate } = useContext(BlogContext);

  const [debouncedTitle] = useDebounce(title, 5000);
  const [debouncedContent] = useDebounce(content, 5000);
  const [debouncedTags] = useDebounce(tags, 5000);

  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`${backendUrl}/api/blogs/user-blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const blog = res.data;
          setTitle(blog.title);
          setContent(blog.content);
          setTags(blog.tags.join(", "));
          setImagePreview(blog.mediaUrl);
          setBlogId(blog._id);
        })
        .catch((err) => {
          console.error("Failed to fetch blog for editing:", err);
        });
    }
  }, [id, isEditMode]);

  useEffect(() => {
    if (debouncedTitle || debouncedContent || debouncedTags) {
      handleSaveDraft();
    }
  }, [debouncedTitle, debouncedContent, debouncedTags]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const formData = new FormData();
      formData.append("title", debouncedTitle);
      formData.append("content", debouncedContent);
      formData.append(
        "tags",
        debouncedTags.split(",").map((tag) => tag.trim())
      );
      formData.append("status", "draft");
      if (image) formData.append("image", image);
      if (blogId) formData.append("blogId", blogId);

      const res = await axios.post(
        `${backendUrl}/api/blogs/save-draft`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setBlogId(res.data.blog._id);
      }
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const finalHandleSaveDraft = async () => {
    await handleSaveDraft();
    setBlogId(null);
    navigate("/");
    toast.success("Draft saved successfully!");
  };

  const handlePublish = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append(
        "tags",
        tags.split(",").map((tag) => tag.trim())
      );
      if (image) formData.append("image", image);
      if (blogId) formData.append("blogId", blogId);

      const res = await axios.post(
        `${backendUrl}/api/blogs/publish`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>

      {/* Title Input */}
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your blog title"
        />
      </div>

      {/* Content Input */}
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 min-h-[200px]"
          placeholder="Write your blog content here..."
        />
      </div>

      {/* Tags Input */}
      <div className="mb-6">
        <label htmlFor="tags" className="block text-sm font-medium mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., technology, programming, web"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Featured Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-xs max-h-40 object-cover rounded-md border border-gray-200"
            />
          </div>
        )}
      </div>

      {/*  Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={finalHandleSaveDraft}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500"
        >
          Save as Draft
        </button>
        <button
          onClick={handlePublish}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
