import * as React from "react";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import SidebarOption from "./SidebarOption";
import { Context } from "../../../store/Context";
import styled from "styled-components";

export default function BasicMenu({ anchorEl, open, handleClose }) {
  const { setShowModal } = React.useContext(Context);
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <CreateButton onClick={handleClose}>
          {" "}
          <Link to="browseAllChannels" className="browser">
            {" "}
            <SidebarOption title="Channel Browser"></SidebarOption>
          </Link>
        </CreateButton>
        <CreateButton onClick={handleClose}>
          {" "}
          <div onClick={(e) => setShowModal((pre) => !pre)} className="create">
            <SidebarOption title="Create new channel"></SidebarOption>
          </div>
        </CreateButton>
      </Menu>
    </div>
  );
}

const CreateButton = styled.div`
  /* background-color: lightgray; */
  color: black;
  text-decoration: "none";
  :hover {
      background-color:blue;
  }
  .create,
  .browser {
    color: black;
    text-decoration: none;
  }

  .browser:hover,
  .create:hover {
    color: white;
  }
`;