import { createContext, useEffect, useReducer, useState } from "react";
import { db } from "../firebase/db";
import init from "./init";
import reducerFunc from "./reducerFunc";
import { collection, getDocs, updateDoc, doc } from "@firebase/firestore";

const Context = createContext();

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, init);

  const [data, setData] = useState(null),
    [initialize, setInitialize] = useState(true);

    // for create new channel modal
    const [showModal, setShowModal] = useState(false)
    // for info modal which content about and members
    ,[callInfo, setCallInfo] = useState(false);

    const [currentChannel, setCurrentChannel] = useState(null)

    const userCollectionRef= collection(db, "user")


  // get data from firebase
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      await setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]);
      await setInitialize(false);
    };

    const intervalId = setInterval(() => {
      getUsers();
    }, 1000 * 5); // in milliseconds
    return () => clearInterval(intervalId);
  }, []);

  //update state
  useEffect(() => {
    if (data) {
      if (data.users !== state.users || data.channels !== state.channels) {
        dispatch({
          type: "UPDATE",
          users: data.users,
          channels: data.channels,
        });
      }
    }
  }, [data]);

    // update data in firebase
    useEffect(()=>{  
         (async function(){
            const newDoc = doc(db,'user',
               "DzRtcfNnNIVke15BqREm")
            const obj={
                users: state.users,
                channels:state.channels
            };
            if (!initialize) {
                await updateDoc(newDoc , obj)}
               

        })()  
    }, [state.users, state.channels, state.currentUserChannels])


  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        showModal,
        setShowModal,
        callInfo,
        setCallInfo,
        currentChannel,
        setCurrentChannel,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
