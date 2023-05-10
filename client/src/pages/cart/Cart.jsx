import { useSelector } from "react-redux"
import About from "../../compontens/about/About"
import Foote from "../../compontens/footer/Foote"
import Menu from "../../compontens/menu/Menu"
import Navbar from "../../compontens/navbar/Navbar"
import "./cart.scss"

const Cart = () => {
    const products = useSelector((state) => state.cart.products);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const totalquantity = useSelector((state) => state.cart.totalquantity);

    
      
    return (
        <div className="cart">
            <Navbar />
            {/* <Menu/> */}
            <h1 className="text-3xl text-center">Your Cart</h1>
            <div className="cartwrapper">
                <div className="cartleft">
                  {
                    products.length<1 ?(<h1 className="text-center text-3xl">Your cart is Empty</h1>):

                    <>
                    {products.map((product)=>(

                        <div className="cartitem">
                                <img src={product?.img} alt="Loading..." />
                                <h2>this is title</h2>
                                <div className="counter">
                                {/* <button>+</button> */}
                                    <button>{product.quantity}</button>
                                    {/* <button>-</button> */}
                                </div>
                                <div className="price">${Number(product.price) * Number(product.quantity)}</div>
                                <button className="actionbtn">Remove</button>
                            </div>
                                ))}
                                </>
                  }
                   

                </div>
                <div className="cartright">
                    <p><span>Total count:</span> {totalquantity}</p>
                    <p><span>Total Price:</span> ${totalPrice}</p>
                    <button>Checkout</button>

                    
                </div>
            </div>
            {/* <About /> */}
            <Foote />

        </div>
    )
}

export default Cart