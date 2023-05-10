import { message } from "antd";
import axios from "axios";
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import "./register.scss"

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file,setFile] = useState(null);


    // handling registration function 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const filename = Date.now() + file.name;
        const data = new FormData();
        data.append("name", filename);
        data.append("file", file);
        const imgRes = await axios.post("/photo", data);
        console.log(file)
        try {
            const res = await axios.post("/auth/register/", { username, email, password, img: Date.now() + file.name });
            if (res.data.success) {
                message.success(res.data.message);
                message.success("welcome  " + res.data.data.username);
                navigate("/login");
            }
        } catch (err) {
            console.log(err)
            if (err) {
                message.error("something went wrong !");
            }
        }
       
    } 
    return (
        <div className="register">
            <div className="registerwrapper">
                <h1>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="registerleft">
                        <div className="registerItem">
                            <label htmlFor="username">Username</label>
                            <input required type="text" name="" id="" placeholder="Enter your name " onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="registerItem">
                            <label htmlFor="password">password</label>
                            <input required type="password" name="" id="" placeholder="Enter your password " onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="registerright">
                        <div className="registerItem">
                            <label htmlFor="file">Upload Image <span>(optional)</span></label>
                            <input required type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className="registerItem">
                            <label htmlFor="email">email</label>
                            <input required type="email" name="" id="" placeholder="Enter your Email " onChange={(e) => setEmail(e.target.value)} />
                            <button>Submit</button>
                        </div>

                        <div className="registerItem mt-4">
                            {/* <label htmlFor="username">Username</label>
                          <input required type="text" name="" id="" placeholder="Enter your name " /> */}
                        </div>
                    </div>
                </form>
                <p>Already Registerd ? <NavLink to="/login">Login </NavLink></p>
            </div>
        </div>
    )
}

export default Register