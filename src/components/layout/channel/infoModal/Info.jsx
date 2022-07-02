import React, { useContext, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../../../store/Context";
import About from "./About";
import Members from "./Members";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";


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

export default function Info({ channel, joined, open, setOpen }) {

  const {currentChannel} =useContext(Context)
  

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
          <h2># {currentChannel.channelName}</h2>
          <nav>
            <Link to={"../" + currentChannel.channelName + "/about"}>About</Link>
            <Link to={"../" + currentChannel.channelName + "/members"}>Members</Link>
          </nav>
          <hr />
          <Routes>
            <Route
              path={"/about"}
              element={<About channel={currentChannel} joined={currentChannel.joined} />}
            />
            <Route
              path={"/members"}
              element={<Members channel={currentChannel} joined={currentChannel.joined} />}
            />
          </Routes>
        </Box>
      </Modal>
    </div>
  );
}

const InfoOutContainer = styled.div`
   position: absolute;
  height: 100%;
  width: 100%;
  background-color: gray;
  color: black;
  z-index: 1;
  opacity: 0.7;
`
const InfoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`