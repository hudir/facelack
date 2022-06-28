import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../store/Context'

export default function BrowseAllChannels() {
    const {state} = useContext(Context);

    const [channelToRender, setChannelToRender] = useState(null)

    useEffect(()=>{
        const publicChannel = state.channels.filter(el=>el.private===false || el.members.some(id=>id===state.currentUser.userID))
        setChannelToRender(publicChannel)
    }, [])

  return (
    <div>
        {channelToRender && channelToRender.map((el,i)=>(<Link key={i} to={`../${el.channelName}`}>
            <h3>{el.channelName}</h3>

            {el.members.some(x=>x===state.currentUser.userID) ? <span>Joined</span> : null}

            <span>{el.members.length>1 ? <span>{el.members.length} members</span> : <span>{el.members.length} member</span>}</span>

            <span>{el.description}</span>   
        </Link>))
        }
    </div>
  )
}
