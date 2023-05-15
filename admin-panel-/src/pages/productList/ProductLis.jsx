import "./productlist.css";;
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

const ProductLis = () => {
    const [products, setProducts] = useState([]);
    const loading = useSelector((state) => state.alert.loading);
    const navigate = useNavigate();
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get("/product/");
                setProducts(res.data.products);

                if (res.data.success) {
                    message.success(res.data.message)
                }
            } catch (err) {
                console.log(err);
            }
        }
        getProducts();
    }, [])

    // delte product 
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/product/${id}`);
            message.success(res.data.message);
            navigate("/produclist")

        } catch (err) {
            message.error("something went wrong !")
        }
    }
    return (
        <>
            {loading ? <Loader /> : <div className="productlist">
                <Link to="/newproduct" className="btn  addbtn">
                    {loading ? <Loader /> : " Add new Product"}
                </Link>
                <h3>product list</h3>
                <table class="table table-light border text-center ">
                    <thead>
                        <tr >
                            <th scope="col" className="text-center">Id</th>
                            <th scope="col" className="text-center">Image</th>
                            <th scope="col" className="text-center">Name</th>
                            <th scope="col" className="text-center">price</th>
                            <th scope="col" className="text-center" colSpan={2}>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (

                            <tr>
                                <th scope="row">{product._id.slice(0, 6)} ...</th>
                                <td>
                                    <Link to={`/product/${product._id}`}>
                                        <img src={product.img} alt="" className="productImg" />
                                    </Link>
                                </td>
                                <td>{product.title}</td>
                                <td className="userTrasaction">${product?.price}</td>
                                <td><Link to={`/product/${product._id}`} className="btn btn-primary mx-1"><i class="fa-regular fa-pen-to-square"></i></Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(product._id)}><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}



                    </tbody>
                </table>
            </div>}
        </>
    )
}

export default ProductLis