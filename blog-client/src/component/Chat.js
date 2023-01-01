import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Input,
  TextField,
  Divider,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ScrollToBottom from "react-scroll-to-bottom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import chatService from "../service/chatService";
import UserList from "./UserList";

//const socket = io.connect("http://localhost:5000");

let socket = null;

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: 0,
    //marginLeft: theme.spacing(25),
  },
  input: {
    width: "300px",
  },
  msg_sent: {
    position: "absolute",
    right: 0,
  },
  msg_reciever: {
    position: "absolute",
    left: 0,
  },
}));

const Chat = () => {
  const result = useSelector((state) => state);
  const classes = useStyles();
  const [messageList, setMessageList] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);
  const [showChat, setShowChat] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [reciever, setReciever] = useState("");
  const [messageData, setMessageData] = useState({
    message: "",
    reciever: "",
    sender: "",
  });

  const getSavedMsg = async (reciever) => {
    const res = await chatService.getMessages(result.user.state.id, reciever);
    // console.log(res.data.response);
    setMessageList(res.data.response);
    //console.log(messageList);
  };

  // const joinRoom = () => {
  //   socket.emit("join", result.user.state.id);
  // };

  const sendMsg = (e) => {
    e.preventDefault();
    //setMessageData({ ...messageData, sender: 2 });
    socket.emit("sendMsg", messageData);
    setMessageList((msg) => [...msg, messageData]);
    setMessageData({ ...messageData, message: "" });
  };

  // const recievedMsg = () => {
  //   socket.on("messageRecieved");
  // };
  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("join", result.user.state.id);
    socket.on("messageRecieved", (data) => {
      //  console.log(data.sender, messageData.reciever);
      if (data.sender == messageData.reciever) {
        setMessageList((msg) => [...msg, data]);
      }
    });
    socket.on("online", (user) => {
      //console.log(user);
      setOnlineUser(user);
    });

    // return () => {
    //   // User leaves room
    //   socket.disconnect();

    //   socket.off();
    //   // console.log("use effect off");
    // };
  }, [messageData]);

  // useEffect(() => {

  //   console.log("use effect start");
  // }, [socket, messageData]);

  // useEffect(() => {
  //   return () => {
  //     // User leaves room
  //     socket.disconnect();

  //     socket.off();
  //     console.log("use effect off");
  //   };
  // }, [socket]);

  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item sm={6} xs={12} md={9}>
        {showChat ? (
          <div>
            <Card>
              <CardContent
                style={{
                  height: "420px",
                  // backgroundColor: "red",
                  overflow: "auto",
                }}
              >
                {messageList.map((val, idx) => {
                  return (
                    <>
                      <Grid
                        key={idx}
                        style={{
                          marginTop: "10px",
                        }}
                        align={
                          result.user.state.id == val.reciever
                            ? "right"
                            : "left"
                        }
                      >
                        <Grid style={{ maxWidth: "100px" }}>
                          {/* <Grid
                        className={
                          result.user.state.id == val.reciever
                            ? classes.msg_sent
                            : classes.msg_reciever
                        }
                      > */}
                          <Typography
                            style={{
                              backgroundColor:
                                result.user.state.id == val.reciever
                                  ? "#B6EFEA"
                                  : "#B5EA65",
                              padding: "10px",
                            }}
                            // align={
                            //   result.user.state.id == val.reciever
                            //     ? "right"
                            //     : "left"
                            // }
                          >
                            {val.message}
                          </Typography>
                          {/* </Grid> */}
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
              </CardContent>
              <Divider />
              <form onSubmit={sendMsg}>
                <CardActions style={{ position: "sticky", bottom: 0 }}>
                  <TextField
                    type="text"
                    fullWidth
                    // className={classes.input}
                    value={messageData.message}
                    onChange={(e) =>
                      setMessageData({
                        ...messageData,
                        message: e.target.value,
                        sender: result.user.state.id,
                      })
                    }
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </CardActions>
              </form>
            </Card>
          </div>
        ) : null}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Card>
          <CardContent>
            <UserList
              onlineUser={onlineUser}
              messageData={messageData}
              setMessageData={setMessageData}
              showChat={showChat}
              setShowChat={setShowChat}
              getSavedMsg={getSavedMsg}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Chat;
