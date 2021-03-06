import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../store/Context";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import NewMessage from "./NewMessage";
import { Dropdown, Text } from "@nextui-org/react";

export default function Header() {
  const { state, dispatch, setCurrentChannel } = useContext(Context);
  const [logOut, setLogOut] = useState(false);
  const [newMessage, setNewMessage] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setNewMessage((pre) => !pre);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navi = useNavigate();

  const logOutHandle = () => {
    dispatch({
      type: "LOGOUT",
    });
    navi("/");
    setCurrentChannel(null);
  };
  return (
    <HeaderContainer>
      <HeaderLeft>
        <SidebarHeader>
          <SidebarInfo>
            <h2>FACELACK</h2>
            <h3>
              <FiberManualRecordIcon />
              {state.currentUser.userName}
            </h3>
          </SidebarInfo>
          <NewMessageIcon onClick={handleClickOpen} />
        </SidebarHeader>
        {newMessage && (
          <NewMessage
            handleClose={handleClose}
            handleClickOpen={handleClickOpen}
            open={open}
          />
        )}
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search" />
      </HeaderSearch>
      <HeaderRight>
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
            <HeaderAvatar
              onClick={() => setLogOut((pre) => !pre)}
              style={{ backgroundColor: state.currentUser.color }}
            >
              {state.currentUser.userName.slice(0, 1).toUpperCase()}
            </HeaderAvatar>
          </Dropdown.Trigger>
          <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }} textValue>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as {state.currentUser.userName}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider >
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item
            textValue
              key="logout"
              color="error"
              withDivider
              onClick={logOutHandle}
            >
              <Button onClick={logOutHandle}>Log Out</Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </HeaderRight>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 5;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;
const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f42;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  margin-left: auto;
  margin-right: 20px;

  :hover {
    opacity: 0.8;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
    padding: 8px;
    color: #49274b;
    margin-left: 50px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    font-size: 13px;
    font-weight: 400;
    align-items: center;
    display: flex;
  }

  > h3 > .MuiSvgIcon-root {
    color: green;
    font-size: 14px;
    margin-right: 2px;
    margin-top: 1px;
  }
`;

const NewMessageIcon = styled(CreateIcon)`
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
