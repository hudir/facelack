import React, { useContext, useState } from 'react'
import { Context } from '../../store/Context'
import SignUp from './SignUp'
import styled from 'styled-components';

export default function Login() {
    const {state, dispatch} = useContext(Context)

    const [userName, setUserName] = useState('')
    , [password, setPassword] = useState('')
    , [signUp, setSignUp] = useState(false)

    const onSubmitHandler = e =>{
        e.preventDefault();
        if(state.users.some(el=>el.userName===userName && el.password===password)) {
            dispatch({
                type:"LOGIN",
                name: userName
            })
        }
    }


  return (
    <LoginContainer >
        <h1>Welcome to {state.appName}</h1>
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="UserName">UserName</label>
                <input type="text" id='UserName' value={userName} onChange={e=>setUserName(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="Password">Password</label>
                <input type="text" id='Password' value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>

            <button type='submit' className='my-3 btn btn-light'>Login</button>

        </form>

        <div>
            <p>if you are first time ues facelack, please sign up</p>
             <button className='my-3 btn btn-light' onClick={e=>setSignUp(prev=>!prev)}>Sign up</button>

             {signUp && <SignUp setSignUp={setSignUp}/>}

        </div>

    </LoginContainer>
  )
}
const LoginContainer = styled.div`
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
height: 100vh;
width: 100%;
background-color: var(--slack-color);
 color: white;
 height: 100%;

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
    font-size: 1.5rem;
    margin: 2rem auto;
    width: 30rem;
    
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