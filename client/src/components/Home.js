import { useState } from "react"

import { Card, CardContent, makeStyles, Button, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      width: "500px",
      height: "350px"
    }
})

const Home = () => {
  const [roomCode, setRoomCode] = useState("")
  const [name, setName] = useState("")
  const classes = useStyles();

  return (
    <div style={cardStyle}>
      <Card className={classes.root}>
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: "15px",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Welcome</h3>
            <TextField
              label="Enter Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              style={{marginBottom: 12}}
            />
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              color="primary"
              style={{ marginTop: 10, outline: "none" }}
            >
              Join Room
            </Button>
            <Button
              color="secondary"
              style={{ marginTop: 50, outline: "none" }}
            >
              <Link to="/room" style={{color: "red"}}>
                Create New Room
              </Link>
            </Button>
          </div>
        </CardContent>
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

export default Home;
