import { message } from "antd";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";




const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch();
    const admin = useSelector((state) => state?.user?.user?.isAdmin)
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    const loading = useSelector((state) => state?.alert?.loading);


    // getting user data from backend 
    const getUserData = async () => {
        try {
            dispatch({type:"SHOW_LOADING", payload:true})
            const res = await axios.get(`/user/find/${id}`);
            dispatch({type:"HIDE_LOADING", payload:false})
            if (localStorage.getItem("userId" || res.data.success)) {
                dispatch({ type: "GET_USER", payload: res.data.user });

                if (!admin) {
                    message.error("Only Admin can access here ! ");
                }
            };
        } catch (err) {
            console.log(err);
            dispatch({type:"SHOW_LOADING", payload:true})

        }
    }
    useEffect(() => {
        if (localStorage.getItem("userId")) {
            getUserData();
        };
    }, [id]);
 
    if (!admin) {
        return <Navigate to="/login" />
    } else {
        return children ;
    }
}


export default ProtectedRoute