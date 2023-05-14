import { async } from "@firebase/util";
import { useState } from "react"
import "./newproduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { message } from "antd";


const NewProduct = () => {

    const [file, setFile] = useState(null);
    const [inputs, setInputs] = useState({})
    const [categories, setCategories] = useState([]);


    //     title:
    //     desc: 
    //     img: 
    //     categories: 
    //     price: 
    //     isStack:
    //    feedback: 
    const handleChange = (e) => {
        setInputs((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    };

    // handling submit event and sending data to backend and database,
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage();
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file,);
        // 

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
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
                console.log(error)
                if(error){
                    message.error("file Not uploading")
                }
            },
            () => {
                // Upload completed successfully,  the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    try {
                        const res = await axios.post("/product/addproduct/", { ...inputs, categories, img: downloadURL });
                        console.log(res.data)
                        if(res.data.success){
                            message.success(res.data.message)
                        }

                    } catch (err) {
                        console.log(err)
                        if(err){
                            message.error("something went wrong")
                        }

                    }
                });
            }
        );
        // 
    }

    return (
        <div className="newproduct">
            <h3 className="newUserTitle">New Product </h3>
            <form onSubmit={handleSubmit} className="newUserForm">
                <div className="newUserFormLeft">
                    <label htmlFor="title">product Title</label>
                    <input type="text" name="title" id="name" placeholder="Title" onChange={handleChange} />
                    <label htmlFor="desc">description</label>
                    <input type="desc" name="desc" id="desc" placeholder="Product Description " onChange={handleChange}
                    />
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" placeholder="price" onChange={handleChange} />
                </div>
                <div className="newUserFormRight">
                    <label htmlFor="file">
                        {file && <img src="https://images.pexels.com/photos/14341974/pexels-photo-14341974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Loading..." className="uploadImg" />}
                        Upload img </label>
                    <input type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                    <label htmlFor="categories">categories</label>
                    <input type="categories" name="categories" id="categories" placeholder="write category  separate by using comma," onChange={(e) => setCategories(e.target.value.split(","))} />
                    <div className="genderContainer my-3 ">
                        <h5>Is-Stock:</h5>
                        <select name="isStock" onChange={handleChange}>
                            <option value="true" selected>yes</option>
                            <option value="false" >No</option>
                        </select>
                    </div>
                    <button className="newBtn" type="submit">submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewProduct