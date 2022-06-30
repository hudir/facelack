import React, {useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../../store/Context';
import styled from "styled-components";
import CreateChannel from '../channel/CreateChannel';

export default function BrowseAllChannels() {

    const {state, dispatch, showModal, setShowModal} = useContext(Context)

    const [channelsToRender, setChannelsToRender] = useState(null)

    useEffect(()=> {
      const publicChannel = state.channels.filter(el=>el.private=== false || el.members.some(id=>id===state.currentUser.userID))
      setChannelsToRender(publicChannel)

    }, [state.channels, state.currentUserChannels])

    const leaveChannel = (channelName, notPublic) => {
      dispatch({
        type: 'LEAVE_CHANNEL',
        name: channelName,
        private: notPublic
      })
    }

    const navigate = useNavigate()

    const joinChannel = (channelName) =>{
      dispatch({
        type: 'JOIN_CHANNEL',
        name: channelName,
      })
      navigate('../'+channelName)
    }

  
  return (
    <BrowseChannelsContainer>
    <h2>All channels</h2>
    <button onClick={()=> setShowModal(pre=>!pre)}>Create Channel</button>
    {showModal && <CreateChannel/>}
    <hr />
      {channelsToRender && channelsToRender.map((el,i) => (
            <div key={i} >
              <Link to={`../${el.channelName}`}>
                <h3>{el.channelName}</h3>
              </Link>
                {el.members.some(x=>x===state.currentUser.userID) ? <span>Joined</span> : null}
                <span>{el.members.length > 1 ? <span>{el.members.length} members</span> : <span>{el.members.length} member</span>}</span>

                <span>{el.description}</span>
                {el.members.some(x=>x===state.currentUser.userID) ? <button onClick={e=>leaveChannel(el.channelName, el.private)}>Leave Channel</button> : <button onClick={e=>joinChannel(el.channelName)}>Join Channel</button>}
            </div>
        ))}
    </BrowseChannelsContainer>
  )
}

const BrowseChannelsContainer = styled.div`
    flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`
