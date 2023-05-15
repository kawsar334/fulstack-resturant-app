import { message } from "antd";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import app from "../../firebase";
import "./register.css"

const Register = () => {
    const [file, setFile] = useState(null)
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [fileProgress, setFileProgress] = useState(null);
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    //handling onchange event ///
    const handleChange = (e) => {
        setUser((prev => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        }));
    };

    // handling submit function 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setFileProgress(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        setError('Upload is paused');

                        break;
                    case 'running':
                        console.log('Upload is running');
                        setError('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error)
                message.error("File not uploaded !")

            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    dispatch({ type: "SHOW_LOADING", payload:true})

                    try {
                        const res = await axios.post(`/auth/register/`, { ...user, img: downloadURL });
                        console.log(res.data);
                        dispatch({ type: "HIDE_LOADING", payload:false })

                        if (res.data.success) {
                            message.success(res.data.message)
                            navigate("/login")
                        } else {
                            message.error(res.data.message);
                        }
                    } catch (err) {
                        console.log(err.response.data);
                        message.error("Something went wrong !");
                        dispatch({ type: "SHOW_LOADING", payload:true })

                    }
                });
            }
        );



    }


    return (
        <div className="update">
            <div className="updatewrapper">
                <h1 className="text-center m-3">Register</h1>
                <form className="updateform" onSubmit={handleSubmit}>
                    <div className="updateleft">
                        <div className="item">
                            <label htmlFor="username">Username</label>
                            <input required name="username" onChange={handleChange} type="text" placeholder="Username" />
                        </div>
                        <div className="item">
                            <label htmlFor="email">Email</label>
                            <input required name="email" onChange={handleChange} type="text" placeholder="Email.... " />
                        </div>
                        <div className="item">
                            <label htmlFor="password">password</label>
                            <input required name="password" onChange={handleChange} type="password" placeholder="password" />
                        </div>
                    </div>
                    <div className="updateright">
                        {file && <div className="item">
                            <img src={URL.createObjectURL(file) || "https://images.pexels.com/photos/9799876/pexels-photo-9799876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="Loading..." className="avatar" />
                        </div>}
                        <div className="item">
                            <label htmlFor="isAdmin" >isAdmin</label>
                            <select className="p-2" name="isAdmin" onChange={handleChange}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        {error &&<span>{error}</span>}
                        {fileProgress ? (<span>upload is {fileProgress}%</span>) : <div className="item">
                            <label htmlFor="file">upload image</label>
                            <input required name="file" onChange={(e) => setFile(e.target.files[0])} type="file" />
                        </div>
                        }                        <div className="item">
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


//
// try {
//     const res = await axios.post(`/auth/register/`, { ...user, img: Date.now() + file.name, });
//     console.log(res.data);
//     if (res.data.success) {
//         message.success(res.data.message)
//         navigate("/login")
//     } else {
//         message.error(res.data.message);
//     }
// } catch (err) {
//     console.log(err.response.data);
//     message.error("Something went wrong !");
// }