import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../store/Context";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function Header() {
  const { state, dispatch } = useContext(Context);
  const [logOut, setLogOut] = useState(false);
  const navi = useNavigate();

  const logOutHandle = () => {
    dispatch({
      type: "LOGOUT",
    });
    navi("/");
  };
  return (
    <HeaderContainer>
      <HeaderLeft>
      <SidebarHeader>
            <SidebarInfo>
                <h2>FACELACK</h2>
                <h3>
                    <FiberManualRecordIcon/>
                    {state.currentUser.userName}
                </h3>
            </SidebarInfo>
            <CreateIcon/>
        </SidebarHeader>
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search" />
      </HeaderSearch>
      <HeaderRight>
        <HeaderAvatar onClick={() => setLogOut((pre) => !pre)}>
          {state.currentUser.userName.slice(0, 1).toUpperCase()}
        </HeaderAvatar>
        {logOut && (
          <Dropdown>
            <li>
              <Button variant="outlined" color="error" onClick={logOutHandle}>
                Logout
              </Button>
            </li>
          </Dropdown>
        )}
      </HeaderRight>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
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

const Dropdown = styled.ul`
  position: absolute;
  right: 70px;
  list-style-type: none;
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
`

const SidebarInfo = styled.div`
    flex: 1;

    > h2 {
        font-size:15px;
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
`
