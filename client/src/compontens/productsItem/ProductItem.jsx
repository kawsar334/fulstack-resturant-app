import "./pitem.scss";
import "../items/item.scss"
import { NavLink } from "react-router-dom";

const ProductItem = ({item}) => {
  return (
    <>
          <NavLink to={`/details/${item?._id}`} className="card">
              <div className="cardtop">
                  <img src={item.img} alt="Loading" />
              </div>
              <div className="cardbottom">
                  <p className="cardtitle">{item?.title}</p>
                 {item?.feedback? 
                      <div className="stars">
                          {
                              item?.feedback?.map((f) => (

                                  <i class="fa-solid fa-star"></i>
                              ))
                          }
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                          <i class="fa-regular fa-star"></i>
                      </div>
                 : <div className="stars">
                        <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                  </div>}
                  <div className="cardnames">
                      {item?.categories?.map((i)=>(

                      <span key={i}>{i}</span>
                      ))}
                  
                  </div>
                  <span className="price">${item?.price}</span>
              </div>
          </NavLink>
    
    </>
  )
}

export default ProductItem