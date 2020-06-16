import React,{useState} from 'react';
import classes from './AdminCategory.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import AddCategory from './AddCategory/AddCategory';
import AddFieldValue from './AddFieldValue/AddFieldValue';
import AddMetadataField from './AddMetadataField/AddMetadataField';


const AdminCategory=(props)=>{


    const [addCategory,setAddCategory] = useState(false);

    const [addFieldValue,setAddFieldValue] = useState(false);
    const [addMetadataField,setAddMetadataField] = useState(false);


    const addCategoryHandler=()=>{

        setAddCategory(true);
        setAddFieldValue(false);
        setAddMetadataField(false);

    };

    const addFieldValueHandler=()=>{
        setAddCategory(false);
        setAddFieldValue(true);
        setAddMetadataField(false);

    };

    const addMetadataFieldHandler=()=>{
        setAddCategory(false);
        setAddFieldValue(false);
        setAddMetadataField(true);

    };
    let displayDetails = null;

    if(addCategory){

        displayDetails = <AddCategory/>

    }
    if(addFieldValue){

        displayDetails = <AddFieldValue/>

    }
    if(addMetadataField){

        displayDetails = <AddMetadataField/>

    }

    let finalDisplay = (

        <div>
            <div className={classes.Tab}>

        <button  onClick={()=>addCategoryHandler()}>Add category</button>
        <button  onClick={()=>addFieldValueHandler()}>Add field value category</button>
        <button  onClick={()=>addMetadataFieldHandler()}>Add metadata field</button>
        </div>
        {displayDetails}

    </div>

    );

   


    return(<React.Fragment>
        {finalDisplay}

    </React.Fragment>);
}

const mapStateToProps=state=>{
    return{
        categoryData:state.category.categoryData,
        isLogin:state.auth.isLogin

    };
};

const mapDispatchToProps=dispatch=>{ 
    return{

        onsetCategoryData:()=>dispatch(actions.categoryData()),

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AdminCategory);