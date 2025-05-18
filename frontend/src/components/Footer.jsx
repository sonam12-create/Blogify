// components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-sm">
            This is a blog platform where you can write, save drafts, and share
            your ideas with the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm space-y-1">
            <li>
              <a href="/" className="hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="/create" className="hover:text-blue-500">
                Write Blog
              </a>
            </li>
            <li>
              <a href="/my-blogs" className="hover:text-blue-500">
                My Blogs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: example@blog.com</p>
          <p className="text-sm">Phone: +91 12345 67890</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t mt-4 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Blog Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
