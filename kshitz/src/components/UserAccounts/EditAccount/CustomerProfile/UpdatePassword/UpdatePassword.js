import React, {useState} from 'react';
import Input from '../../../../UI/Form/Input/Input';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../../reduxStore/actions/index';
import classes from './UpdatePassword.module.css';
import ErrorHandler from '../../../../../ErrorHandler/ErrorHandler';

const UpdatePassword=(props)=>{

    const [passwordForm,setPasswordForm]=useState({
        oldPassword: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Enter Old Password'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        newPassword:{
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder:'Enter New Password'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        confirmPassword:{
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder:'Enter password again'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        
        });
       
        

        const changedHandler=(event,id)=>{
            const updatedForms={
                ...passwordForm,
                [id]:{
                    ...passwordForm[id],
                    value:event.target.value,
                   }
            };
            setPasswordForm(updatedForms);
    
        }

        const submitHandler=()=>{

            props.onUpdatePassword(props.token,passwordForm.oldPassword.value,
                passwordForm.newPassword.value,
                passwordForm.confirmPassword.value);

           
                

           
          }


        const formElementArray=[];
        for(let key in passwordForm){
            formElementArray.push({
                id:key,
                config:passwordForm[key]
            });
        }
    
       let updateDetails = null;
       updateDetails = <div>
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
            <ErrorHandler/>
            <button className={classes.Button} onClick={()=>submitHandler()}>Submit</button>
</div>
       if(props.isSuccess){
           props.onSetUpdateMessage('Password updated successfully!!!');
           updateDetails=<Redirect to = '/update'/>
       }
       

    return(<div>
        {updateDetails}
    </div>);


}

const mapStateToProps=state=>{
    return{
        token: state.auth.token,
        isSuccess:state.success.isSuccess
    };

};

const mapDispatchToProps=dispatch=>{
    return{

        onUpdatePassword:(token,oldPassword,newPassword,confirmPassword)=>dispatch(actions.updatePassword(token,oldPassword,newPassword,confirmPassword)),
        onSetUpdateMessage:(data)=>dispatch(actions.setUpdateMessage(data))
        
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdatePassword);