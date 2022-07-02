import React, { useContext, useState } from "react";
import { Context } from "../../../store/Context";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IOSSwitch } from "./Switch";
import ToggleButton from "@mui/material/ToggleButton";

export default function CreateChannel() {
  const { state, dispatch, setShowModal , showModal} = useContext(Context);

  const [exists, setExists] = useState(false);

  const [newChannel, setNewChannel] = useState("");

  const [description, setDescription] = useState("");

  const [text, setText] = useState(false);

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
    <Dialog open={showModal} onClose={() => setShowModal(false)}>
      <DialogTitle> Create a channel</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Channels are where your team communicates. They´re best when organized
          around a topic — #marketing, for example.
        </DialogContentText>
        <form onSubmit={createNewChannelHandler}>
          <MessageFieldContainer>
            <MessageField
              label="Channel Name"
              id="outlined-size-small"
              size="small"
              value={newChannel}
              onChange={(e) => setNewChannel(e.target.value)}
            />
          </MessageFieldContainer>
          {exists && <p>The Channel already exists, please try another</p>}

          <MessageFieldContainer>
            <MessageField
              id="outlined-multiline-static"
              label="Description"
              value={description}
              multiline
              rows={3}
              placeholder="Add a channel description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </MessageFieldContainer>

          <CheckboxDiv>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} />}
              label="Make private"
              name="private"
              onChange={(e) => setText((pre) => !pre)}
            />
            <small>
              {!text ? (
                "When a channel is set to private, it can only be viewed or joined by invitation."
              ) : (
                <span>
                  <strong>This can’t be undone.</strong> A
                  private channel cannot be made public later on.
                </span>
              )}
            </small>
          </CheckboxDiv>

          <DialogActions>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const CreateChannelContainer = styled(Dialog)`

`;

const CheckboxDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageFieldContainer = styled.div`
  padding: 20px;
`;

const MessageField = styled(TextField)`
  width: 100%;
`;

const DialogTitleContainer = styled(DialogTitle)`
  display: flex;
  justify-content:space-between;
`