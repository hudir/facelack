export default function reducerFunc(prev, action){
    switch(action.type){
        case "LOGIN":
            const newUsers = prev.users.map(el=>{
                if(el.userName === action.name) {
                    return {...el, online:true}
                } else return el
            })
            return {...prev,users:newUsers}
        
        default:
            return prev;
    }

}