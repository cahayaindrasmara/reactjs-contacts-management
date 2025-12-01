import { useLocalStorage } from "react-use";
import { Navigate } from "react-router";

export default function ValidationUser() {
  const [token, _] = useLocalStorage("token", "");

  if (token) {
    return <Navigate to="/dashboard/contacts" replace></Navigate>
  } else {
    return <Navigate to="/login" replace></Navigate>
  }
}
