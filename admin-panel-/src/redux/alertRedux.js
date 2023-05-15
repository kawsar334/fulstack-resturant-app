



const intialState = {
    loading:false
}


const alertRedux = (state=intialState, action)=>{


    switch(action.type){
        case "SHOW_LOADING":
            return {
                ...state, loading:action.payload
            }
            
        case "HIDE_LOADING":
            return {
                ...state, loading:action.payload
            } 
            default :
            return {
                state
            }
    }

}




export default alertRedux;