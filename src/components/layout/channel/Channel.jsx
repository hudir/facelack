import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../store/Context";
import Info from "./infoModal/Info";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import Moment from 'moment';

export default function Channel() {
  const { state, dispatch, currentChannel, setCurrentChannel } =
    useContext(Context);

  let { channelName } = useParams();
  // console.log(channelName);

  const 
    [input, setInput] = useState(""),
    [notJoinedChannel, setNotJoinedChannel] = useState(null),
    [edit, setEdit] = useState({status:false,index:null})
   

  const [open, setOpen] = useState(false);

  
    const handleOpen = () => setOpen(true);

    

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
  }}, [state.channels, channelName]);

  const postMassage = (e) => {
    e.preventDefault();
    const time = Moment().format('MMMM Do YYYY, h:mm:ss a') // FIX TIMESTAMP!!!!!!!!
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

  
  const editHandler =(e,index,msg) =>{
    console.log(msg);
    e.preventDefault();
    const time = new Date().toString();
    dispatch({
      type: "EDIT",
      postObj: {
        ...msg,
        time: time,
        body: e.target.edit.value,
        edited:true
      },
      index:index
    });
    setEdit({status:false,index:null})
  
  }

  // console.log(state.users.map(el=>el.color))

  return (
    <ChatInputContainer>
      {currentChannel ? (
        <>
          <div>
            <ChatContainer>
              <Header onClick={() => handleOpen(true)}>
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
                  <MessageContainer key={i} style={el.systemInfo ? {opacity: '0.6'} : null}>
                    {el.systemInfo ? null : <HeaderAvatar style={state.users.filter(x=>x.userID===el.user)[0] ? {backgroundColor: state.users.filter(x=>x.userID===el.user)[0].color} : null}>
                     
                     {el.user.slice(2, 3).toUpperCase()}
                   </HeaderAvatar>}
                    
                    <div className="msg-right">
                      <span>{el.user.slice(2)}</span>
                      <small>{JSON.stringify(el.time)}</small>
                     {edit.status && edit.index===i ? 
                     (
                      <form onSubmit={(e)=>editHandler(e,i,el)} className='editForm'>
                        <input name="edit" type="text" placeholder={el.body}/>
                        <button type="submit">Save Change</button>
                      </form>
                     )  : <p>{el.body}</p>  }
                    </div>


                    {state.currentUser.userID === el.user && (
                      <div>
                        <IconButtonStyle aria-label="delete" size="small" color='success' onClick={() => {setEdit(pre=>({index:i, status:!pre.status}))}}>
                          <EditLocationOutlinedIcon />
                        </IconButtonStyle>
                        <IconButtonStyle aria-label="delete" size="small" color='error' onClick={() => {
                            dispatch({
                              type: "DELETE",
                              index: i,
                              name: currentChannel.channelName,
                            });
                          }}>
                          <DeleteIcon />
                        </IconButtonStyle>
                      </div>
                    )}

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
          {open && <Info channel={currentChannel} open={open} setOpen={setOpen}  />}

        </>
      ) : (
        notJoinedChannel && (
          <div className="notJoined">
            <ChatContainer>
              <Header onClick={() => handleOpen(true)}>
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
                  <MessageContainer key={i} style={el.systemInfo ? {opacity: '0.6'} : null}>
                    {el.systemInfo ? null  : <HeaderAvatar style={state.users.filter(x=>x.userID===el.user)[0] ? {backgroundColor: state.users.filter(x=>x.userID===el.user)[0].color} : null}>
                     
                     {el.user.slice(2, 3).toUpperCase()}
                   </HeaderAvatar> }
                   
                    <div className="msg-right">
                      <span>{el.user.slice(2)}</span>
                      <small>{JSON.stringify(el.time)}</small>
                      <p>{el.body}</p>
                    </div>
                  </MessageContainer>
                ))}
            </ChatContainer>

            <NotJoined>
              <div className="divNotJoined">
                <h3># {notJoinedChannel.channelName}</h3>
                <p>{notJoinedChannel.description}</p>
                <button className="details">Details</button>
                <button
                  className="join"
                  onClick={() =>{
                    dispatch({
                      type: "JOIN_CHANNEL",
                      name: notJoinedChannel.channelName,
                    });
                    const time = Moment().format('MMMM Do YYYY, h:mm:ss a');
      // console.log(new Date(time*1000))
      dispatch({
        type: "POST",
        postObj: {
          user: ' ',
          time: time,
          body: `${state.currentUser.userName} joined channel ${notJoinedChannel.channelName}`,
          reply: [],
          channelName: notJoinedChannel.channelName,
          systemInfo:true
        },
      });
                  }
                  }
                >
                  Join channel
                </button>
              </div>
            </NotJoined>
          </div>
        )
      )}
       {open && <Info  channel={notJoinedChannel} open={open} setOpen={setOpen}  />}
      
    </ChatInputContainer>
  );
}

const ChatInputContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 50px;
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

  .editForm {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: aqua;

    input {
      width: 100%;
      height: 50px;
    }

  }
`;

const HeaderAvatar = styled(Avatar)`
  margin-right: 15px;

  :hover {
    opacity: 0.8;
  }
`;

const NotJoined = styled.div`
  background-color: rgba(220, 220, 220, 1);
  width: 90%;
  border-radius: 3px;
  border: 1px solid #d6d6d6;
  margin: 0 auto;
  padding: 20px;
  z-index: 100;

  .divNotJoined {
    text-align: center;
    position: relative;
    transform: translateX(-50%);

    p {
      margin: 10px 0;
    }
  }

  position: fixed;
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: space-between;
  height: 100px;
  align-items: center;
  bottom: 0px;
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
`;

const IconButtonStyle = styled(IconButton)`
  opacity: 0.3;

  :hover {
    opacity: 1;
  }
`