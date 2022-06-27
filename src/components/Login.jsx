import React, { useContext, useState } from 'react'
import { Context } from '../store/Context'

export default function Login() {
    const {state, dispatch} = useContext(Context)

    const [userName, setUserName] = useState('')
    , [password, setPassword] = useState('')

    const onSubmitHandler = e =>{
        e.preventDefault();
        if(state.users.some(el=>el.userName===userName &&el.password===password)) {
            dispatch({
                type:"LOGIN",
                name: userName
            })
        }
    }


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
            {/* <button type='submit'>Sign up</button> */}
        </form>

        {state.users[0].online && 'true'}
    </div>
  )
}
