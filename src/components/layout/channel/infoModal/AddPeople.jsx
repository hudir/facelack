import React, { useContext, useState } from 'react'
import { Context } from '../../../../store/Context';

export default function AddPeople({channel}) {

    const {state, dispatch} = useContext(Context);

    const [info, setInfo] = useState(null)

    const addPeopleHandler = e =>{
        e.preventDefault();
        if(!state.users.some(el=>e.target.people.value===el.userName)) {
            setInfo('User does not exist')
        } else if (channel.members.some(id=>e.target.people.value===id.slice(2))) {
            setInfo(`${e.target.people.value} already joined this channel`)
        } else {
            dispatch({
                type: "ADD_USER",
                name: e.target.people.value,
                channelName:channel.channelName
        })
        }


    }
  return (
    <form onSubmit={addPeopleHandler}>
        <h2>Add People to {channel.channelName}</h2>
        {channel.private && <p>This is Private Channel</p> }
        <input type="text" name='people'/>
        {info && <p>{info}</p> }
        <button type='submit'>ADD</button>

    </form>
  )
}
