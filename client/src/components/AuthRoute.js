import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

const AuthRoute = (props) => {
    const [user, setUser] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const validateJWT = async () => {
            const response = await fetch("/profile", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const jsonResponse = await response.json();
            // Means our JWT is valid!
            if (jsonResponse.userProfile) {
                setUser(true);
            }
            else {
                localStorage.removeItem('token');
                history.push("/");
            }
        }
        validateJWT();
    }, [history])

    return (
        <>
          {!user ? <h1>Loading...</h1> : props.children }
        </>
    )
}



export default withRouter(AuthRoute);