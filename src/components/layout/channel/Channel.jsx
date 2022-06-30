import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../store/Context";
import Info from "../sidebarAndSearchbar/Info";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import styled from "styled-components";

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
    const time = new Date();
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
    // console.log(state.channels[0].messages);
  };

  return (
    <ChatInputContainer>
      {currentChannel ? (
        <>
          <div onClick={() => setCallInfo(false)}>
            
                <ChatContainer>
                  <>
                    <Header>
                      <HeaderLeft>
                        <h4 onClick={() => setCallInfo(true)}>
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
              currentChannel.messages.map((el, i) => (<div key={i}>
                    <h4>{el.user.slice(2)}</h4>
                    <small>{JSON.stringify(el.time)}</small>
                    <p>{el.body}</p>
                    </div>))}
                  </>
                </ChatContainer>
              

            <form onSubmit={postMassage}>
              <input
                name="input"
                id=""
                cols="30"
                rows="10"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></input>
              <button type="submit">send</button>
            </form>
          </div>

          {callInfo && <Info channel={currentChannel} joined={true} />}
        </>
      ) : (
        notJoinedChannel && (
          <div>
            <h1>{notJoinedChannel.channelName}</h1>

            {notJoinedChannel.messages.length > 0 &&
              notJoinedChannel.messages.map((el, i) => (
                <section key={i}>
                  <h4>{el.user.slice(2)}</h4>
                  <small>{JSON.stringify(el.time)}</small>
                  <p>{el.body}</p>
                </section>
              ))}

            <div>
              <h3>{notJoinedChannel.channelName}</h3>
              <p>{notJoinedChannel.description}</p>
              <button
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
  margin-top: 0;

  border-radius: 20px;
  form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  form input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  form button {
    opacity: 0.8;
    position: fixed;
    bottom: 48px;
    right: 20px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 30px;
  padding:20px 10px;
  max-height: calc(100vh-100px);
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

     p  .MuiSvgIcon-root {
      margin-right: 5px !important;
      font-size: 16px;
    }
  }
`;
