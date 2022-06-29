import React, { useContext, useState } from 'react'
import { Context } from '../../../store/Context'

export default function Header() {

  const {state ,dispatch} = useContext(Context)
  const [logOut, setLogOut] = useState(false)

  const logOutHandle =() =>{
    dispatch({
      type:'LOGOUT'
    })

  }
  return (
    <div>
      <span onClick={logOutHandle}>{state.currentUser.userName} Sign Out</span>

    </div>
  )
}
