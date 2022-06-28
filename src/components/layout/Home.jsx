import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '../../store/Context'
import BrowseAllChannels from './browseAllChannels/BrowseAllChannels'
import Channel from './channel/Channel'
import Searchbar from './sidebarAndSearchbar/Searchbar'
import Sidebar from './sidebarAndSearchbar/Sidebar'

export default function Home() {
  const {state, dispatch} = useContext(Context)

  useEffect(()=>dispatch({
    type:"USERCHANNELS",
    id:state.currentUser.userID
  }) ,[])

  return (
    <div>
      <Searchbar />
      <Sidebar/>

      <Routes>
        <Route path=':channelName/*' element={<Channel />}/>
        <Route path='browseAllChannels' element={<BrowseAllChannels />}/>
      </Routes>
    </div>
  )
}
