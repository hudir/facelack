import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../store/Context";
import styled from "styled-components";
import CreateChannel from "../channel/CreateChannel";
import DoneIcon from "@mui/icons-material/Done";

export default function BrowseAllChannels() {
  const { state, dispatch, showModal, setShowModal } = useContext(Context);

  const [channelsToRender, setChannelsToRender] = useState(null);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const publicChannel = state.channels.filter(
      (el) =>
        el.private === false ||
        el.members.some((id) => id === state.currentUser.userID)
    );
    setChannelsToRender(publicChannel);
  }, [state.channels, state.currentUserChannels]);

  const leaveChannel = (channelName, notPublic) => {
    dispatch({
      type: "LEAVE_CHANNEL",
      name: channelName,
      private: notPublic,
    });
  };

  const navigate = useNavigate();

  const joinChannel = (channelName) => {
    dispatch({
      type: "JOIN_CHANNEL",
      name: channelName,
    });
    navigate("../" + channelName);
  };

  return (
    <BrowseChannelsContainer>
      <BrowserHeader>
        <h2>All channels</h2>
        <button onClick={() => setShowModal((pre) => !pre)}>
          Create Channel
        </button>
      </BrowserHeader>

      <hr />
      <AmountChannels>{state.channels.length - 1} channels</AmountChannels>
      {channelsToRender &&
        channelsToRender.map((el, i) => (
          <ChannelContainer key={i} >
            <Link to={`../${el.channelName}`}>
              <h3>#{el.channelName}</h3>
            </Link>
            <ChannelInfo>
              <div>
                {el.members.some((x) => x === state.currentUser.userID) ? (
                  <span className="joined">
                    <DoneIcon /> Joined :
                  </span>
                ) : null}
                <span className="members">
                  {el.members.length > 1 ? (
                    <span>{el.members.length} members</span>
                  ) : (
                    <span>{el.members.length} member</span>
                  )}
                </span>

                <span className="description">: {el.description}</span>
              </div>
            
                  {el.members.some((x) => x === state.currentUser.userID) ? (
                    <button
                      onClick={(e) => leaveChannel(el.channelName, el.private)}
                    >
                      Leave Channel
                    </button>
                  ) : (
                    <button onClick={(e) => joinChannel(el.channelName)}>
                      Join Channel
                    </button>
                  )}
             
            </ChannelInfo>
          </ChannelContainer>
        ))}
    </BrowseChannelsContainer>
  );
}

const BrowseChannelsContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 100px;
`;

const BrowserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  button {
    border-radius: 2px;
    background-color: #ffffff;
  }
`;

const ChannelContainer = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e4e4e4;
  width: 95%;
  margin: 0 auto;
  height: fit-content;
  :hover {
    background-color: #a3a3a339;
  }

  a {
    color: black;
    text-decoration: none;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  height: 25px;
  align-items: center;
  justify-content: space-between;
  .joined {
    color: green;
    font-size: 12px;

    > .MuiSvgIcon-root {
      font-size: 15px;
    }
  }

  .members,
  .description {
    color: #686868;
    font-size: 15px;
  }
`;

const AmountChannels = styled.div`
  padding-top: 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e4e4e4;
  width: 95%;
  margin: 0 auto;
`;
