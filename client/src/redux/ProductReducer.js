import { cartItems } from "../data"



const initialState = {
    products:[],
    product:{}

}

const productReducer = (state=initialState, action)=>{
    switch(action.type){

        case "ADD_PRODUCTS":
            return {
                ...state,
                products:action.payload
            }
        case "PRODUCT_DETAILS":
            return{
                ...state,
                product:state.products.find((item)=>item.id === Number(action.payload))
                
            }


            default :
            return state 

    }
}


export default productReducer ;