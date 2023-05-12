import { message } from "antd";
import axios from "axios";
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import "./register.css"

const Register = () => {
    const [file, setFile] = useState(null) 
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    //handling onchange event ///
    const handleChange = (e)=>{
        setUser((prev=>{
            return {
                ...prev, [e.target.name]:e.target.value
            }
        }));
    };

    // handling submit function 
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const filename = Date.now() + file.name;
        const data = new FormData();
        data.append("name", filename);
        data.append("file", file);
        try{
            await axios.post("/photo", data);
            message.success("uploading image...")
        }catch(err){
            console.log(err);
            message.error("image Uploading problem")
        }
        
        try{
            const res = await axios.post(`/auth/register/`, { ...user,img: Date.now() + file.name,});
            console.log(res.data);
            if(res.data.success){
                message.success(res.data.message)
                navigate("/login")
            }else{
                message.error(res.data.message);
            }
        }catch(err){
            console.log(err.response.data);
            message.error("Something went wrong !")
        }
    }


  return (
      <div className="update">
          <div className="updatewrapper">
              <h1 className="text-center m-3">Register</h1>
              <form className="updateform" onSubmit={handleSubmit}>
                  <div className="updateleft">
                      <div className="item">
                          <label htmlFor="username">Username</label>
                          <input required name="username" onChange={handleChange}  type="text" placeholder="Username" />
                      </div>
                      <div className="item">
                          <label htmlFor="email">Email</label>
                          <input required name="email" onChange={handleChange}  type="text" placeholder="Email.... " />
                      </div>
                      <div className="item">
                          <label htmlFor="password">password</label>
                          <input required name="password"  onChange={handleChange}  type="password" placeholder="password" />
                      </div>
                  </div>
                  <div className="updateright">
                      {file&&<div className="item">
                          <img src={URL.createObjectURL(file) || "https://images.pexels.com/photos/9799876/pexels-photo-9799876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="Loading..." className="avatar" />
                      </div>}
                      <div className="item">
                          <label htmlFor="isAdmin" >isAdmin</label>
                          <select className="p-2"name="isAdmin" onChange={handleChange}>
                              <option value="false">No</option>
                              <option value="true">Yes</option>
                          </select>
                      </div>
                      <div className="item">
                          <label htmlFor="file">upload image</label>
                          <input required name="file" onChange={(e)=>setFile(e.target.files[0])}  type="file" />
                      </div>
                      <div className="item">
                          <button className="submitbtn">Rigister </button>
                      </div>
                  </div>
              </form>
              <p className="text-center  m-2">Already have an account? <NavLink to="/login" className="text-primary">Login </NavLink></p>
          </div>
      </div>
  )
}

export default Register