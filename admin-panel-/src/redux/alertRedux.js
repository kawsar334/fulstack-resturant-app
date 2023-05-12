



const intialState = {
    user:null
}


const userRedux = (state=intialState, action)=>{


    switch(action.type){
        case "GET_USER":
            return {
                ...state, user:action.payload
            }
    }

}




export default userRedux;