
import "./userlist.css";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd"


const UserList = () => {
  const [users, setUsers] = useState([]);
  const PF = "http://localhost:4004/uploads/";

// getting user list from backend 
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/user/?new=true");
        message.success(`${res?.data?.users?.length} ${res?.data?.message}`);
        setUsers(res?.data?.users);
      } catch (err) {
        message.error("something went wrong!");
      }
    }
    getUsers();
  }, []);


  // handling delte function
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure delete this user?")) {
        const res = await axios.delete(`/user/${id}`);
        if (res.data.success) {
          message.success(res.data.message);
          window.location.reload();
        } else {
          message.success(res.data.message);
        }
      };
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="userList" >
      <Link to="/register" className="btn  addbtn ">
        Add new user
      </Link>
      <table class="table table-light border ">
        <thead>
          <tr >
            <th scope="col" className="text-center">Id</th>
            <th scope="col" className="text-center">User</th>
            <th scope="col" className="text-center">Email</th>
            <th scope="col" className="text-center">IsAdmin</th>
            <th scope="col" className="text-center" colSpan={2}>action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr className={user?.isAdmin === true && "text-primary "}>
              <th scope="row" >{user?._id.slice(0, 6) + "..."}</th>
              <td><img src={user?.img || "https://images.pexels.com/photos/4947563/pexels-photo-4947563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" className="userIgm" /> <span>{user?.username}</span></td>
              <td>{user?.email}</td>
              <td>{user?.isAdmin === true ? "Yes" : "No"}</td>
              <td><Link to={`/user/${user._id}`} className="btn btn-primary mx-1"><i class="fa-regular fa-pen-to-square"></i></Link>
                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default UserList