import { message } from "antd";
import axios from "axios";
import { useState } from "react"
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"
import "./login.scss"

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const res = await axios.post("/auth/login/", {email, password});
      localStorage.setItem("user", res.data.others._id)
      message.success(`Login sucssefully`)
      if(res.data.success){
        navigate("/");
      }
      console.log(res.data);
    }catch(err){
      console.log(err);
      if(err){
        message.error("Something went wrong !");
      }
    }
  }

  return (<>
    {<div className="login">
        <div className="loginwrapper">
            <form onSubmit={handleSubmit}>
                <h1>Sign in </h1>
                  <input required type="email" placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} />
                  <input required type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}/>
                    <button>Submit</button>
            </form>
            <p>Don't have any account ? <NavLink to="/register">Register</NavLink></p>
        </div>
    </div>}
  </>
  )
}

export default Login