import { createContext, useReducer } from "react";
import { db } from "../database/firebase";
import init from "./init";
import reducerFunc from "./reducerFunc";

const Context = createContext()

function ContextProvider ({children}){
    const [state, dispatch] = useReducer(reducerFunc, init)
    
    db.collection('channels').add({channels:state.channels})
    

    return <Context.Provider value={{
        state, dispatch
    }}>{children}</Context.Provider>
}

export {Context, ContextProvider}