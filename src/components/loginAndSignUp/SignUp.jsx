import React, { useContext, useState } from 'react'
import { Context } from '../../store/Context';

export default function SignUp() {
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
    <form onSubmit={signUpHandler}>
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
  )
}
