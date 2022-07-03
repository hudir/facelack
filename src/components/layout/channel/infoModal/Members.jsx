import React, { useState } from "react";
import AddPeople from "./AddPeople";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function Members({ channel, joined }) {
  const [addPeople, setAddPeople] = useState(false);

  const [dense, setDense] = useState(false);

  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setAddPeople(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <div>
      {joined && (
        <div onClick={handleClickOpen}>
          <ListItemButton>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add people" />
          </ListItemButton>
        </div>
      )}
      <Grid item xs={12} md={6}>
        <Demo>
          {channel && (
            <List dense={dense}>
              {channel.members.map((el, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>{el.slice(2, 3).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  {el.slice(2)}
                </ListItem>
              ))}
            </List>
          )}
        </Demo>
      </Grid>

      {addPeople && (
        <AddPeople channel={channel} open={open} handleClose={handleClose} />
      )}
    </div>
  );
}
