import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"
import Loader from "../../components/loader/Loader";
import "./user.css";

const User = () => {
    const loading = useSelector((state) => state.alert.loading);
    const id = useLocation().pathname.split("/")[2];
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        const getUserData = async () => {
            dispatch({ type: "SHOW_LOADING", payload: true })
            try {
                const res = await axios.get(`/user/find/${id}`);
                dispatch({ type: "HIDE_LOADING", payload: false })
                if (res.data.success) {
                    message.success(res.data.message)
                    setUser(res.data.user);
                } else {
                    message.error(res.data.message)
                }
            } catch (err) {
                if (err) {
                    message.error("something went wrong")
                    dispatch({ type: "SHOW_LOADING", payload: true });
                }
            }
        }
        getUserData();
    }, [id])

    return (
        <div className="user">
            {loading ? <Loader /> : <div className="userwrapper">
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
            </div>}
        </div>
    )
}

export default User