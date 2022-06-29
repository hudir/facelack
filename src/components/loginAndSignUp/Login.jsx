import React, { useContext, useState } from 'react'
import { Context } from '../../store/Context'
import SignUp from './SignUp'

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

// console.log(state)
  return (
    <div>
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

            <button type='submit'>Login</button>

        </form>

        <div>
            <p>if you are first time ues facelack, please sign up</p>
             <button onClick={e=>setSignUp(prev=>!prev)}>Sign up</button>

             {signUp && <SignUp />}

        </div>

    </div>
  )
}
