import { useEffectOnce, useLocalStorage } from "react-use"
import { userLogout } from "../../lib/api/UserApi"
import { alertError } from "../../lib/alert";
import { useNavigate } from "react-router";

export default function UserLogout() {

    const [token, setToken] = useLocalStorage("token", "")
    const navigate = useNavigate();

    async function handleLogout() {
        const respone = await userLogout(token);
        const responseBody = respone.json();
        console.log(responseBody)

        if (respone.status === 200) {
            setToken("")
            navigate ({
                pathname: "/login"
            })
        } else {
            alertError(responseBody.errors)
        }
    }

    useEffectOnce(() => {
        handleLogout()
         .then("User Logged out successfully")
    })

    return (
        <>
        </>
    )
}