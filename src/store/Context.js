import { createContext, useReducer } from "react";
import init from "./init";
import reducerFunc from "./reducerFunc";

const Context = createContext()

function ContextProvider ({children}){
    const [state, dispatch] = useReducer(reducerFunc, init)


    return <Context.Provider value={{
        state, dispatch
    }}>{children}</Context.Provider>
}

export {Context, ContextProvider}