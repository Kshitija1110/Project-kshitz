import * as actionTypes from './actionTypes';

export const setError=(data)=>{

   
    return{
        type:actionTypes.SET_ERROR,
        data:data
    };
};

export const setErrorNull=()=>{

   

    return{
        type:actionTypes.SET_ERROR_NULL
    };
};