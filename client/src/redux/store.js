


import cartReducer from "./CartReducer";
import productReducer from "./ProductReducer";
import { createStore, combineReducers } from "redux";
import AlertReducer from "./AlertReducer";
import userReducer from "./UserReducer";

const rootReducer = combineReducers({

    products:productReducer,
    cart:cartReducer,
    alert:AlertReducer,
    user:userReducer
    

});
const store = createStore(rootReducer, +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store ;