import { useLocation } from "react-router-dom"
import "./update.css"

const Update = () => {


    const id = useLocation().pathname.split("/")[2]
    console.log(id);
    return (
        <div className="update">
            <div className="updatewrapper">
                <h1>Edit user information </h1>
                <form className="updateform">
                    <div className="updateleft">
                        <div className="item">
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="item">
                            <label htmlFor="username">Email</label>
                            <input type="text" placeholder="Email.... " />
                        </div>
                        <div className="item">
                            <label htmlFor="password">password</label>
                            <input type="text" placeholder="password" />
                        </div>
                    </div>
                    <div className="updateright">
                        <div className="item">
                            <img src="https://images.pexels.com/photos/9799876/pexels-photo-9799876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Loading..." className="avatar" />
                        </div>
                        <div className="item">
                            <label htmlFor="isAdmin">isAdmin</label>
                            <select className="p-2">
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="file">upload image</label>
                            <input type="file" name="file" />
                        </div>
                        <div className="item">
                            <button className="submitbtn">Submit </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update