import React, { useContext } from 'react'
import { Context } from '../../../store/Context'
import {Link} from 'react-router-dom'

export default function Sidebar() {
  const {state} = useContext(Context)
  return (
    <div>
      {state.currentUserChannels && <ul>
        {state.currentUserChannels.map((el,i)=>(
          <li key={i}>
            <Link to={`${el.channelName}`}>{el.channelName}</Link>
          </li>
        ))}
      </ul> }
    </div>
  )
}
