import React, { useContext, useState } from "react";
import { Context } from "../../../../store/Context";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddPeople({ channel, open, handleClose }) {
  const { state, dispatch } = useContext(Context);

  const [info, setInfo] = useState(null);

  const addPeopleHandler = (e) => {
    e.preventDefault();
    if (!state.users.some((el) => e.target.people.value === el.userName)) {
      setInfo("User does not exist");
    } else if (
      channel.members.some((id) => e.target.people.value === id.slice(2))
    ) {
      setInfo(`${e.target.people.value} already joined this channel`);
    } else {
      console.log(111);
      dispatch({
        type: "ADD_USER",
        name: e.target.people.value,
        channelName: channel.channelName,
      });
      const time = new Date().toString(); // FIX TIMESTAMP!!!!!!!!
      // console.log(new Date(time*1000))
      const userID = state.users.filter(x=>x.userName===e.target.people.value).map(y=>y.userID)[0]
      dispatch({
        type: "POST",
        postObj: {
          user: userID,
          time: time,
          body: `${e.target.people.value} has been added to ${channel.channelName} by ${state.currentUser.userName}`,
          reply: [],
          channelName: channel.channelName,
          systemInfo:true
        },
      });
      console.log(111);
    }
    e.target.people.value=''
  };
  return (
    <form>
      <Dialog open={open} onClose={handleClose}>
        {channel.private && <p>This is Private Channel</p>}
        <DialogTitle>Add people</DialogTitle>
        <DialogContent>
          <DialogContentText># {channel.channelName}</DialogContentText>
          <TextField
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
