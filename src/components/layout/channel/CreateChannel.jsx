import React, {useContext, useState} from "react";
import { Context } from "../../../store/Context";
import {useNavigate} from 'react-router-dom'
// import  { db }  from '../database/firebase'

export default function CreateChannel({setShowModal}) {

    const {state, dispatch} = useContext(Context)

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
    <div>
      <h2>Create a channel</h2>
      <small>
        Channels are where your team communicates. They´re best when organized
        around a topic — #marketing, for example.
      </small>
      <form onSubmit={createNewChannelHandler}>
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
          <h3>Make private</h3>
          <input type="checkbox" name='private' />
          <small>
            When a channel is set to private, it can only be viewed or joined by
            invitation.
          </small>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
