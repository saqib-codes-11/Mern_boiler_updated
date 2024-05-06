import { React, useState, useEffect } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

let socket;

const Room = (props) => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setusername] = useState(props.username)

  useEffect(() => {
    socket = io('localhost:5000');
    socket.on('recieveMessage', (msg) => {
      setMessageList((messageList) => [...messageList, msg]);
    })
    joinEmit();
  }, [])

  const joinEmit = () => {
    socket.emit('joinRoom', "test");
  }

  const sendMessage = () => {
    socket.emit("sendMessage", message)
  }

  return (
    <>
      <div style={cardStyle}>
        <div style={roomStyle}>
          <Paper elevation={10} style={paperStyle}>
          <ul style={{overflowY: "auto"}}>
              {messageList.map(message => {
                return (<li key={uuidv4()} style={{listStyleType: "none"}}>{message}</li>)
              })}
            </ul>
            <div style={chatStyle}>
              <TextField id="outlined-basic" label="Send a Message"  variant="outlined" onChange={(e) => setMessage(e.target.value)} value={message} style={{width: "80%"}}/>
              <Button variant="contained" color="primary" style={{height: "100%", width: "20%", outline: "none", borderRadius: 0}} onClick={() => sendMessage()}>
                Chat
              </Button>
            </div>
          </Paper>
          <span/>
          <Paper elevation={10}>
            
          </Paper>
          <span/>
          <Paper elevation={10}></Paper>
        </div>
      </div>
    </>
  );
};

const cardStyle = {
  position: "absolute",
  marginTop: 80,
  marginLeft: "2%",
  width: "98%",
  height: "91%",
};

const roomStyle = {
  height: "96%",
  display: "grid",
  gridTemplateColumns: "31% 3% 31% 3% 31%",
  gridTemplateRows: "100%",
}

const paperStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end"
}

const chatStyle = {
  width: "100%",
}

export default Room;
