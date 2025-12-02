import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import { useState } from "react";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState([]);
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users?search=${searchText}`);
      return result.data;
    },
  });

  const handleMakeUser = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res);

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Success",
          text: "make as admin",
          icon: "success",
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res);

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Success",
          text: "make as user",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      management({users.length})
      <div className="overflow-x-auto">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search"
          />
        </label>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Role</th>
              <th>Payment</th>

              <th>Admin Actions</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>

                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td
                  className={`${
                    user.role === "admin" ? "text-red-500" : "text-green-600"
                  } font-bold`}
                >
                  {user.role}
                </td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeUser(user)}
                      className="btn"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
