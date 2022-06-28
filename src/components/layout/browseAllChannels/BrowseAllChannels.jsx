import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../../store/Context'

export default function BrowseAllChannels() {
    const {state, dispatch} = useContext(Context);

    const [channelToRender, setChannelToRender] = useState(null)

    useEffect(()=>{
        const publicChannel = state.channels.filter(el=>el.private===false || el.members.some(id=>id===state.currentUser.userID))
        setChannelToRender(publicChannel)
    }, [state.channels, state.currentUserChannels])

    const leaveChannel=(channelName, notPublic)=>dispatch({
        type: "LEAVE_CHANNEL",
        name: channelName,
        private: notPublic
    })

    const navi = useNavigate()

    const joinChannel=(channelName)=>{
        dispatch({
        type: "JOIN_CHANNEL",
        name: channelName
        })
        navi('../'+channelName)
    }

  return (
    <div>
        {channelToRender && channelToRender.map((el,i)=>(<div key={i}>

            <Link to={`../${el.channelName}`}><h3>{el.channelName}</h3></Link>
            

            {el.members.some(x=>x===state.currentUser.userID) ? <span>Joined</span> : null}

            <span>{el.members.length>1 ? <span>{el.members.length} members</span> : <span>{el.members.length} member</span>}</span>

            <span>{el.description}</span> 

            {el.members.some(x=>x===state.currentUser.userID) ? <button onClick={e=>leaveChannel(el.channelName, el.private)}>Leave Channel</button> : <button onClick={e=>joinChannel(el.channelName, el.private)}>Join Channel</button> }  
        </div>))
        }
    </div>
  )
}