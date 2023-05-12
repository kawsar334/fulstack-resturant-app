

import "./topbar.css";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Topbar = () => {
    const admin = useSelector((state) => state?.user?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async(e)=>{
        e.preventDefault();
        if(window.confirm("Are your sure Logout Now?.")){
            localStorage.removeItem("userId");
            dispatch({ type:"LOGOUT"})
            navigate("/login")
            window.location.reload();
        }
    };
    
  return (
    <div className="topbar">
        <div className="topbar_wrapper">
            <div className="topleft">
                <Link to="/">
                <span className="logo">{admin?.username} </span>
                </Link>
            </div>
            <div className="topright">
                <Link to="/register">
                Register
                </Link>
                  <Link to="/login">
                      Login
                  </Link>
                  {admin && <span onClick={handleLogout} className="text-danger shadow px-2 pointer" style={{cursor:"pointer"}}>
                      Logout
                  </span>}
                <div className="topbar_icon_container">
                      <i class="fa-solid fa-bell"></i>
                      <span className="topicon_bage">1</span>
                </div>
                  <div className="topbar_icon_container">
                      <i class="fa-solid fa-globe"></i>
                      <span className="topicon_bage">2</span>
                  </div>
                  <div className="topbar_icon_container">
                      <i class="fa-solid fa-bell"></i>
                      {/* <span className="topicon_bage">3</span> */}
                  </div>
                  <Link to={`/user/${admin?._id}`}>
                  <img src={admin?.img ||"https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt=""  className="topbar_img"/>
                  </Link>
            </div>
        </div>  
    </div>
  )
}

export default Topbar
