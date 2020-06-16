import React,{useEffect,useState} from 'react';
import classes from './AddFieldValue.module.css';
import { connect } from 'react-redux';
import Input from '../../../UI/Form/Input/Input';
import * as actions from '../../../../reduxStore/actions/index';
import SuccessMessage from '../../../../ErrorHandler/ErrorHandler';
import ErrorHandler from '../../../../ErrorHandler/ErrorHandler';


const AddMetadataField=(props)=>{

    const {onsetMetadata,onsetCategoryData,setSuccessNull,token}=props;

    useEffect(()=>{
        onsetMetadata(token);
        onsetCategoryData();
        setSuccessNull();
    },[onsetMetadata,onsetCategoryData,setSuccessNull,token]);

    const [metadataId,setMetadataId] = useState(1);
    const [categoryId,setCategoryId] = useState();
    

    const [addForm,setAddForm]=useState({
        values: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Enter field Name'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        }});

       
    
 let metadataName = Object.keys(props.metadataField).map(igkey=>{

                return [...Array(props.metadataField[igkey])].map(key=>{  
                   
                   return( 
                   <option key={igkey} value={key.id}>{key.name}</option>
                    );
        
                });
           });

    let  categories = Object.keys(props.categoryData).map(igkey=>{

        return [...Array(props.categoryData[igkey])].map(key=>{  
            
           return(
               <option key={igkey} value={key.id}>{key.name}</option>
          );

        });
   });




    const changedHandler=(event,id)=>{
        const updatedForms={
            ...addForm,
            [id]:{
                ...addForm[id],
                value:event.target.value,
               }
        };
        setAddForm(updatedForms);
        
    }

    const submitHandler=()=>{

        

        props.onAddFieldValueCategory(props.token,categoryId,metadataId,addForm.values.value);
    
       
    };

    const formElementArray=[];
        for(let key in addForm){
            formElementArray.push({
                id:key,
                config:addForm[key]
            });
        }
        let addDetails = null;
        
        
       
        addDetails = 
        <div className={classes.Box}>
            {formElementArray.map(formElement=>(
                <strong key={formElement.id}>
                    {formElement.id} :
                <Input
                key={formElement.id} elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                changed={(event)=>changedHandler(event,formElement.id)}
                invalid={!formElement.config.isValid}
                shouldValidate={formElement.config.validation}
                touched={formElement.touched}/></strong>
            ))}
            <h3> Metadata Names :</h3>
            <select onChange={(e)=>setMetadataId(e.target.value)}>
            {metadataName}
            </select>
            
            <h3>Categories :</h3>
            <select onChange={(e)=>setCategoryId(e.target.value)} >
            {categories}
            </select>
            
            <ErrorHandler/>
            <SuccessMessage/>
            
           <p> <button className={classes.Button} onClick={()=>submitHandler()}>Submit</button> </p>
</div>


    
    

    return(<div>

        {addDetails}
        

    </div>);
}

const mapStateToProps=state=>{
    return{

        metadataField:state.admin.metadataField,
        categoryData:state.admin.categoryData,
        token:state.auth.token
    };
};

const mapDispatchToProps=dispatch=>{ 
    return{

        onsetMetadata:(token)=>dispatch(actions.adminMetadata(token)),
        onsetCategoryData:()=>dispatch(actions.adminCategoryData()),
        onAddFieldValueCategory:(token,categoryId,metadataId,value)=>dispatch(actions.addFieldValueCategory(token,categoryId,metadataId,value)),
        setSuccessNull:()=>dispatch(actions.setSuccessFail())

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AddMetadataField);