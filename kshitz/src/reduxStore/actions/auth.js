import * as actionTypes from './actionTypes';
import axios from 'axios';
import qs from 'qs';

export const authlogin=(token)=>{
    return{
    type:actionTypes.AUTH_LOGIN,
    token:token
    };
};

export const authFail=(error)=>{
    return {
    type:actionTypes.AUTH_FAIL,
    error:error
    };
};

export const auth=(username,password)=>{
    console.log('on auth action');

    return dispatch=>{

    const body = {
        grant_type:'password',
        client_id:'kshitz',
        client_secret:'abcde',
        username:username,
        password:password

};
axios({
    method: 'post',
    url: 'http://localhost:8080/login',
    data:qs.stringify(body) ,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(response=>{
        console.log(response.data.access_token);
        const expirationDate=new Date(new Date().getTime()+response.data.expires_in*1000);
            localStorage.setItem('token',response.data.access_token);
            localStorage.setItem('expirationDate',expirationDate);
        dispatch(authlogin(response.data.access_token));
    }).catch(err=>{
        console.log(err.response.data);
        dispatch(authFail(err.response.data));
    })

};

};