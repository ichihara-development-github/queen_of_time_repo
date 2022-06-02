import React, { useEffect, useReducer } from "react";
import { fetchOrganizations } from "../apis/organizations";
import { Link, useHistory } from "react-router-dom"

import { organizationsReducer } from "../reducers/organizations";
import { organizationInitialState } from "../reducers/organizations";

export const Organization = ({match}) => {

    const history = useHistory();

    const [state, dispatch] = useReducer(organizationsReducer, organizationInitialState)
    
    // useEffect(() => {
    //     dispatch({type: "FETCHING"})
    //     // fetchOrganizations(match.params.organizationsId)
    //     fetchOrganizations(1)
    //     .then((data) => 
    //     dispatch({type: "FETCH_END",
    //     payload: {
    //         organizations: data.organizations
    //     }}))
    // },[])

    return (
       <div>
           
       </div>
    )
}