import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users`);
      return result.data;
    },
  });

  const handleMakeUser = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
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
    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
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
