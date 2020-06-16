import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setCategoryData=(data)=>{
    return{
        type:actionTypes.SET_CATEGORY_DATA,
        data:data
    };
};

export const categoryData=()=>{

    return dispatch=>{

        axios.get('http://localhost:8080/view-all-category')
        .then(response=>{
            
            dispatch(setCategoryData(response.data));
        }).catch(error=>{
            

        })
    }
}

