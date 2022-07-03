import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../store/Context";
import styled from "styled-components";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Moment from 'moment';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';


export default function BrowseAllChannels() {
  const { state, dispatch, setShowModal, setCurrentChannel } =
    useContext(Context);

  const [channelsToRender, setChannelsToRender] = useState(null);

  useEffect(() => setCurrentChannel(null), []);

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
    const time = Moment().format('MMMM Do YYYY, h:mm:ss a');
    
      dispatch({
        type: "POST",
        postObj: {
          user: state.currentUser.userID,
          time: time,
          body: `${state.currentUser.userName} left channel ${channelName}`,
          reply: [],
          channelName: channelName,
          systemInfo:true
        },
      });
  };

  const navigate = useNavigate();

  const joinChannel = (channelName) => {
    dispatch({
      type: "JOIN_CHANNEL",
      name: channelName,
    });
    const time = Moment().format('MMMM Do YYYY, h:mm:ss a');

      dispatch({
        type: "POST",
        postObj: {
          user: state.currentUser.userID,
          time: time,
          body: `${state.currentUser.userName} joined channel ${channelName}`,
          reply: [],
          channelName: channelName,
          systemInfo:true
        },
      });
    navigate("../" + channelName);
  };

  return (
    <BrowseChannelsContainer>
      <BrowserHeader>
        <h2>All channels</h2>
        <Button
          variant="outlined"
          color="success"
          onClick={() => setShowModal((pre) => !pre)}
        >
          Create Channel
        </Button>
      </BrowserHeader>

      <hr />
      <AmountChannels>{state.channels.length - 1} channels</AmountChannels>
      {channelsToRender &&
        channelsToRender.map((el, i) => (
          <ChannelContainer key={i}>
            <Link to={`../${el.channelName}`}>
              <h3>{el.private ? (<RiGitRepositoryPrivateFill />) : '#'} {el.channelName}</h3>
            </Link>
            <ChannelInfo>
              <div>
                {el.members.some((x) => x === state.currentUser.userID) ? (
                  <span className="joined">
                    <DoneIcon /> Joined <span style={{fontSize: '30px'}}>· </span>
                  </span>
                ) : null}
                <span className="members" style={{fontWeight: 'bold'}}>
                  { el.members.length > 1 ? (
                    <span>{el.members.length} members</span>
                  ) : (
                    <span>{el.members.length} member</span>
                  )}
                </span>

                <span className="description" ><span style={{fontSize: '30px'}}> · </span> {el.description}</span>
              </div>

              {el.members.some((x) => x === state.currentUser.userID) ? (
                <Button
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={(e) => leaveChannel(el.channelName, el.private)}
                  color="error"
                >
                  Leave
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<DoneIcon />}
                  onClick={(e) => joinChannel(el.channelName)}
                  color="success"
                >
                  Join
                </Button>
              )}
            </ChannelInfo>
          </ChannelContainer>
        ))}
      <ButtonContainer>
        <Button
          variant="contained"
          color="success"
          onClick={() => setShowModal((pre) => !pre)}
        >
          Create Channel
        </Button>
      </ButtonContainer>
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
  /* align-items: center; */
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
    color: #383838;
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

const ButtonContainer = styled.div`
  text-align: center;
  margin: 60px;
`;
