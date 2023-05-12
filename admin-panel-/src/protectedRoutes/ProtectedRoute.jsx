import { message } from "antd";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";




const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch();
    const admin = useSelector((state) => state?.user?.user?.isAdmin)
    const id = localStorage.getItem("userId");
    const navigate= useNavigate();

    const getUserData = async () => {
        try {
            const res = await axios.get(`/user/find/${id}`);
            if (localStorage.getItem("userId" || res.data.success)) {
                dispatch({ type: "GET_USER", payload: res.data.user });
                if(!admin){
                    message.error("Only Admin can access here ! ");
                }
            };

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (localStorage.getItem("userId")) {
            getUserData();
        };
    }, [id]);

    if (!admin ) {
        return <Navigate to="/login" />
    }else{
        return children

    }
   


}


export default ProtectedRoute