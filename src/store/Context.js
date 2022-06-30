import { createContext, useEffect, useReducer } from "react";
import init from "./init";
import reducerFunc from "./reducerFunc";
import  { db }  from '../database/firebase'
import { collection, getDocs} from 'firebase/firestore'

const Context = createContext()

function ContextProvider ({children}){
    const [state, dispatch] = useReducer(reducerFunc, init)

    const channelCollectionRef = collection(db, 'channels')

    useEffect(() => {
        const getChannels = async () => {
            const data = await getDocs(channelCollectionRef)
            console.log(data)
        }
        getChannels()
    }, [])


    return <Context.Provider value={{
        state, dispatch
    }}>{children}</Context.Provider>
}

export {Context, ContextProvider}