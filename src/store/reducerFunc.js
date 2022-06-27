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




        
        default:
            return prev;
    }

}