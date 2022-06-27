import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../../store/Context';

export default function Channel() {
    const {state, dispatch} = useContext(Context)
    let {channelName}= useParams()
    const [currentChannel, setCurrentChannel] = useState(null)
    , [input, setInput] = useState('')
    

    useEffect(()=>{
        if (state.currentUserChannels){
            const channel = state.currentUserChannels.filter(el=>el.channelName===channelName)[0];
            setCurrentChannel(channel)
        }
       
    } ,[state.channels,state.currentUserChannels ])

    const postMassage = e =>{
        e.preventDefault();
        const time = new Date();
        dispatch({
            type:"POST",
            postObj: {
                user:state.currentUser.userID,
                time:time,
                body:input,
                reply:[],
                channelName: currentChannel.channelName
            }
        }) 

       
        // console.log(state.channels[0].messages);     
    }

  return (
    <div>
        {currentChannel && (<>
            <h1>{currentChannel.channelName}</h1>

            {currentChannel.messages.length>0 && currentChannel.messages.map((el,i)=>(
                <section key={i}>
                    <h4>{el.user.slice(2)}</h4>
                    <small>{el.time}</small>
                    <p>{el.body}</p>
                </section>
            ))}

            <form onSubmit={postMassage}>
                <textarea name="input" id="" cols="30" rows="10" value={input} onChange={e=>setInput(e.target.value)}></textarea>
                <button type='submit'>sent</button>
            </form>
            </>
        )
        }
        
    </div>
  )
}
