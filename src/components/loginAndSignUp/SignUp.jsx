import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { Context } from '../../store/Context';

export default function SignUp({setSignUp}) {
    const {state, dispatch} = useContext(Context)
    const [newUserName, setNewUserName] = useState('')
    , [newPassword, setNewPassword] = useState('')
    , [userExists, setUserExists] = useState(false)

    const signUpHandler = e =>{
        e.preventDefault();
        if(state.users.some(el=>el.userName===newUserName)){
            setUserExists(true)
        } else {
            dispatch({
                type:"SIGNUP",
                name: newUserName,
                password: newPassword
            })
            
        }

    }
  return (
    <SignUpContainer >
    <form onSubmit={signUpHandler} >
        <h3>Welcome</h3>
        <div>Your User Name:
            <input type="text" value={newUserName} onChange={e=>setNewUserName(e.target.value)} required/>
        </div>

        <div>Your Password
            <input type="text" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
        </div>

        <button type='submit'>submit</button>

        {userExists && <p>The User Name Already exists, please try another</p> }
        
    </form>
    <div onClick={e=>setSignUp(pre=>!pre)}></div>
    </SignUpContainer>
  )
}

const SignUpContainer = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.85);

    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > div {
        height: 100vh;
        width: 100vw;
    }
   



    h1 {
    font-size: 4.5rem;
    margin-bottom: 2rem;
 }
 form div {
    margin: 0.5rem;
     
    label {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: bold;
        padding-right: 10px;
    }
    label, input {
        font-size: 1.5rem;
    }

 }
 div p {
    font-size: 2rem;
    margin: 2rem;
 }

 button {
    padding: 10px;
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--slack-color);
    margin: 1rem;
    width: 9rem;
    border-radius: 1rem;

    :hover{
        background-color: var(--slack-color);
        color: orange;
    }
 }
`
