import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Card, CardContent, makeStyles, Button, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      width: "500px",
      height: "350px"
    }
})

const Login = () => {
  const history = useHistory();
  const [isLogged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const checkForUser = async () => {
        const response = await fetch("/profile", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const jsonResponse = await response.json();
        // If already logged in:
        if (jsonResponse.userProfile) {
            history.push("/profile")
        }
        else {
          setLogged(true);
        }
    }
    checkForUser();
    }, [history])

  const loginAccount = async () => {
      const response = await fetch("/users/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            'Content-Type': 'application/json'
        },
      })
      const jsonResponse = await response.json()
  
      // If the login was invalid
      if (!jsonResponse.token) {
          console.log(jsonResponse.message);
      }
      else {
          localStorage.setItem('token', jsonResponse.token)
          history.push('/profile')
      }
  }

  return (
    <div style={cardStyle}>
      <Card className={classes.root}>
        {!isLogged ? <h3 style={{textAlign: "center", marginTop: "30px"}}>Loading...</h3> : 
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                padding: "15px",
              }}
            >
              <h3 style={{ textAlign: "center" }}>Login</h3>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{marginBottom: 12}}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                color="primary"
                style={{ marginTop: 10, outline: "none" }}
                onClick={loginAccount}
              >
                Login
              </Button>
            </div>
          </CardContent>
        }
      </Card>
    </div>
  );
};

const cardStyle = {
    position: "absolute",
    left: "50%",
    top: "60%",
    width: "500px",
    height: "350px",
    marginTop: "-250px",
    marginLeft: "-250px" 
}


export default Login;