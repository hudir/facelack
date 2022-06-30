import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../store/Context'
import styled from 'styled-components';

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
    <HeaderContainer>
      <span onClick={logOutHandle}>{state.currentUser.userName} Sign Out</span>

    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
      display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`
