import React, {useEffect,useState} from 'react';
import Input from '../../UI/Form/Input/Input';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import classes from './CustomerAddress.module.css';
import EditAddress from './EditAddress/EditAddress';
import { checkValidity } from '../../../shared/utility';

const CustomerAddress=(props)=>{

    const {onSetCustomerAddress,onSetEditAddress,onDeleteAddress,onAddCustomerAddress,token,addressData}=props;

    useEffect(()=>{

        onSetCustomerAddress(token);
    },[onSetCustomerAddress,token]);

    const [addressForm,setAddressForm]=useState({
        city: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Enter City'
            },
            value:'',
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
                placeholder:'Enter state'
            },
            value:'',
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
                placeholder:'Enter country'
            },
            value:'',
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
                placeholder:'Enter ZipCode'
            },
            value:'',
            validation:{
                required:true,
                minLength:6,
                maxLength:6
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
            value:'Home'
         }});

    const [showForm,setShowForm] = useState(false);
    const [addressDeleted,setAddressDeleted] = useState(false);
    const [editAddress,setEditAddress] = useState(false);
    const [id,setId] =useState();
    const [formIsValid,setFormIsValid]= useState(false);



    let addressDetails=null;

    const addAddressHandler=()=>{
        setShowForm(true);
        
 }
 const editHandler=(id)=>{
     setId(id);
     let addresses = { ...addressData};

     Object.keys(addresses).map(igkey=>{
       return [...Array(addresses[igkey])].map(key=>{  
            if(key.id===id){
                onSetEditAddress(key);
                return null;
            }
            return null;
        
        })
    })
     setEditAddress(true);
 }
    const changedHandler=(event,id)=>{
        const updatedForms={
            ...addressForm,
            [id]:{
                ...addressForm[id],
                value:event.target.value,
                isValid: checkValidity(event.target.value, addressForm[id].validation)
               }
        };
        let formIsValid=true;
        for(let id in addressForm){
            formIsValid = addressForm[id].isValid && formIsValid
             }
        setAddressForm(updatedForms);
        setFormIsValid(formIsValid);

       
    }

    const submitHandler=()=>{
        
        onAddCustomerAddress(token,addressForm.city.value,
            addressForm.state.value,
            addressForm.country.value,
            addressForm.zipCode.value,
            addressForm.label.value);
            setShowForm(false);
    }

    const deleteAddressHandler=(id)=>{

        onDeleteAddress(token,id); 
        setAddressDeleted(true);
        

    }


    if(addressData.length!==0){
        let addresses = { ...addressData};
        let number =0;
        

     addressDetails =  Object.keys(addresses).map(igkey=>{
             return [...Array(addresses[igkey])].map(key=>{  
                

                
                 
                 return <div key ={igkey}>
                     <h1>Address: {++number}</h1>
             <p>City: {key.address.city}</p>
             <p>State: {key.address.state}</p>
             <p>Country: {key.address.country}</p>
             <p>Zipcode: {key.address.zipCode}</p>
             <p>Label: {key.address.label}</p>
             <button className={classes.Button2} onClick={()=>editHandler(key.id)} >Edit Address</button>
            <button className={classes.Button2} onClick={()=>deleteAddressHandler(key.id)} >Delete address</button>
             </div>
             });

        
        });
        
    }
    else if(addressDeleted){
       
        addressDetails = <Redirect to ='/account'/>
    } 
    else{
        addressDetails = <div>
            <h1>No addresses found !!!</h1>
            <button className={classes.Button} onClick={()=>addAddressHandler()}>Add address</button>
        </div>
    }

    if(showForm){
        const formElementArray=[];
        for(let key in addressForm){
            formElementArray.push({
                id:key,
                config:addressForm[key]
            });
        }
        addressDetails = 
        <form onSubmit={()=>submitHandler()} >
            {formElementArray.map(formElement=>(
                <Input
                key={formElement.id} elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                changed={(event)=>changedHandler(event,formElement.id)}
                invalid={!formElement.config.isValid}
                shouldValidate={formElement.config.validation}
                touched={formElement.touched}/>
            ))}
            <button className={classes.Button} disabled={!formIsValid}>Submit</button>

        </form>
    }

    if(editAddress){
        addressDetails = <EditAddress id={id}/>
    }

    return(
        <div>
            {addressDetails}
            <button className={classes.Button} onClick={()=>addAddressHandler()}>Add address</button>
        </div>
    );
}

const mapStateToProps=state=>{
    return{
        token: state.auth.token,
    addressData:state.account.customerAddress,
    };

};

const mapDispatchToProps=dispatch=>{
    return{
        onSetCustomerAddress:(token)=>dispatch(actions.viewCustomerAddress(token)),
        onAddCustomerAddress:(token,city,state,country,zipcode,label)=>dispatch(actions.addCustomerAddress(token,city,state,country,zipcode,label)),
        onDeleteAddress:(token,id)=>dispatch(actions.deleteAddress(token,id)),
        onSetEditAddress:(data)=>dispatch(actions.setEditAddressData(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerAddress);