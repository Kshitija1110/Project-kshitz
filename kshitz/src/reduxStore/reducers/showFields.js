import * as actionTypes from '../actions/actionTypes';

const initialState={
    loginClicked:false,
    updateMessage:''

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.SET_LOGINCLICKED: 
        return{
            ...state,
            loginClicked: action.data
            
        };
        case actionTypes.SET_UPDATE_MESSAGE:
            return{
                ...state,
                updateMessage:action.data
            };
        default: return state;

    }
};

export default reducer;