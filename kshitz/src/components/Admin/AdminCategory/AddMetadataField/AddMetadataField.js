import React,{useEffect,useState} from 'react';
import classes from './AddMetadataField.module.css';
import { connect } from 'react-redux';
import Input from '../../../UI/Form/Input/Input';
import * as actions from '../../../../reduxStore/actions/index';
import ErrorHandler from '../../../../ErrorHandler/ErrorHandler';
import SuccessMessage from '../../../../SuccessMessageHandler/SuccessMessage';


const AddMetadataField=(props)=>{

    const {onsetMetadata,setSuccessNull,token}=props;

    useEffect(()=>{
        onsetMetadata(token);
        setSuccessNull();
    },[onsetMetadata,setSuccessNull,token]);


    
    const [addForm,setAddForm]=useState({
        name: {
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
                  
                   return(<div className = {classes.Category} key ={igkey} >
                       <p>{key.name}</p>
                   </div>)
        
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

        props.onAddMetadataField(props.token,addForm.name.value);
        
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
            {metadataName}
            
           <p> <button className={classes.Button} onClick={()=>submitHandler()}>Submit</button> </p>
           
           <ErrorHandler/>
           <SuccessMessage/>
</div>


    
    

    return(<div>

        {addDetails}
       

    </div>);
}

const mapStateToProps=state=>{
    return{

        metadataField:state.admin.metadataField,
        token:state.auth.token
    };
};

const mapDispatchToProps=dispatch=>{ 
    return{

        onsetMetadata:(token)=>dispatch(actions.adminMetadata(token)),
        onAddMetadataField:(token,name)=>dispatch(actions.addMetadataFields(token,name)),
        setSuccessNull:()=>dispatch(actions.setSuccessFail())

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AddMetadataField);