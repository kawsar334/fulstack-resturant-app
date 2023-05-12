import { useLocation } from "react-router-dom"
import "./updateproduct.css"

const UpdateProduct = () => {


    const id = useLocation().pathname.split("/")[2]
    console.log(id);
    return (
        <div className="update">
            <div className="updatewrapper">
                <h1>Edit user information </h1>
                <form className="updateform">
                    <div className="updateleft">
                        <div className="item">
                            <label htmlFor="title">title</label>
                            <input type="text" placeholder="title" />
                        </div>
                        <div className="item">
                            <label htmlFor="">Desription</label>
                            <input type="text" placeholder="Product DESC.... " />
                        </div>
                        <div className="item">
                            <label htmlFor="password">password</label>
                            <input type="text" placeholder="password" />
                        </div>
                    </div>
                    <div className="updateright">
                        <div className="item">
                            <img src="https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Loading..." className="avatar" />
                        </div>
                        <div className="item">
                            <label htmlFor="categories">categories</label>
                            <input type="text" placeholder="categories" />

                            
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

export default UpdateProduct