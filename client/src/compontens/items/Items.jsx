import { cartItems } from "../../data"
import "./item.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProductItem from "../productsItem/ProductItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd"
const Items = () => {

    const { products } = useSelector((state) => state.products);
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get("/product/",);
                setItems(res.data.products)
                message.success("");
                
                dispatch({
                    type: "ADD_PRODUCTS", payload: res.data.products
                })
            } catch (err) {
                console.log(err);
                if (err) {
                    message.error("Something went wrong!!")
                }
            }
        }
        getProducts();

    }, []);

    // sort by category ...
    const handleCat = async (cat) => {
        try {
            if (cat) {
                const res = await axios.get(`/product?category=${cat}`);
                setItems(res.data.products)
                message.success(`${cat}`)
            }
            else {
                const res = await axios.get("/product/",);
                setItems(res.data.products);
            }
        } catch (err) {

            message.error("somenthing went wrong !")
        }
    };


    // get all items using onclick function 
    const handleAll = async () => {
        try {
            const res = await axios.get("/product/",);
            setItems(res.data.products);
            message.success(`All Items `)
        } catch (err) {
            message.error("somenthing went wrong !")
        }

    }

    return (
        <div className="items" id="item">
            <h1 className="text-3xl ">Foods Items </h1>
            <div className="itemtop">
                <i className="fa-solid fa-magnifying-glass" ></i>
                <input type="text" placeholder='Search' />
            </div>
            <div className="itemmiddle">
                <ul>
                    <li onClick={handleAll}>All</li>
                    <li onClick={() => handleCat("lunch")}>Lunch</li>
                    <li onClick={() => handleCat("dinner")}>dinner</li>
                    <li onClick={() => handleCat("breackfast")}>breackfast </li>
                    <li onClick={() => handleCat("pizza")}>Pizza</li>
                    <li onClick={() => handleCat("burger")}>burger</li>
                    <li onClick={() => handleCat("fry")}>fry</li>
                </ul>
            </div>
            <div className="itemcards">
                {items?.map((item) => (
                    <ProductItem key={item?._id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default Items