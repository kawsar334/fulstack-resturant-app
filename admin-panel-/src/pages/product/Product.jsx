import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import "./product.css";
import { format } from 'timeago.js';
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import Loader from "../../components/loader/Loader";

const Product = () => {
    const loading = useSelector((state) => state.alert.loading);
    const id = useLocation().pathname.split("/")[2];
    const [product, setProduct] = useState({});
   const dispatch = useDispatch();

    useEffect(() => {
        const getProductDetails = async () => {
            dispatch({type:"SHOW_LOADING", payload:true})
            try {
                const res = await axios.get(`/product/find/${id}`);
                setProduct(res.data.product);
                dispatch({type:"HIDE_LOADING", payload:false})
            } catch (err) {
                message.error("something went wrong !");
                dispatch({type:"SHOW_LOADING", payload:true})
            }
        }
        getProductDetails()
    }, [id])
    return (
        <>
       { loading?<Loader/>:<div className="product">
            <div className="productLeft">
                <img src={product?.img} alt="Loading..." />
            </div>
            <div className="productright">
                <h1 className="text-center p-3">Product Details </h1>
                <button className="productbtn"><NavLink to={`/updateproduct/${product._id}`}>Edit Product</NavLink></button>
                <button className="addproductbtn"><NavLink to={`/newproduct`}>Add New Product </NavLink></button>
                <p className="productItem"><span>ID:</span> {product._id}</p>
                <p className="productItem"><span>Admin id:</span> {product?.userId}</p>
                <p className="productItem"><span>Title:</span> {product.title}</p>
                <p className="productItem"><span>Price:</span> ${product.price}</p>
                <p className="productItem"> {product.desc}</p>
                {/* <p><span>createdAt:</span> {format(product.createdAt)}</p> */}
                <hr />
            </div>
        </div>}
        </>
    )
}

export default Product