import React, { useContext, useState } from 'react'
import { Context } from '../../../store/Context'
import {Link} from 'react-router-dom'
import CreateChannel from '../channel/CreateChannel';

export default function Sidebar() {
  const {state} = useContext(Context);

  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      {state.currentUserChannels && <ul>
        {state.currentUserChannels.map((el,i)=>(
          <li key={i}>
            <Link to={`${el.channelName}`}>{el.channelName}</Link>
          </li>
        ))}
      </ul> }
      <Link to="browseAllChannels">Browse all Channels</Link>
      <span onClick={e=>setShowModal(pre=>!pre)}>Create New Channel</span>

      {showModal && <CreateChannel setShowModal={setShowModal}/>}

    </div>
  )
}
