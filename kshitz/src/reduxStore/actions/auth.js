import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from 'axios';
import qs from 'qs';
import jwt from 'jwt-decode';

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

export const setRole=(role)=>{
    return{
        type:actionTypes.SET_ROLE,
        role:role
    };
};

export const setAuthRedirectPath=(path)=>{
    
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };
};

export const auth=(username,password)=>{
    

    let decodedToken = null;
    let authorities = null;

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
       
        const expirationDate=new Date(new Date().getTime()+response.data.expires_in*1000);
            localStorage.setItem('token',response.data.access_token);
            localStorage.setItem('expirationDate',expirationDate);
             decodedToken = jwt(response.data.access_token);
             authorities = decodedToken.authorities[0];
            if(authorities==='ROLE_SELLER'){
    
                dispatch(setRole('SELLER'));
            }
            else if(authorities==='ROLE_CUSTOMER'){
            
                dispatch(setRole('CUSTOMER'));
            }
            else if(authorities==='ROLE_ADMIN'){
            
                dispatch(setRole('ADMIN'));
            }
        dispatch(authlogin(response.data.access_token));

    }).catch(err=>{
       
        dispatch(authFail(err.response));
        
    })

};

};


export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return{
        type:actionTypes.AUTH_LOGOUT
    };
};
export const checkTimeOut=(expirationTime)=>{
    return dispatch=>{

        setTimeout(()=>{
            dispatch(logout());

        },expirationTime*1000);
    };
};

export const authCheckState=()=>{
    let decodedToken = null;
    let authorities = null;
    return dispatch=>{
        const token =localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else{
                dispatch(authlogin(token));
                decodedToken = jwt(token);
                authorities = decodedToken.authorities[0];
            if(authorities==='ROLE_SELLER'){
    
                dispatch(setRole('SELLER'));
            }
            else if(authorities==='ROLE_CUSTOMER'){
            
                dispatch(setRole('CUSTOMER'));
            }
            else if(authorities==='ROLE_ADMIN'){
            
                dispatch(setRole('ADMIN'));
            }
                dispatch(checkTimeOut((expirationDate.getTime()-new Date().getTime())/1000));

            }
        }
    }
}

export const forgotPassword=(email)=>{
    return dispatch=>{
        axios.post('http://localhost:8080/forgot-password',
        {
            email:email
        })
        .then(response=>{

            
            dispatch(actions.setMessage('Email sent to reset password !!!'));
           

        }).catch(error=>{

            
           

        });

    }

    }