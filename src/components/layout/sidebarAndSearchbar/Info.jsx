import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import About from '../channel/infoModal/About'
import Members from '../channel/infoModal/Members'

export default function Info({channel,joined}) {
  return (
    <div>
        <nav>
            <Link to={'../'+channel.channelName+'/about'}>About</Link>
            <Link to={'../'+channel.channelName+'/members'}>Members</Link>
        </nav>

        <Routes path={channel.channelName}>
            <Route path={'/about'} element={<About channel={channel} joined={joined}/>}/>
            <Route path={'/members'} element={<Members channel={channel} joined={joined}/>}/>
        </Routes>
    </div>
  )
}
