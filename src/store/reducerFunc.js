export default function reducerFunc(prev, action){
    switch(action.type){
        case "LOGIN":
            const currentUser = prev.users.filter(el=>el.userName===action.name)[0]
            const newUsers = prev.users.map(el=>{
                if(el.userName === action.name) {
                    return {...el, online:true}
                } else return el
            })
            return {...prev,users:newUsers, currentUser: currentUser}
        
        case "SIGNUP":
            const newUser={
                userName:action.name,password:action.password,online:true, 
                userID:prev.users.length < 10 ? `0${prev.users.length+action.name}` : `${prev.users.length+action.name}`}
            return {...prev, users:[...prev.users, newUser], currentUser:newUser}

        case "USERCHANNELS":
            const userChannels = prev.channels.filter(el=>el.members.some(id=>id===action.id))
            return {...prev, currentUserChannels: userChannels}

        case "POST":
            let msg=[]
            const newChannels=prev.channels.map(el=>{
                if(el.channelName===action.postObj.channelName){
                    msg=[...el.messages, action.postObj]
                    return {...el, messages:msg}
                } else return el
            })
            const newCurrentUserChannels=prev.currentUserChannels.map(el=>{
                if(el.channelName===action.postObj.channelName){
                    msg=[...el.messages, action.postObj]
                    return {...el, messages:msg}
                } else return el
            })
            // console.log(newChannels);
            return { ...prev,
                channels:newChannels,
                currentUserChannels: newCurrentUserChannels
            }

        case "CREATECHANNEL":
            return {...prev,
                channels:[...prev.channels, action.newChannel],
                currentUserChannels: [...prev.currentUserChannels, action.newChannel] 
            }

        case "LEAVE_CHANNEL":
            const leaveChannel = prev.channels.map(el=>{
                if(el.channelName===action.name){
                    const newMembers = el.members.filter(id=>id!==prev.currentUser.userID)
                    return {...el, members:newMembers}
                } else return el
            })

            const leaveCurrentUserChannels = prev.currentUserChannels.filter(el=>el.channelName!==action.name)

            return {...prev,
                channels: leaveChannel,
                currentUserChannels: leaveCurrentUserChannels 
            }
        
            case "JOIN_CHANNEL":
                let toAddToCurrentUserChannels=0;
                const joinChannel = prev.channels.map((el,i)=>{
                    if(el.channelName===action.name){
                        toAddToCurrentUserChannels=i;
                        const newMembers = [...el.members, prev.currentUser.userID]
                        return {...el, members:newMembers}
                    } else return el
                })
    
                const joinCurrentUserChannels = [...prev.currentUserChannels,joinChannel[toAddToCurrentUserChannels]]
    
                return {...prev,
                    channels: joinChannel,
                    currentUserChannels: joinCurrentUserChannels 
                }




        
        default:
            return prev;
    }

}