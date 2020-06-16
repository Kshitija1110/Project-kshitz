import React,{useState} from 'react';
import {connect} from 'react-redux';
import Input from '../../../UI/Form/Input/Input';
import classes from './UpdateProduct.module.css';
import * as actions from '../../../../reduxStore/actions/index';
import ErrorHandler from '../../../../ErrorHandler/ErrorHandler';
import SuccessMessage from '../../../../SuccessMessageHandler/SuccessMessage';

const UpdateProduct=(props)=>{
    

    const [editForm,setEditForm]=useState({
        name: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Product Name'
            },
            value: props.name,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        description:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Add description'
            },
            value:props.description,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        }});

        const changedHandler=(event,id)=>{
            const updatedForms={
                ...editForm,
                [id]:{
                    ...editForm[id],
                    value:event.target.value,
                   }
            };
            setEditForm(updatedForms);
           
        }

        const submitHandler=()=>{

        props.onUpdateProduct(props.token,props.id,editForm.name.value,
            editForm.description.value);

            
          }

        const formElementArray=[];
        for(let key in editForm){
            formElementArray.push({
                id:key,
                config:editForm[key]
            });
        }
      let  updateDetails = null;
      
      updateDetails =  <div>
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
            <button className={classes.Button} onClick={()=>submitHandler()}>Submit</button>
</div>
      


    return(<div>
        {updateDetails}
        <ErrorHandler/>
        <SuccessMessage/>
    </div>);
}

const mapStateToProps=state=>{
    return{
       
        token: state.auth.token
    };

};

const mapDispatchToProps=dispatch=>{
    return{

       onUpdateProduct:(token,id,name,description)=>dispatch(actions.updateProduct(token,id,name,description))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateProduct);
