import React, { useContext, useState } from "react";
import { Context } from "../../../store/Context";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import  { db }  from '../database/firebase'

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CreateChannel() {
  const { state, dispatch, setShowModal } = useContext(Context);

  const [exists, setExists] = useState(false);

  const [newChannel, setNewChannel] = useState("");

  const [description, setDescription] = useState("");

  let navigate = useNavigate();

  const createNewChannelHandler = (e) => {
    e.preventDefault();

    const time = JSON.stringify(new Date());
    const createBy = { time: time, user: state.currentUser.userName };

    const newChannelObj = {
      channelName: newChannel,
      description: description,
      members: [state.currentUser.userID],
      messages: [],
      private: e.target.private.checked,
      createBy: createBy,
    };

    //check if channel already exists
    if (
      state.channels.some((el) => el.channelName === newChannelObj.channelName)
    )
      setExists(true);
    else {
      dispatch({
        type: "CREATE_CHANNEL",
        newChannel: newChannelObj,
      });
      setShowModal(false);
      navigate(newChannelObj.channelName);
    }
  };

  return (
    <Dialog open={() => setShowModal(true)} onClose={() => setShowModal(false)}>
      <DialogTitle> Create a channel</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Channels are where your team communicates. They´re best when organized
          around a topic — #marketing, for example.
        </DialogContentText>
        <form onSubmit={createNewChannelHandler}>
          <MessageFieldContainer>
            <TextField
              label="Size"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
              value={newChannel}
              onChange={(e) => setNewChannel(e.target.value)}
            />
            {/* <MessageField
                id="outlined-multiline"
                label="Channel Name"
               
                rows={1}
                value={newChannel}
                placeholder="Please enter channel name"
                onChange={(e)=> setNewChannel(e.target.value)}
              /> */}
          </MessageFieldContainer>
          {exists && <p>The Channel already exists, please try another</p>}

          <MessageFieldContainer>
            <MessageField
              id="outlined-multiline-static"
              label="Description"
              value={description}
              multiline
              rows={3}
              placeholder="Description of the channel"
              onChange={(e) => setDescription(e.target.value)}
            />
          </MessageFieldContainer>

          <FormControlLabel
            control={<Checkbox />}
            label="Make private"
            name="private"
          />

          <small>
            When a channel is set to private, it can only be viewed or joined by
            invitation.
          </small>

          <DialogActions>
            <Button type="submit">Create</Button>
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const CreateChannelContainer = styled.div`
  /* height: 60%;
  width: 60%;
  left: 25%;
  top: 25%;
  position: absolute;
  background: linear-gradient(
    180deg,
    var(--slack-color) 0%,
    #45023bec 50%,
    var(--slack-color) 100%
  );

  form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 8;
  }
  form * {
    width: 100%;
    margin-bottom: 10px;
    font-size: 1rem;
    color: #ff9900;
  }
  form input {
    color: black;
  }
  .glass {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
  } */
`;

const InputContainer = styled.div`
  /* display: flex;
  justify-content: center;
  width: 80%;
  margin: 10px auto;
  padding: 10px; */
`;

const TextFieldInput = styled(TextField)`
  /* width: 100%; */
`;
const MessageFieldContainer = styled.div`
  padding: 20px;
  /* width: 80%;
  margin: 0 auto; */
`;

const MessageField = styled(TextField)`
  /* width: 100%; */
`;
