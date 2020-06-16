import React, {useState} from 'react';
import Input from '../../../UI/Form/Input/Input';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../../reduxStore/actions/index';
import classes from './EditAddress.module.css';

const EditAddress=(props)=>{

    const {prevValues,token,onUpdateAddress} = props;

    const [editForm,setEditForm]=useState({
        city: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Edit city'
            },
            value: prevValues.city,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        state:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Edit state'
            },
            value:prevValues.state,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        country:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Edit country'
            },
            value:prevValues.country,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        
        zipCode:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Edit zipcode'
            },
            value:prevValues.zipCode,
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        label:{
            elementType:'select',
            elementConfig:{
                options:[{value:'Home',displayValue:'Home'},
                {value:'Office',displayValue:'Office'}
            ]
            },
            isValid:true,
            validation:{},
            value:prevValues.label
         }});

        const [updated,setUpdated] = useState(false);



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


            onUpdateAddress(token,editForm.city.value,
                editForm.state.value,
                editForm.country.value,
                editForm.zipCode.value,
                editForm.label.value);

                setUpdated(true);

            
          }

    


        const formElementArray=[];
        for(let key in editForm){
            formElementArray.push({
                id:key,
                config:editForm[key]
            });
        }
      let  updateDetails = 
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
            <button className={classes.Button} onClick={()=>submitHandler()}>Submit</button>
</div>
        
        
if(updated){
    props.onSetUpdateMessage('Address Updated Successfully!!!');
    updateDetails = <Redirect to = '/update'/>
}


    return(<div>
        {updateDetails}

    </div>);
}

const mapStateToProps=state=>{
    return{
        token: state.auth.token,
        prevValues:state.account.editAddressData
    };

};

const mapDispatchToProps=dispatch=>{
    return{

        onUpdateAddress:(token,city,state,country,zipcode,label)=>dispatch(actions.updateSellerAddress(token,city,state,country,zipcode,label)),
        onSetUpdateMessage:(data)=>dispatch(actions.setUpdateMessage(data))
        
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(EditAddress);