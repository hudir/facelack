import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../../store/Context";

export default function About({ channel, joined }) {
  const { dispatch } = useContext(Context);
  const navi = useNavigate()
  
  return (
    <div>
      {channel && (
        <>
          <div>
            <h5>Description</h5>
            <p>{channel.description}</p>
          </div>
          <div>
            {" "}
            <h5>Create By</h5>
            <span>{channel.createBy.user}</span>
            <span>{channel.createBy.time}</span>
          </div>
          <div>
            {joined && (
              <button
                onClick={() =>{
                  dispatch({
                    type: "LEAVE_CHANNEL",
                    name: channel.channelName,
                    private: channel.private,
                  })
                  navi('/browseAllChannels')
                }}
              >
                Leave Channel
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
