import React,{useEffect,useState} from 'react';
import classes from './AdminProduct.module.css';
import * as actions from '../../../reduxStore/actions/index';
import {connect} from 'react-redux';
import Button from '../../UI/Form/Button/Button';


const AdminProduct=(props)=>{

    const {onSetAdminProduct,setSuccessNull,token}=props;

    useEffect(()=>{

       onSetAdminProduct(token);
       setSuccessNull();

    },[onSetAdminProduct,token,setSuccessNull]);

    const [showProduct,setShowProduct] = useState(false);
   

    const productHandler=()=>{
        setShowProduct(true);
    }

    const activateProductHandler=(id)=>{

        props.activateProduct(props.token,id);

    };

    const deactivateProductHandler=(id)=>{

        props.deactivateProduct(props.token,id);

    };


    
    let displayDetails = null;

    if(showProduct && props.productData.length!==0){
        displayDetails = Object.keys(props.productData).map(igkey=> {
            return [...Array(props.productData[igkey])].map(key => {  
                        return <tr key ={igkey}>
                        <td className={classes.Td}>{key.name}</td>
                        <td className={classes.Td}>{key.brand}</td>
                        <td className={classes.Td}><Button btnType="Success" clicked={()=>activateProductHandler(key.id)} disabled={key.active}>Activate</Button></td>
                        <td className={classes.Td}><Button btnType="Danger" clicked={()=>deactivateProductHandler(key.id)} disabled={!key.active}>Deactivate</Button></td>
                        </tr>;
            });
        });
    }

    let finalDisplay = (

        <div>
            <div className={classes.Tab}>

       <button  onClick={()=>productHandler()}>View Product</button>
       </div>
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
        
        token:state.auth.token,
        productData:state.admin.productData,
        isLogin:state.auth.isLogin
    };
};

const mapDispatchToProps=dispatch=>{
    return{

        onSetAdminProduct:(token)=>dispatch(actions.setAdminProduct(token)),
        activateProduct:(token,id)=>dispatch(actions.activateProduct(token,id)),
        deactivateProduct:(token,id)=>dispatch(actions.deactivateProduct(token,id)),
        setSuccessNull:()=>dispatch(actions.setSuccessFail())


    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminProduct);