import { createContext, useState } from "react";

export const ConfigContext = createContext();

const initialState = {
  open: 7,
  close: 21,
  submittableStart: new Date("2022-05-20"),
  submittableEnd: new Date("2022-05-30"),
  minAge: 20,
  maxAge: 65,
  events: [ 
  {"key":"red","value": "商談"},
  {"key":"royalblue","value": "面接"},
  {"key":"green","value": "会議"},
  {"key":"orange","value": "研修"}
  ],
  bussinessTime: {
    early_time: [8,9,10,11,12],
    mid_time: [13,14,15,16],
    late_time:  [17,18,19,20],
  }
}


// -------------------login-------------

export const ConfigProvider = ({children}) => {

  const [params, setParams] = useState(initialState);
   
  

  return (
      <ConfigContext.Provider value={{
          params: params,
          setParams: setParams
      }}>
          {children}
      </ConfigContext.Provider>
  )
}
