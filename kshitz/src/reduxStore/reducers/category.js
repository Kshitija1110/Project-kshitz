import * as actionTypes from '../actions/actionTypes';

const initialState={
    categoryData:[]

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.SET_CATEGORY_DATA:
            return{

                ...state,
                categoryData:action.data


            };

        

        default:return state;


    }

};

export default reducer;
