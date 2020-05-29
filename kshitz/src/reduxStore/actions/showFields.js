import * as actionTypes from './actionTypes';

export const setLoginClicked=()=>{

    console.log('inside set login clicked');

    return{
        
        type:actionTypes.SET_LOGINCLICKED,
        data:'hello'
    };
};

export const login=()=>{
    return dispatch=>{

        dispatch(setLoginClicked());

    };
}