import React, { Component, useContext, useEffect, useState } from "react";
import { checkSession, createSession, deleteSession } from "../apis/session";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import { createContext } from "react";
import { SnackbarContext } from "./snackBar";
import { CircularProgress, LinearProgress, Stack } from "@mui/material";
import CircularStatic from "../components/initialLoading";
import { PageLoadingCircle } from "../components/shared/commonPatrs";
import { BadgeContext } from "./badge";

export const AuthContext = createContext()

const initialState = {
  loading: true,
  loggedIn: false,
  chief: false,
  tempId: "",
  name: ""
}


// -------------------login---------

export const AuthProvider = ({children}) => {

  const [state, setState] = useState(initialState);
  const history = useHistory();

  const sb = useContext(SnackbarContext);
  const badge = useContext(BadgeContext);
  
    const login = (params) =>{
        createSession(params)
        .then(res => {
          if (res.status === 403){
            history.push("/login")
            sb.setSnackBar({
              open: true,
              variant: "error",
              content: "メールアドレスかパスワードが間違っています"
            })
              
            return
           }
        
            setState({
              loading: false,
              loggedIn: true,
              name: res.data.name,
              chief: res.data.chief})
              sb.setSnackBar({
                open: true,
                variant: "success",
                content: `${res.data.name}でログインしました`
              })
              res.data.chief ?
              history.push("/Dashboard")
              :
              history.push("/employeeDashboard")
            }
        )
      }

     const logout = () => {
        deleteSession()
        .then(res => {
          if(res.status == 200)
            {
            history.push("/login")
            setState({
              loggedIn: false,
              loading: false})
            sessionStorage.clear()
           }
        }
        )
        sb.setSnackBar({
          open: true,
          variant: "success",
          content: "ログアウトしました"
        })
    }

    const sessionForbidden = () => {
      setState({loggedIn:false})
      sessionStorage.clear()
      sb.setSnackBar({
        open: true,
        variant: "error",
        content: "ログイン情報が確認できませんでした。"
      })
      console.log(state)
    }
      
  useEffect(() => {
    checkSession()
    .then((res) => {
      console.log(res.data)
      setState({
        loading: false,
        loggedIn: true, 
        name: res.data.name, 
        chief: res.data.chief})
        badge.setBadge(res.data.badges)
    })
    .catch((e) => {
      if (e.response.status === 403) {
       sessionForbidden()
      } else {
        throw e;
      }
    })
  },[])

    return (
      <AuthContext.Provider value={{
        state: state,
        setState: setState,
        login: login,
        logout: logout,
        sessionForbidden: sessionForbidden
      }}>
      {state.loading ? 
        <PageLoadingCircle/>
        :
       children
       }
      </AuthContext.Provider>

    )
  }

