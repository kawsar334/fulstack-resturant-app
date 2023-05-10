import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"






const ProtectedRoute = ({children})=>{
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    

    const id = localStorage.getItem("user");
    const getUser = async () => {

        try {
            dispatch({ type:"SHOW_LOADING"});
            const res = await axios.get(`/user/find/${id}`);
            if(res.data.success){
                dispatch({ type:"HIDE_LOADING"});
                dispatch({ type: "GET_USER", payload: res.data });
            }
        } catch (err) {
            dispatch({ type: "SHOW_LOADING" });
        }
    };
    getUser();
    useEffect(() => {

        if (localStorage.getItem("user")){
            getUser()

        }
       

    }, [id]);


    if(!localStorage.getItem("user")){
        return children ;
    }
    return <Navigate to="/"/>

    
}



export default ProtectedRoute