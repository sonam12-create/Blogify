import React from "react";
import { FiFileText, FiSend, FiUser } from "react-icons/fi";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const buttons = [
    { label: "User Info", icon: <FiUser />, key: "user" },
    { label: "Drafts", icon: <FiFileText />, key: "drafts" },
    { label: "Published", icon: <FiSend />, key: "published" },
  ];

  return (
    <div className="bg-gray-100 w-64 p-4 space-y-6 h-full">
      {buttons.map(({ label, icon, key }) => (
        <button
          key={key}
          onClick={() => setActiveSection(key)}
          className={`w-full text-left p-2 rounded-lg flex items-center ${
            activeSection === key ? "bg-blue-100" : "hover:bg-gray-200"
          }`}
        >
          {icon}
          <span className="ml-2 font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
