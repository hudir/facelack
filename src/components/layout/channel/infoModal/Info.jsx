import React, { useContext, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../../../store/Context";
import About from "./About";
import Members from "./Members";

export default function Info() {
  const {currentChannel} =useContext(Context)
  console.log(currentChannel);
  
  return (
    <InfoOutContainer>

      {( <InfoContainer>
      <h2>{currentChannel.channelName}</h2>
      <nav>
        <Link to={'../'+currentChannel.channelName + "/about"}>About</Link>
        <Link to={'../'+currentChannel.channelName + "/members"}>Members</Link>
      </nav>
      <Routes>
        <Route path={"/about"} element={<About channel={currentChannel} joined={currentChannel.joined}/>} />
        <Route path={"/members"} element={<Members channel={currentChannel} joined={currentChannel.joined}/>} />
      </Routes>
    </InfoContainer>)}

    </InfoOutContainer> 
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