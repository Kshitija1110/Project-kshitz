import React,{useEffect,useState} from 'react';
import classes from './AdminUser.module.css';
import * as actions from '../../../reduxStore/actions/index';
import {connect} from 'react-redux';
import Button from '../../UI/Form/Button/Button';


const AdminUser=(props)=>{

    const {onSetCustomerData,onSetSellerData,setSuccessNull,token}=props;

    useEffect(()=>{

        onSetCustomerData(token);
        onSetSellerData(token);
        setSuccessNull();

    },[onSetCustomerData,onSetSellerData,setSuccessNull,token]);

    const [showSeller,setShowSeller] = useState(false);
    const [showCustomer,setShowCustomer] = useState(false);
    const [heading,setHeading] = useState();
   

    const customerHandler=()=>{
        setShowCustomer(true);
        setShowSeller(false);
        setHeading(<h2 style={{marginLeft:'30px'}}>Customer:</h2>);
        

    };
    const sellerHandler=()=>{
        setShowCustomer(false);
        setShowSeller(true);
        setHeading(<h2 style={{marginLeft:'30px'}}>Seller:</h2>);
        

    };

    const activateCustomerHandler=(id)=>{

        props.activateCustomer(props.token,id);

    };
    const deactivateCustomerHandler=(id)=>{

        props.deactivateCustomer(props.token,id);

    };
    const activateSellerHandler=(id)=>{

        props.activateSeller(props.token,id);

    };
    const deactivateSellerHandler=(id)=>{

        props.deactivateSeller(props.token,id);

    };

    let displayDetails = null;
   

    if(showCustomer && props.customerData.length!==0){
        displayDetails = Object.keys(props.customerData).map(igkey=> {
            return [...Array(props.customerData[igkey])].map(key => {  
                        return <tr key ={igkey}>
                        <td className={classes.Td}>{key.username}</td>
                        <td className={classes.Td}>{key.email}</td>
                        <td className={classes.Td}><Button btnType="Success" clicked={()=>activateCustomerHandler(key.id)} disabled={key.active}>Activate</Button></td>
                        <td className={classes.Td}><Button btnType="Danger" clicked={()=>deactivateCustomerHandler(key.id)} disabled={!key.active}>Deactivate</Button></td>
                        </tr>;
            });
        });
    }

    if(showSeller && props.sellerData.length!==0){
        displayDetails = Object.keys(props.sellerData).map(igkey=> {
            return [...Array(props.sellerData[igkey])].map(key => {  
                        return <tr key ={igkey}>
                        <td className={classes.Td}>{key.username}</td>
                        <td className={classes.Td}>{key.email}</td>
                        <td className={classes.Td}><Button btnType="Success"  clicked={()=>activateSellerHandler(key.id)} disabled={key.active}>Activate</Button></td>
                        <td className={classes.Td}><Button btnType="Danger"  clicked={()=>deactivateSellerHandler(key.id)} disabled={!key.active}>Deactivate</Button></td>
                        </tr>;
            });
        });
    }

    

    let finalDisplay =(
        <div>
            <div className={classes.Tab}>

       <button  onClick={()=>customerHandler()} >View Customer</button> 
       <button  onClick={()=>sellerHandler()} >View Seller</button> 

       </div>
       {heading}
       <table className={classes.Table}>
           <tbody>
       {displayDetails}
       </tbody>
       </table>

    </div>

    );

    

    return(<React.Fragment>
        {finalDisplay}
    </React.Fragment>);
}

const mapStateToProps=state=>{
    return{
        sellerData:state.admin.sellerData,
        customerData:state.admin.customerData,
        token:state.auth.token,
        isLogin:state.auth.isLogin
    };
};

const mapDispatchToProps=dispatch=>{
    return{

        onSetCustomerData:(token)=>dispatch(actions.setAdminCustomer(token)),
        onSetSellerData:(token)=>dispatch(actions.setAdminSeller(token)),
        activateCustomer:(token,id)=>dispatch(actions.activateCustomer(token,id)),
        deactivateCustomer:(token,id)=>dispatch(actions.deactivateCustomer(token,id)),
        activateSeller:(token,id)=>dispatch(actions.activateSeller(token,id)),
        deactivateSeller:(token,id)=>dispatch(actions.deactivateSeller(token,id)),
        setSuccessNull:()=>dispatch(actions.setSuccessFail())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminUser);