



import {combineReducers, createStore} from "redux";
import UserRedux from "./userRedux";
import alertRedux from "./alertRedux"
const rootReducer = combineReducers({
   
        user: UserRedux,
        alert:alertRedux

    
})

const store = createStore(rootReducer, +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store