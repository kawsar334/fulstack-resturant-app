import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import "./product.css";
import { format } from 'timeago.js';

const Product = () => {

    const id = useLocation().pathname.split("/")[2];
    const [product, setProduct] = useState({});
    console.log(id)

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const res = await axios.get(`/product/find/${id}`);
                setProduct(res.data.product);

            } catch (err) {
                console.log(err);
            }
        }
        getProductDetails()
    }, [id])
    return (
        <div className="product">
            <div className="productLeft">
                <img src={product?.img} alt="Loading..." />
            </div>
            <div className="productright">
                <h1 className="text-center p-3">Product Details </h1>
                <button className="productbtn"><NavLink to={`/updateproduct/${product._id}`}>Edit Product</NavLink></button>
                <p className="productItem"><span>ID:</span> {product._id}</p>
                <p className="productItem"><span>TITLE:</span> {product.title}</p>
                <p className="productItem"><span>TITLE:</span> ${product.price}</p>
                <p className="productItem"> {product.desc}</p>
                {/* <p><span>createdAt:</span> {format(product.createdAt)}</p> */}
                <hr />
            </div>
        </div>
    )
}

export default Product