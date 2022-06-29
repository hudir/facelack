import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import About from "./About";
import Members from "./Members";

export default function Info({ channel, joined }) {
  return (
    <div>
      <h2>{channel.channelName}</h2>
      <nav>
        <Link to={'../'+channel.channelName + "/about"}>About</Link>
        <Link to={'../'+channel.channelName + "/members"}>Members</Link>
      </nav>
      <Routes>
        <Route path={"/about"} element={<About channel={channel} joined={joined}/>} />
        <Route path={"/members"} element={<Members channel={channel} joined={joined}/>} />
      </Routes>
    </div>
  );
}
