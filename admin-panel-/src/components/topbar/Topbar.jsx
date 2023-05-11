

import "./topbar.css";
import {Link} from "react-router-dom";

const Topbar = () => {
  return (
    <div className="topbar">
        <div className="topbar_wrapper">
            <div className="topleft">
                <Link to="/">
                <span className="logo">kawsar Firoz </span>
                </Link>
            </div>
            <div className="topright">
                <Link to="/newuser">
                Register
                </Link>
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
                  <Link to={`/user/:id`}>
                  <img src="https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""  className="topbar_img"/>
                  </Link>
            </div>
        </div>  
    </div>
  )
}

export default Topbar
