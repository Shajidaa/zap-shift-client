import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useRole from "../../Hooks/useRole";

const PrivateAdminRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return (
      <>
        <p>loading-----------------</p>
      </>
    );
  }
  if (role.role !== "admin") {
    return (
      <>
        <div> Forbidden</div>
      </>
    );
  }
  return children;
};

export default PrivateAdminRoute;
