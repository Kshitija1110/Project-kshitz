import React, {useEffect,useState} from 'react';
import Input from '../../UI/Form/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import classes from './CustomerAddress.module.css';

const CustomerAddress=(props)=>{

    useEffect(()=>{

        props.onSetCustomerAddress(props.token);
    },[props.onSetCustomerAddress,props.token]);

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
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Enter Label'
            },
            value:'',
            validation:{
                required:true,
                minLength:6,
                maxLength:6
            },
            isValid:false,
            touched:false
        }});

    const [showForm,setShowForm] = useState(false);



    let addressDetails=null;

    const addAddressHandler=()=>{
        console.log('inside Add address');
        setShowForm(true);
        
 }
    const changedHandler=(event,id)=>{
        const updatedForms={
            ...addressForm,
            [id]:{
                ...addressForm[id],
                value:event.target.value,
               }
        };
        setAddressForm(updatedForms);
        console.log(addressForm[id].value);
    }

    const submitHandler=()=>{
        const data ={
            city: addressForm.city.value,
            state: addressForm.state.value,
            country: addressForm.country.value,
            zipCode: addressForm.zipCode.value,
            label: addressForm.label.value
        }
        props.onAddCustomerAddress(props.token,addressForm.city.value,
            addressForm.state.value,
            addressForm.country.value,
            addressForm.zipCode.value,
            addressForm.label.value);
            setShowForm(false);
    }

    

    if(props.addressData.length!==0){
        let addresses = { ...props.addressData};
        let number =0;
        console.log('inside addresses',addresses);

     addressDetails =  Object.keys(addresses).map(igkey=>{
             return [...Array(addresses[igkey])].map(key=>{  
                 
                 return <div>
                     <h1>Address: {++number}</h1>
             <p>City: {key.city}</p>
             <p>State: {key.state}</p>
             <p>Country: {key.country}</p>
             <p>Zipcode: {key.zipCode}</p>
             <p>Label: {key.label}</p>
             </div>
             });

        
        });
        
    } else{
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
            <button className={classes.Button}>Submit</button>

        </form>
    }

    return(
        <div>
            {addressDetails}
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
        onAddCustomerAddress:(token,city,state,country,zipcode,label)=>dispatch(actions.addCustomerAddress(token,city,state,country,zipcode,label))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerAddress);