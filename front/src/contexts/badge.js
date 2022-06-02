import { createContext, useState } from "react";

export const BadgeContext = createContext();

const initialState = {
  chat: 0,
  notification: 0,
  shift: 0,
  calendar: 0,
  task: 0
}


// -------------------login-------------

export const BadgeProvider = ({children}) => {

  const [params, setParams] = useState(initialState);
   
  

  return (
      <BadgeContext.Provider value={{
          params: params,
          setParams: setParams
      }}>
          {children}
      </BadgeContext.Provider>
  )
}