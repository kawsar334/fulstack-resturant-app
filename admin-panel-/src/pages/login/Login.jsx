import { message } from "antd";
import axios from "axios";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"
import Loader from "../../components/loader/Loader";
import "./login.css"

const Login = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.alert.loading);

    // handling multiple inputes
        const handleChange =async(e)=>{
            setUser((prev)=>{
                return {
                    ...prev, [e.target.name]:e.target.value
                }
            });
        };

        // connecting with backend 
        const handleClick = async(e)=>{
            e.preventDefault();
            dispatch({type:"SHOW_LOADING",payload:true})
            try {
                const res = await axios.post("/auth/login/", { ...user });
                dispatch({type:"HIDE_LOADING", payload:false})
                if (res.data.success) {
                    message.success(res.data.message);
                    navigate("/");
                    localStorage.setItem("userId", res.data.others._id );
                    dispatch({ type: "GET_USER", payload: res.data.others });
                } else {
                    message.error(res.data.message);
                    
                };
            } catch (err) {
                console.log(err);
                message.error("Somthing went wrong !")
                dispatch({ type: "SHOW_LOADING", payload:true })

            }
        }

  return (
    <>
    {loading? <Loader/>:<div className="login">
        <h1 className="text-center">Signin.</h1>
        <form className="loginform" >
            <div className="loginitem">
                <label htmlFor="email">email</label>
                <input required type="email" onChange={handleChange} placeholder="Email" name="email"/>
            </div>
              <div className="loginitem">
                  <label htmlFor="password">Password</label>
                  <input required type="password" onChange={handleChange} placeholder="Password" name="password" />
              </div>
              <div className="loginitem">
                  <button className="loginbtn" onClick={handleClick}>{loading?<Loader/> :"Login."}</button>
              </div>

        </form>
        <p>Don't have Any account? <NavLink to="/register" className="text-danger">Register</NavLink></p>
    </div>}
    </>
  )
}

export default Login