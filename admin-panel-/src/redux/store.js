



import {combineReducers, createStore} from "redux";
import UserRedux from "./userRedux";

const rootReducer = combineReducers({
   
        user: UserRedux,
        

    
})

const store = createStore(rootReducer, +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store