# 📝 Blog Platform

A full-stack blog platform where users can write, save drafts, publish posts, and update existing blogs. Built with modern frontend and backend technologies and includes JWT-based authentication.

---

## 🚀 Features

- Save as Draft ✍  
- Publish Blog 📰  
- Auto-Save Draft (every 30s or after 5s of inactivity) 💾  
- Edit/Update existing posts 🔄  
- View Published and Draft blogs separately 🔍  
- Secure login with JWT authentication 🔐  

---

## 🛠 Tech Stack

### Frontend
- *React*
- *Tailwind CSS*
- *Axios*

### Backend
- *Node.js*
- *Express.js*
- *JWT (jsonwebtoken)*
- *Cloudinary (for image uploads)*
- *dotenv* for environment variable management

---

## 🧪 Prerequisites

- Node.js installed (v18.x or later)
- MongoDB database URI
- Cloudinary account (for image uploads)
- .env file with the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret