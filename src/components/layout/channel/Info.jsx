import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import About from './infoModale/About'
import Members from './infoModale/Members'

export default function Info({channel,joined}) {
  return (
    <div>
        <nav>
            <Link to={'../'+channel.channelName+'/about'}>About</Link>
            <Link to={'../'+channel.channelName+'/members'}>Members</Link>
        </nav>

        <Routes path={channel.channelName}>
            <Route path={'/about'} element={<About/>}/>
            <Route path={'/members'} element={<Members/>}/>
        </Routes>
    </div>
  )
}
