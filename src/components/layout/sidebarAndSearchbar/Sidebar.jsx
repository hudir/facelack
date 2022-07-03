import React, { useContext, useState } from "react";
import { Context } from "../../../store/Context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
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
import BasicMenu from "./BasicMenu";

export default function Sidebar() {
  const { state, currentChannel } = useContext(Context);

  const [showChannels, setShowChannels] = useState(false);

  const [showOptions, setShowOptions] = useState(false);

  // For Basic Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <SidebarContainer>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved Items" />
      {showOptions && (
        <>
          <Link to="browseAllChannels">
            <SidebarOption
              Icon={BookmarkBorderIcon}
              title="Channel Browser"
              className="link"
            ></SidebarOption>
          </Link>

          <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
          <SidebarOption Icon={AppsIcon} title="Apps" />
          <SidebarOption Icon={FileCopyIcon} title="File Browser" />
        </>
      )}

      <div onClick={() => setShowOptions((pre) => !pre)}>
        <SidebarOption
          Icon={showOptions ? ExpandLessIcon : ExpandMoreIcon}
          title={showOptions ? "Show less" : "Show more"}
        />
      </div>

      <hr />

      <div onClick={() => setShowChannels((pre) => !pre)}>
        <SidebarOption
          Icon={showChannels ? ExpandMoreIcon : ExpandLessIcon}
          title="Channels"
        />
      </div>

      {showChannels
        ? state.currentUserChannels && (
            <UlContainer>
              {state.currentUserChannels.map((el, i) => (
                <Link
                  to={`${el.channelName}`}
                  key={i}
                  style={
                    currentChannel
                      ? el.channelName === currentChannel.channelName
                        ? { color: "yellow" }
                        : null
                      : null
                  }
                >
                  <SidebarOption key={i} title={el.channelName}>
                    {" "}
                  </SidebarOption>
                </Link>
              ))}
            </UlContainer>
          )
        : null}

      <div onClick={handleClick}>
        <SidebarOption Icon={AddIcon} title="Add Channel"></SidebarOption>
      </div>
      {open && (
        <BasicMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
      )}
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
  padding-top: 90px;
  position: relative;
  z-index: 4;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const UlContainer = styled.ul`
  a {
    color: white;
    text-decoration: none;
  }
`;
