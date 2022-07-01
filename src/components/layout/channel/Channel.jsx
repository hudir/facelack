import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../store/Context";
import Info from "./infoModal/Info";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Channel() {
  const { state, dispatch } = useContext(Context);

  let { channelName } = useParams();
  // console.log(channelName);

  const [currentChannel, setCurrentChannel] = useState(null),
    [input, setInput] = useState(""),
    [notJoinedChannel, setNotJoinedChannel] = useState(null),
    [callInfo, setCallInfo] = useState(false);

  // this is for the channel user joined
  useEffect(() => {
    if (state.currentUserChannels) {
      const channel = state.currentUserChannels.filter(
        (el) => el.channelName === channelName
      )[0];
      setCurrentChannel(channel);
    }
  }, [state.currentUserChannels, channelName]);

  // this one is for the channel user not joined
  useEffect(() => {
    if (state.channels) {
      const channel = state.channels.filter(
        (el) => el.channelName === channelName
      )[0];
      setNotJoinedChannel(channel);
    }
  }, [state.channels, channelName]);

  const postMassage = (e) => {
    e.preventDefault();
    const time = new Date().toString(); // FIX TIMESTAMP!!!!!!!!
    console.log(time);
    // console.log(new Date(time*1000))
    dispatch({
      type: "POST",
      postObj: {
        user: state.currentUser.userID,
        time: time,
        body: input,
        reply: [],
        channelName: currentChannel.channelName,
      },
    });
    setInput("");
  };

  return (
    <ChatInputContainer>
      {currentChannel ? (
        <>
          <div>
            <ChatContainer>
              <Header onClick={() => setCallInfo((pre) => !pre)}>
                <HeaderLeft>
                  <h4>
                    <strong>#{currentChannel.channelName}</strong>
                  </h4>
                  <StarOutlineIcon />
                </HeaderLeft>
                <HeaderRight>
                  <p>
                    <InfoOutlinedIcon /> Details
                  </p>
                </HeaderRight>
              </Header>
              {currentChannel.messages.length > 0 &&
                currentChannel.messages.map((el, i) => (
                  <MessageContainer key={i}>
                    <HeaderAvatar>
                      {el.user.slice(2, 3).toUpperCase()}
                    </HeaderAvatar>
                    <div className="msg-right">
                      <span>{el.user.slice(2)}</span>
                      <small>{JSON.stringify(el.time)}</small>
                      <p>{el.body}</p>
                    </div>
                  </MessageContainer>
                ))}
            </ChatContainer>

            <form onSubmit={postMassage}>
              <input
                name="input"
                id=""
                cols="30"
                rows="10"
                value={input}
                placeholder={`Message #${currentChannel.channelName}`}
                onChange={(e) => setInput(e.target.value)}
              ></input>
              <button type="submit">
                <SendIcon />
              </button>
            </form>
          </div>

          {callInfo && <Info channel={currentChannel} joined={true} />}
        </>
      ) : (
        notJoinedChannel && (
          <div className="notJoined">
            <ChatContainer>
            <Header onClick={() => setCallInfo((pre) => !pre)}>
                <HeaderLeft>
                  <h4>
                    <strong>#{notJoinedChannel.channelName}</strong>
                  </h4>
                  <StarOutlineIcon />
                </HeaderLeft>
                <HeaderRight>
                  <p>
                    <InfoOutlinedIcon /> Details
                  </p>
                </HeaderRight>
              </Header>
            {notJoinedChannel.messages.length > 0 &&
              notJoinedChannel.messages.map((el, i) => (
                <MessageContainer key={i}>
                  <HeaderAvatar>
                    {el.user.slice(2, 3).toUpperCase()}
                  </HeaderAvatar>
                  <div className="msg-right">
                    <span>{el.user.slice(2)}</span>
                    <small>{JSON.stringify(el.time)}</small>
                    <p>{el.body}</p>
                  </div>
                </MessageContainer>
              ))}
              </ChatContainer>

            <NotJoined>
              <h3># {notJoinedChannel.channelName}</h3>
              <p>{notJoinedChannel.description}</p>
              <div>
                <button className="details">Details</button>
                <button
                  className="join"
                  onClick={() =>
                    dispatch({
                      type: "JOIN_CHANNEL",
                      name: notJoinedChannel.channelName,
                    })
                  }
                >
                  Join channel
                </button>
              </div>

            </NotJoined>
          </div>
        )
      )}
    </ChatInputContainer>
  );
}

const ChatInputContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 50px;
  /* margin-bottom: 50px; */
  border-radius: 20px;
  form {
    position: relative;
    display: flex;
    justify-content: center;
    height: 100px;
    align-items: center;
  }

  form input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 35px;
    z-index: 2;
    outline: none;
    transition: box-shadow 300ms ease-out;
  :focus {
    box-shadow: 0px 0px 13px #335aad;
  }
  }

  form button {
    opacity: 0;
    position: fixed;
    bottom: 30px;
    right: 20px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  margin-top: 30px;
  padding: 20px 10px;
  max-height: calc(100vh-100px); 
  .notJoined {
    margin-top: 90px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  h4 .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  p {
    display: flex;
    align-items: center;
    font-size: 14px;

    p .MuiSvgIcon-root {
      margin-right: 5px !important;
      font-size: 16px;
    }
  }
`;

const MessageContainer = styled.div`
  margin: 20px 0;
  align-items: center;
  padding: 20px;
  display: flex;
  z-index: 1;
  position: relative;
  overflow-y: hidden;

  span {
    font-weight: bold;
    font-size: 18px;
  }
  small {
    padding-left: 10px;
    color: gray;
    margin-left: 4px;
    font-size: 10px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  margin-right: 15px;

  :hover {
    opacity: 0.8;
  }
`;

const NotJoined = styled.div`
  background-color: #e4e4e4;
  width: 90%;
  border-radius: 3px;
  border: 1px solid #d6d6d6;
  margin: 0 auto;
  padding: 20px;

  position: fixed;
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: space-between;
  height: 100px;
  align-items: center;
  bottom: 30px;
  .join {
    color: white;
    background-color: #466b46;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    padding: 6px;
    margin-left: 15px;
    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  .details {
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    padding: 6px;
    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }

  p {
    color: #6e6e6e;
    font-size: 12px;
  }

  a {
    color: #5a5a5a;
    font-size: 14px;
    :hover {
      color: blue;
    }
  }
`;
