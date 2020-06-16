import React,{useState} from 'react';
import {connect} from 'react-redux';
import Input from '../../../UI/Form/Input/Input';
import classes from './UpdateVariation.module.css';
import * as actions from '../../../../reduxStore/actions/index';
import ErrorHandler from '../../../../ErrorHandler/ErrorHandler';
import SuccessMessage from '../../../../SuccessMessageHandler/SuccessMessage';

const UpdateProduct=(props)=>{
    

    const [editForm,setEditForm]=useState({
        Price: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Product Name'
            },
            value: props.price,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        Quantity:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Add description'
            },
            value:props.quantity,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        Colour: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Colour'
            },
            value: props.colour,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        Size: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Size'
            },
            value: props.size,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        Image: {
            elementType:'file',
            elementConfig:{
                type:'file'
                
            },
            value: '',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        }
    });

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

            let fileValue = editForm.Image.value;
           let imageName = fileValue.replace(/^.*\\/, "");

            props.onUpdateProductVariation(props.token,props.id,editForm.Price.value,
                editForm.Quantity.value,editForm.Colour.value,
                editForm.Size.value,imageName);

            
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

       onUpdateProductVariation:(token,id,price,quantity,colour,size,image)=>dispatch(actions.updateProductVariation(token,id,price,quantity,colour,size,image))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateProduct);
