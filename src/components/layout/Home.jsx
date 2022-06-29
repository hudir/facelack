import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '../../store/Context'
import Login from '../loginAndSignUp/Login'
import BrowseAllChannels from './browseAllChannels/BrowseAllChannels'
import Channel from './channel/Channel'
import Header from './sidebarAndSearchbar/Header'
import Sidebar from './sidebarAndSearchbar/Sidebar'
import Welcome from './Welcome'

export default function Home() {
  const {state, dispatch} = useContext(Context)

  useEffect(()=>dispatch({
    type:"USERCHANNELS",
    id:state.currentUser.userID
  }) ,[])

  return (
    <div>
      <Header/>
      <Sidebar/>
      <Routes>
        <Route path=':channelName/*' element={<Channel />}/>
        <Route path='browseAllChannels' element={<BrowseAllChannels />}/>
         <Route path='*' element={<Welcome/>}/> 
      </Routes>
    </div>
  )
}
