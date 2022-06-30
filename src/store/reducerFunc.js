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

        case 'LOGOUT':
            const newUsersList = prev.users.map((el) => {
                if (el.userID === prev.currentUser.userID) {
                    return {...el, online:false}
                } else return el
            })
            return {...prev, currentUser:null, users: newUsersList, currentUserChannels: null}
        
        
        case "SIGNUP":
            const newUser={
                userName:action.name,password:action.password,online:true, 
                userID:prev.users.length < 10 ? `0${prev.users.length+action.name}` : `${prev.users.length+action.name}`}
            return {...prev, users:[...prev.users, newUser], currentUser:newUser}

        case "USERCHANNELS":
            // console.log(prev.channels);
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
            return { ...prev,
                channels:newChannels,
                currentUserChannels: newCurrentUserChannels
            }


        case "CREATE_CHANNEL":
            return {...prev,
                channels:[...prev.channels, action.newChannel],
                currentUserChannels: [...prev.currentUserChannels, action.newChannel] 
            }


        case 'LEAVE_CHANNEL':
            const leaveChannel = prev.channels.map((el, i) => {
                if(el.channelName===action.name) {
                    const newMembers = el.members.filter(id=>id!==prev.currentUser.userID )
                    return {...el, members: newMembers}
                } else return el
            })

            const leaveCurrentUserChannels = prev.currentUserChannels.filter((el, i) => el.channelName!==action.name)


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

        case "ADD_USER":
            const user = prev.users.filter(el=>el.userName===action.name)[0];
            const newChannel_addPeople = prev.channels.map((el=>{
                if(el.channelName===action.channelName)
                return {...el, members:[...el.members, user.userID]}; else return el
            }))
            const newCurrentUserChannels_addPeople =  prev.currentUserChannels.map((el=>{
                if(el.channelName===action.channelName)
                return {...el, members:[...el.members, user.userID]}; else return el
            }))

            return {...prev, channels:newChannel_addPeople, currentUserChannels:newCurrentUserChannels_addPeople}

        case "UPDATE":
            if (prev.currentUser) { const newcurrentUserChannels1 = action.channels.filter(el=>el.members.some(id=>id===prev.currentUser.userID))
                return {...prev, 
                    users:[...action.users],channels: [...action.channels],currentUserChannels:newcurrentUserChannels1}}
            else {return {...prev, 
                users:[...action.users],channels: [...action.channels]}}
           



        default:
            return prev;
    }

}