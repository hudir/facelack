import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import About from "./About";
import Members from "./Members";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Context } from "../../../../store/Context";



const style = {
  position: "fixed",
  top: "20%",
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
    channel.members.some(id=>id===state.currentUser.userID) ? setJoined(true) : setJoined(false)
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
          <h2># {channel.channelName}</h2>
          <nav>
            <Link to={"../" + channel.channelName + "/about"}>About</Link>
            <Link to={"../" + channel.channelName + "/members"}>Members</Link>
          </nav>
          <hr />
          <Routes>
            <Route
              path={"/about"}
              element={<About channel={channel} joined={joined} />}
            />
            <Route
              path={"/members"}
              element={<Members channel={channel} joined={joined} />}
            />
          </Routes>
        </Box>
      </Modal>
    </div>
  );
}

// const InfoOutContainer = styled.div`
//    position: absolute;
//   height: 100%;
//   width: 100%;
//   background-color: gray;
//   color: black;
//   z-index: 1;
//   opacity: 0.7;
// `
// const InfoContainer = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `