import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { Context } from "../../../store/Context";
import styled from "styled-components";

export default function NewMessage({ handleClose, open }) {
  const { state, dispatch } = useContext(Context);

  const [channel, setChannel] = useState('')

  const [message, setMessage] = useState('')


  const handleSubmit = (e) => {
      e.preventDefault();
    //   const time = new Date().toString()

    //   dispatch({
    //       type: "POST",
    //       postObj: {
    //         user: state.currentUser.userID,
    //         time: time,
    //         body: message,
    //         reply: [],
    //         channelName: channel.channelName,
    //       },
    //   })

  }


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send new Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To send a new message, please select user and channel.
            
          </DialogContentText>
          <form onSubmit={handleSubmit}>
          <InputContainer>
            <TextFieldInput
              id="outlined-select-currency"
              select
              label="Channel"
              placeholder="Select channel"
              value={channel}
              onChange={(e)=>setChannel(e.target.value)}
            >
              {state.currentUserChannels.map((el, i) => (
                <MenuItem key={i} value={el.channelName}>
                  {el.channelName}
                </MenuItem>
              ))}
            </TextFieldInput>
          </InputContainer>
          <MessageFieldContainer>
            <MessageField
              id="outlined-multiline-static"
              label="Message"
              multiline
              rows={3}
              placeholder="Write here your message"
              onChange={(e)=>setMessage(e.target.value)}
            />
          </MessageFieldContainer>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button  type='submit 'onClick={handleClose}>Send Message</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 10px auto;
  padding: 10px;
`;

const TextFieldInput = styled(TextField)`
  width: 100%;
`;
const MessageFieldContainer = styled.div`
  width: 80%;
  margin: 0 auto;

`;

const MessageField = styled(TextField)`
    width: 100%;
`
