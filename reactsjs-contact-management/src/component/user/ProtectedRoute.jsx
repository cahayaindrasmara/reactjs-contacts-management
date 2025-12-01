import { Navigate } from "react-router";
import { useLocalStorage } from "react-use";

export default function ProtectedRoute({children}) {
    const [token, _] = useLocalStorage("token", "");

    if (!token) {
        return <Navigate to="/login" replace></Navigate>
    }

    return children
}