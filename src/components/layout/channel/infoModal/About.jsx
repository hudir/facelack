
import React, { useContext } from 'react'
import { Context } from '../../../../store/Context'

export default function About({channel,joined}) {
  const {dispatch} = useContext(Context)
  // console.log(channel)
  return (
    <div>
     {channel && <><div>
        <h5>Description</h5>
        <p>{channel.description}</p>
      </div>
      <div> <h5>Create By</h5>
      <span>{channel.createBy.user}</span>
      <span>{channel.createBy.time}</span>
       </div>
      <div>
        {joined && <button onClick={()=>dispatch({
        type: "LEAVE_CHANNEL",
        name: channel.channelName,
        private: channel.private
    })}>Leave Channel</button>}
        </div></>}

    </div>
  )
}
