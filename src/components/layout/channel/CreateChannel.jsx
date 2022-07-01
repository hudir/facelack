import React, {useContext, useState} from "react";
import { Context } from "../../../store/Context";
import {useNavigate} from 'react-router-dom'
import styled from "styled-components";
// import  { db }  from '../database/firebase'

export default function CreateChannel() {

    const {state, dispatch, setShowModal} = useContext(Context)

    const [exists, setExists] = useState(false)

    let navigate = useNavigate()

    const createNewChannelHandler = (e) => {
        e.preventDefault();

        const time = JSON.stringify(new Date())
        const createBy = {time: time, user: state.currentUser.userName}

        const newChannel = {
            channelName: e.target.channelName.value,
            description: e.target.description.value,
            members: [state.currentUser.userID],
            messages: [],
            private: e.target.private.checked,
            createBy : createBy,
        }

        //check if channel already exists
        if (state.channels.some(el=>el.channelName===newChannel.channelName)) setExists(true); else {
            dispatch({
                type: 'CREATE_CHANNEL',
                newChannel: newChannel,
            })
            setShowModal(false)
            navigate(newChannel.channelName)
        } 
    }

  return (
    <CreateChannelContainer>
      
      <form onSubmit={createNewChannelHandler}>
      <h2>Create a channel</h2>
      <small>
        Channels are where your team communicates. They´re best when organized
        around a topic — #marketing, for example.
      </small>
        <div>
          <h3>Name</h3>
          <input type="text" name="channelName" required/> {exists && <p>The Channel already exists, please try another</p>}
        </div>
        <div>
          <h3>
            Description <small>(optional)</small>
          </h3>
          <input type="text" name='description' />
        </div>
        <div>
          <label htmlFor="pri"><h3>Make private</h3></label>
          
          <input type="checkbox" name='private' id="pri"/>

          <label htmlFor="pri"> <small>
            When a channel is set to private, it can only be viewed or joined by
            invitation.
          </small></label>
         
        </div>
        <div> <button type="submit">Create</button>
        <button onClick={()=>setShowModal(false)}>Back</button>
        </div>
       
      </form>
      <div className="glass" onClick={()=>setShowModal(false)}></div>
    </CreateChannelContainer>
  );
}

const CreateChannelContainer =styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  
  background: linear-gradient(180deg, var(--slack-color) 0% , #45023bec 50% , var(--slack-color) 100%);
  
  form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    z-index: 8;
  }
  form *{
    width: 100%;
    margin-bottom: 10px;
    font-size: 2rem;
    color: #ff9900;
  }
  form input {
    color: black;
  }
  .glass{
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
  }
`