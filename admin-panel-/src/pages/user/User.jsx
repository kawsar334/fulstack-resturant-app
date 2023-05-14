import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"
import "./user.css";

const User = () => {
    const id = useLocation().pathname.split("/")[2];
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await axios.get(`/user/find/${id}`);
                console.log(res.data);
                if (res.data.success) {
                    message.success(res.data.message)
                    setUser(res.data.user)
                } else {
                    message.error(res.data.message)
                }
            } catch (err) {
                console.log(err.response);
            }
        }
        getUserData();
    }, [id])

    return (
        <div className="user">
            <div className="userwrapper">
                <div className="userleft">
                    <img src={user?.img} alt="Image Not found" className="userimg" />
                </div>
                <form className="userright">
                    <Link to={`/update/${user?._id}`}><i className="fa-regular fa-pen-to-square text-primary p-1  rounded shadow"></i></Link>
                    <h1 className="username"> <span className="usernamespan">{user?.username}</span> Details </h1>
                    <p className="userItem"><span className="bold">_id:</span>{user?._id}  <Link to={`/update/${user?._id}`}><i className="fa-regular fa-pen-to-square text-primary p-1  rounded shadow"></i></Link></p>
                    <p className="userItem"><span className="bold">Name:</span>{user?.username} <Link to={`/update/${user?._id}`}><i className="fa-regular fa-pen-to-square text-primary p-1  rounded shadow"></i></Link></p>
                    <p className="userItem"><span className="bold">Email:</span>kawsarfiroz@gmail.com <Link to={`/update/${user?._id}`}><i className="fa-regular fa-pen-to-square text-primary p-1  rounded shadow"></i></Link></p>
                    <p className="userItem"><span className="bold">IsAdmin:</span>{user.isAdmin === true ? "Yes" : "No"} <Link to={`/update/${user?._id}`}><i className="fa-regular fa-pen-to-square text-primary p-1  rounded shadow"></i></Link></p>
                    <button className="edit"><Link to={`/update/${user?._id}`}>Edit <i className="fa-regular fa-pen-to-square text-danger"></i></Link></button>
                </form>
            </div>
        </div>
    )
}

export default User