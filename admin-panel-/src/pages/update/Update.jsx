import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./update.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../../firebase";
import { message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";


const Update = () => {

    const loading = useSelector((state) => state.alert.loading);
    const id = useLocation().pathname.split("/")[2];
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [isAdmin, setIsAdmin] = useState(true);
    const [inputs, setInputs] = useState({});
    const [imgPerce, setImgPerce] = useState(null)
    
    const handleInputs = (e)=>{
        setInputs((prev)=>{
            return {
                ...prev, [e.target.name]:e.target.value
            }
        })
    }

        const handleUpdate = async(e)=>{
            e.preventDefault();
            const filename = new Date().getTime()+file.name;
            const storage = getStorage(app);
            const storageRef= ref(storage, filename);

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setImgPerce(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    if(error){
                        message.error("File uploadin error !")
                    }
                   
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        console.log('File available at', downloadURL);
                        try{
                            const res =await axios.put(`/user/${id}`, {...inputs, img:downloadURL});
                            if(res.data.success){
                                message.success(res.data.message)
                                navigate(`/user/${res.data.updatedUser._id}`)
                            }
                        }catch(err){
                            console.log(err)
                            if(err){
                                message.error("Somthing went wrong !")
                            }
                        }
                    });
                }
            );
            // 

        }

    return (
        <div className="update">
          {loading?<Loader/>:<div className="updatewrapper">
                <h1 className="text-center my-5">Edit user information </h1>
                <form className="updateform" onSubmit={handleUpdate}>
                    <div className="updateleft">
                        <div className="item">
                            <label htmlFor="username" >Username</label>
                            <input required type="text" name="username" placeholder="Username" onChange={handleInputs} />
                        </div>
                        <div className="item">
                            <label htmlFor="email" >Email</label>
                            <input required type="email" name="email" placeholder="Email.... " onChange={handleInputs} />
                        </div>
                        {/* <div className="item">
                            <label htmlFor="password">password</label>
                            <input required type="text" placeholder="password" />
                        </div> */}
                    </div>
                    <div className="updateright">
                        {file &&<div className="item">
                            <img src={URL.createObjectURL(file)} alt="Loading..." className="avatar" />
                            {imgPerce && <p>Upload is {imgPerce} %</p>}
                        </div>}
                        <div className="item">
                            <label htmlFor="isAdmin">isAdmin</label>
                            <select className="p-2" onChange={(e)=>setIsAdmin(e.target.value)}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="file">upload image</label>
                            <input required type="file" name="file" onChange={(e)=>setFile(e.target.files[0])} />
                        </div>
                        <div className="item">
                            <button className="submitbtn" type="submit">Submit </button>
                        </div>
                    </div>
                </form>
            </div>}
        </div>
    )
}

export default Update