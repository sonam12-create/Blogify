import React from "react";

const UserInfo = ({ user }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-6">User Information</h2>
    <div className="space-y-4">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold">Basic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{user?.name || "Not available"}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{user?.email || "Not available"}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UserInfo;
