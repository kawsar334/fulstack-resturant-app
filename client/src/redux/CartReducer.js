



const initialState = {
    products:[],
    totalPrice:0,
    totalquantity:0,
}


const cartReducer = (state=initialState, action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            const {product, quantity} = action.payload ;
            const check = state.products.find((item)=>item.id === product.id);
           
            if(check){
                return state
            }else{
               const tPrice = state.totalPrice +product.price * quantity;
               const totalqty = state.totalquantity + quantity;
               product.quantity = quantity;
               return{
                ...state,
                products:[...state.products, product],
                totalquantity:totalqty,
                totalPrice:tPrice
               }
            }
            
        

        default:
            return state
    }
}



export default cartReducer;