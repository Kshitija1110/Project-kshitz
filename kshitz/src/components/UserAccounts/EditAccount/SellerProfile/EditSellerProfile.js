import React,{useState} from 'react';
import Input from '../../../UI/Form/Input/Input';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../reduxStore/actions/index';
import classes from './EditSellerProfile.module.css';
import UpdatePassword from './UpdatePassword/UpdatePassword';

const EditSellerProfile =(props)=>{

    const {userData,token,onUpdateProfile} = props;

    const [profileForm,setAddressForm]=useState({
        firstName: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Edit firstName'
            },
            value:userData.firstName,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        middleName:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Edit middleName'
            },
            value:userData.middleName,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        lastName:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Edit lastName'
            },
            value:userData.lastName,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        gst:{
            elementType:'input',
            elementConfig:{
                type:'number',
                placeholder:'Edit gst'
            },
            value:userData.gst,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        companyName:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Edit companyName'
            },
            value:userData.companyName,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        
        contactNumber:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Edit contact number'
            },
            value:userData.companyContact,
            validation:{
                required:true,
                minLength:6,
                maxLength:6
            },
            isValid:false,
            touched:false
        }});

        const [showEdit,setShowEdit] = useState(true);
        const [updatePassword,setUpdatePassword] = useState(false);

        const changedHandler=(event,id)=>{
            const updatedForms={
                ...profileForm,
                [id]:{
                    ...profileForm[id],
                    value:event.target.value,
                   }
            };
            setAddressForm(updatedForms);
           
        }

        const updatePasswordHandler=()=>{

            setUpdatePassword(true);

        }

        const submitHandler=()=>{

        
            onUpdateProfile(token,profileForm.firstName.value,
                profileForm.middleName.value,
                profileForm.lastName.value,
                profileForm.contactNumber.value,
                profileForm.gst.value,
                profileForm.companyName.value);

                setShowEdit(false);

            
          }

    


        const formElementArray=[];
        for(let key in profileForm){
            formElementArray.push({
                id:key,
                config:profileForm[key]
            });
        }
        let updateDetails = null;
        if(showEdit){
        updateDetails = 
        <div>
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
            <p><button className={classes.Update} onClick={()=>updatePasswordHandler()}>Update Password</button></p>
            <button className={classes.Button} onClick={()=>submitHandler()}>Submit</button>
</div>
        }
        else {
            props.onSetUpdateMessage('Profile updated Successfully !!!');
            updateDetails = <Redirect to = '/update'/>
        }

        if(updatePassword){

            updateDetails = <UpdatePassword/>
            
        }



    return(<div>
        {updateDetails}

    </div>);
}

const mapStateToProps=state=>{
    return{
        token: state.auth.token,
        userData:state.account.userData
    };

};

const mapDispatchToProps=dispatch=>{
    return{

        onUpdateProfile:(token,firstName,middleName,lastName,contactNumber,gst,companyName)=>dispatch(actions.updateSellerProfile(token,firstName,middleName,lastName,contactNumber,gst,companyName)),
        onSetUpdateMessage:(data)=>dispatch(actions.setUpdateMessage(data))
        
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(EditSellerProfile);
