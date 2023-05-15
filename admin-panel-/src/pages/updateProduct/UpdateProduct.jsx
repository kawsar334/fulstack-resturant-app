import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import "./updateproduct.css"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
const UpdateProduct = () => {
    const id = useLocation().pathname.split("/")[2];
    const [file, setFile] = useState(null);
    const [inputs, setInputs] = useState({});
    const [categories, setCategories] = useState([]);
    const [fileProgress, setFileProgress] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // handling multiple inputs using onchange event 
    const handleChange = (e) => {
        setInputs((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        });
    }

    // sending data backend and storing in database 
    const handleUpdate = async (e) => {
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
                    // sending data to backend 
                    try {
                        dispatch({ type: "SHOW_LOADING",payload:true })
                        const res = await axios.put(`/product/${id}`, { ...inputs, img: downloadURL, categories: categories, });
                        console.log(res.data)
                        if (res.data.success) {
                            message.success(res.data.message);
                            navigate(`/product/${res.data.updatedProduct._id}`)
                        }
                        dispatch({ type: "HIDE_LOADING",payload:false })
                    } catch (err) {
                        console.log(err);
                        if (err) {
                            message.error("something went wrong !")
                            dispatch({ type: "SHOW_LOADING",payload:true })
                        }

                    }
                    // 
                });
            }
        );
    }



    return (
        <div className="update">
            <div className="updatewrapper">
                <h1 className="text-center my-3 ">Edit Product details </h1>
                <form className="updateform" onSubmit={handleUpdate}>
                    <div className="updateleft">
                        <div className="item">
                            <label htmlFor="title">title</label>
                            <input  required name="title" type="text" placeholder="title" onChange={handleChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="desc">Desription</label>
                            <input  required type="text" name="desc" placeholder="Product DESC.... " onChange={handleChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="price">price</label>
                            <input  required type="number" name="price" placeholder="Price" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="updateright">
                       {fileProgress? <span className="text-danger">uloading. {parseInt(fileProgress)}%</span>:<> {file && <div className="item">
                            <img src={URL.createObjectURL(file)} alt="Loading..." className="avatar" />
                        </div>}</>}
                        {error&& <span>{error}</span>}

                        <div className="item">
                            <label htmlFor="categories">categories</label>
                            <input  required type="text" placeholder="write categories using comma , " name="categories" onChange={(e) => setCategories(e.target.value.split(","))} />
                        </div>
                        <div className="item">
                            <label htmlFor="file">upload image</label>
                            <input  required type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
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

export default UpdateProduct