import * as actionTypes from '../actions/actionTypes';


const initialState={
    token:'',
   username:null,
   error:null,
   isLogin:false,
   role:'',
   authRedirectPath:'/'

}

const reducer =(state=initialState,action)=>{

    switch(action.type){
        case actionTypes.AUTH_LOGIN:
            return{
                ...state,
                token:action.token,
                error:null,
                isLogin:true
            };

        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.error,
                isLogin:false
            };

        case actionTypes.AUTH_LOGOUT:
        return{
            ...state,
            token:null,
            isLogin:false,
            role:null
        };
        case actionTypes.SET_ROLE:
            return{
                ...state,
                role:action.role


            };
            case actionTypes.SET_AUTH_REDIRECT_PATH:
                return{
                    ...state,
                    authRedirectPath:action.path
    
    
                };
            default:return state;
    }



};

export default reducer;