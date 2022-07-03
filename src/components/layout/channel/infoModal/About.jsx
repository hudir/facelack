import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../../store/Context";
import styled from "styled-components";
import { Button } from "@nextui-org/react";
import Moment from "moment";

export default function About({ channel, joined }) {
  const { state, dispatch } = useContext(Context);
  const navi = useNavigate();

  return (
    <Container>
      {channel && (
        <>
          <AboutContainer>
            <InnerContainer>
              <h5>Description</h5>
              <p>{channel.description}</p>
            </InnerContainer>
            <InnerContainer>
              {" "}
              <h5>Created By </h5>
              <span> {channel.createBy.user} on</span>
              <span> {channel.createBy.time}</span>
            </InnerContainer>
          </AboutContainer>
          <div className="btn">
            {joined && (
              <Button
                color="error"
                auto
                onClick={() => {
                  dispatch({
                    type: "LEAVE_CHANNEL",
                    name: channel.channelName,
                    private: channel.private,
                  });
                  const time = Moment().format("MMMM Do YYYY, h:mm:ss a");
                  dispatch({
                    type: "POST",
                    postObj: {
                      user: " ",
                      time: time,
                      body: `${state.currentUser.userName} left channel ${channel.channelName}`,
                      reply: [],
                      channelName: channel.channelName,
                      systemInfo: true,
                    },
                  });
                  navi("/browseAllChannels");
                }}
              >
                <strong>Leave Channel</strong>
              </Button>
            )}
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutContainer = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-bottom: 40px;
`;
const InnerContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid lightgray;

  :hover {
    background-color: #e9e9e9;
  }
`;
