import * as actionTypes from './actionTypes';

export const setLoginClicked=(data)=>{


    return{
        
        type:actionTypes.SET_LOGINCLICKED,
        data:data
    };
};

export const login=()=>{
    return dispatch=>{

        dispatch(setLoginClicked());

    };
}

export const setUpdateMessage=(data)=>{
    return{
        type:actionTypes.SET_UPDATE_MESSAGE,
        data:data
    };
};