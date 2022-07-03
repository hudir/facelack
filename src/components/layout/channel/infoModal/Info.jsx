import React, { useContext, useEffect, useState } from "react";
import InfoNav from './InfoNav'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Context } from "../../../../store/Context";
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';



const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "7px",
  boxShadow: 24,
  p: 4,
};

export default function Info({ channel, open, setOpen }) {
  const [joined, setJoined] = useState(false);
  const {state} = useContext(Context)
  // console.log(state);
  
  useEffect(()=>{
    channel.members.some(id=>id===state.currentUser.userID) ? setJoined(true) : setJoined(false);
    
  }, [])
  
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>{channel.private ? (<RiGitRepositoryPrivateFill />) : '#'} {channel.channelName}</h2>
          <nav>
            <InfoNav channel={channel} joined={joined} />
          </nav>
        </Box>
      </Modal>
    </div>
  );
}
