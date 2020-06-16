import * as actionTypes from './actionTypes';

export const setMessage=(data)=>{

    
    return{
        type:actionTypes.SET_MESSAGE,
        data:data
    };
};

export const setSuccessFail=()=>{

    return{
        type:actionTypes.SET_SUCCESS_FAIL
    };
};