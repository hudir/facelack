import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../store/Context'

export default function Header() {

  const {state ,dispatch} = useContext(Context)
  const [logOut, setLogOut] = useState(false)
  const navi = useNavigate()

  const logOutHandle =() =>{
    dispatch({
      type:'LOGOUT'
    })
    navi('/')

  }
  return (
    <div>
      <span onClick={logOutHandle}>{state.currentUser.userName} Sign Out</span>

    </div>
  )
}
