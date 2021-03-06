import React, { useContext, useState } from "react";
import { Context } from "../../../../store/Context";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Moment from 'moment';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';


export default function AddPeople({ channel, open, handleClose }) {
  const { state, dispatch } = useContext(Context);

  const [input, setInput] = useState('')

  const [info, setInfo] = useState(null);

  const addPeopleHandler = (e) => {
    e.preventDefault();
    if (!state.users.some((el) => input === el.userName)) {
      setInfo("User does not exist");
    } else if (
      channel.members.some((id) => input === id.slice(2))
    ) {
      setInfo(`${input} already joined this channel`);
    } else {
      dispatch({
        type: "ADD_USER",
        name: input,
        channelName: channel.channelName,
      });
      const time =  Moment().format("MMMM Do YYYY, h:mm:ss a");

      const userID = state.users.filter(x=>x.userName===input).map(y=>y.userID)[0]
      dispatch({
        type: "POST",
        postObj: {
          user: userID,
          time: time,
          body: `${input} has been added to ${channel.channelName} by ${state.currentUser.userName}`,
          reply: [],
          channelName: channel.channelName,
          systemInfo:true
        },
      });
    }
    console.log(input);
  };

  return (
    <form>
      <Dialog open={open} onClose={handleClose}>
        {channel.private && <p>This is Private Channel</p>}
        <DialogTitle>Add people</DialogTitle>
        <DialogContent>
          <DialogContentText>{channel.private ? (<RiGitRepositoryPrivateFill />) : '#'} {channel.channelName}</DialogContentText>
          <TextField
          onChange={(e) =>setInput(e.target.value)}
            name="people"
            autoFocus
            margin="dense"
            id="username"
            label="Enter a name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <div> {info && <p>{info}</p>}</div>
        <DialogActions>
          <div onClick={addPeopleHandler}>
            <Button onClick={handleClose}>Add</Button>
          </div>
        </DialogActions>
      </Dialog>
    </form>
  );
}

//   /* <form onSubmit={addPeopleHandler}>
//   <h2>Add People to {channel.channelName}</h2>
//   {channel.private && <p>This is Private Channel</p>}
//   <input type="text" name="people" />
//   {info && <p>{info}</p>}
//   <button type="submit">ADD</button>
// </form> */
//