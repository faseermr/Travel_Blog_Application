import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import userService from "../service/userService";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const UserList = ({
  onlineUser,
  messageData,
  setMessageData,
  showChat,
  setShowChat,
  getSavedMsg,
}) => {
  const [userList, setUserList] = useState([]);
  const result = useSelector((state) => state.user.state.id);

  const getAllUsers = async () => {
    const res = await userService.getAllUsers();
    // console.log(res.data);
    setUserList(res.data);
  };

  useEffect(() => {
    getAllUsers();
    //   console.log(onlineUser);
  }, []);

  return (
    <Grid>
      {userList.map((user, idx) => {
        return (
          <Grid
            key={idx}
            container
            justifyContent="space-between"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              setMessageData({ ...messageData, reciever: user.id });
              setShowChat(!showChat);
              getSavedMsg(user.id);
            }}
          >
            <Typography>{result != user.id ? user.username : null}</Typography>
            {result != user.id ? (
              <FiberManualRecordIcon
                style={{
                  color: onlineUser.includes(user.id) ? "green" : "red",
                }}
              />
            ) : null}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UserList;
