import * as actionTypes from '../actions/actionTypes';

const initialState={
    loginClicked:false,
    data:null

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.SET_LOGINCLICKED: 
        return{
            ...state,
            loginClicked: !state.loginClicked,
            data:action.data
            
        };
        default: return state;

    }
};

export default reducer;