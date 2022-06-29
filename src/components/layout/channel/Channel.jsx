import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../store/Context";
import Info from "./infoModal/Info";

export default function Channel() {
  const { state, dispatch } = useContext(Context);

  let { channelName } = useParams();

  const [currentChannel, setCurrentChannel] = useState(null);
  const [input, setInput] = useState("");

  const [notJoinedChannel, setNotJoinedChannel] = useState(null);

  const [callInfo, setCallInfo] = useState(false);

  // this is for the channel user joined
  useEffect(() => {
    if (state.currentUserChannels) {
      const channel = state.currentUserChannels.filter(
        (el) => el.channelName === channelName
      )[0];
      setCurrentChannel(channel);
    }
  }, [state.currentUserChannels, channelName]);

  // this is for channel not joined
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
  };

  return (
    <div>
      {currentChannel ? (
        <div>
          <h1 onClick={() => setCallInfo(true)}>
            {currentChannel.channelName}
          </h1>
          <div onClick={() => setCallInfo(false)}>
            {currentChannel.messages.length > 0 &&
              currentChannel.messages.map((el, i) => (
                <section key={i}>
                  <h4>{el.user.slice(2)}</h4>
                  <small>{JSON.stringify(el.time)}</small>
                  <p>{el.body}</p>
                </section>
              ))}

            <form onSubmit={postMassage}>
              <textarea
                name="input"
                id=""
                cols="30"
                rows="10"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
              <button type="submit">sent</button>
            </form>
          </div>

          {callInfo && <Info channel={currentChannel} joined={true} />}
        </div>
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
                Join Channel
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
