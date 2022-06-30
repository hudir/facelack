import React, { useContext, useState } from "react";
import { Context } from "../../../store/Context";
import { Link } from "react-router-dom";
import CreateChannel from "../channel/CreateChannel";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";

import CreateIcon from "@mui/icons-material/Create";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

export default function Sidebar() {
  const { state, showModal, setShowModal } = useContext(Context);

  

  return (
    <SidebarContainer>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File Browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />

      <hr />

      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />

      {state.currentUserChannels && (
        <ul>
          {state.currentUserChannels.map((el, i) => (
            <SidebarOption key={i}>
              <Link to={`${el.channelName}`}>{el.channelName}</Link>
            </SidebarOption>
          ))}
        </ul>
      )}
      <SidebarOption title="Browser Channel">
        {" "}
        <Link to="browseAllChannels"></Link>
      </SidebarOption>
      <SidebarOption>
        <span onClick={(e) => setShowModal((pre) => !pre)}>
          Create new channel
        </span>
      </SidebarOption>

    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  overflow-y: hide;

  > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }
`;
