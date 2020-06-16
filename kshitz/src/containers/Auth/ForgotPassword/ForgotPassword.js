import React,{useState} from 'react';
import {connect} from 'react-redux';
import Input from '../../../components/UI/Form/Input/Input';
import * as actions from '../../../reduxStore/actions/index';
import classes from './ForgotPassword.module.css';
import SuccessMessage from '../../../SuccessMessageHandler/SuccessMessage';

const ForgotPassword=(props)=>{

    const [emailForm,setEmailForm]=useState({
        Email: {
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Type Email'
            },
            value: '',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        }});

        

        const changedHandler=(event,id)=>{
            const updatedForms={
                ...emailForm,
                [id]:{
                    ...emailForm[id],
                    value:event.target.value,
                   }
            };
            setEmailForm(updatedForms);
        }


        const submitHandler=()=>{

           

            props.onForgotPassword(emailForm.Email.value);

            
          }

    


        const formElementArray=[];
        for(let key in emailForm){
            formElementArray.push({
                id:key,
                config:emailForm[key]
            });
        }
      let  updateDetails = 
        <div>
            {formElementArray.map(formElement=>(
                <strong>
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
        <SuccessMessage/>

    </div>);
}

const mapStateToProps=state=>{
    return{

        message:state.success.message,
        isSuccess:state.success.isSuccess

    };
};

const mapDispatchToProps=dispatch=>{
    return{

        onForgotPassword:(email)=>dispatch(actions.forgotPassword(email))

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);