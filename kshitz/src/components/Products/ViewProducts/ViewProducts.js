import React, { useEffect,useState} from 'react';
import {connect } from 'react-redux';
import classes from './ViewProducts.module.css';
import {Redirect } from 'react-router-dom';
import * as actions from '../../../reduxStore/actions/index';
import Auth from '../../../containers/Auth/Auth';


const ViewProducts=(props)=>{

    const {fromCategory,onViewProducts}=props;

    useEffect(()=>{
        if(!fromCategory){

        onViewProducts(0);
        }

    },[onViewProducts,fromCategory]);


    const [count,setCount] = useState(0);
    const [isClicked,setIsClicked] = useState(false);
    

    const imageClickHandler=(productId,variationId)=>{
        

       
        setIsClicked(true);
        props.onsetProductId(productId,variationId);
     };

   
   let productDetails = null;


    if(props.products && !isClicked){
        

    productDetails =    Object.keys(props.products).map(igkey=> {
        return [...Array(props.products[igkey])].map(key => {  
                
                    return <div className={classes.Product} key ={igkey}>
                    <img onClick={()=>imageClickHandler(key.product.id,key.id)} className={classes.Photo}  src = {require('/home/kshitija/kshitz/src/assets/Images/'+key.primaryImageName)} alt='product'/>
                    <strong>{key.product.name}</strong>
                    <p>Rs.{key.price} /-</p>
                </div>;
        });
    });
  
  
    }

    let authRedirect=null;

    if(isClicked){
        authRedirect = <Redirect to ='/products/product-variation'/>
    }

    let loginModal = null;

    if(props.loginClicked){
        loginModal = <Auth/>
    }

    

const submitNextHandler=()=>{

    if(props.products.length!==0)
{
    setCount(count+1);
    props.onViewProducts(count+1);

}

    }
    const submitPrevHandler=()=>{

        if(count>=0)
    {
        setCount(count-1);
        props.onViewProducts(count-1);
    
    }
    
        }


    return(<div>
        <marquee> <h1 style={{fontFamily:'Sigmar One, cursive'}}>Summer sale 50% off on every Product ! !</h1></marquee>
        <button className={classes.Button1} onClick={submitPrevHandler}> <h3>prev</h3> </button>
        {authRedirect}
        {productDetails}
        {loginModal}
        
        <button className={classes.Button2} onClick={submitNextHandler}><h3>next</h3></button>
        </div>
    );



};

const mapStateToProps=state=>{
    return{
        products:state.product.productData,
        loginClicked:state.showFields.loginClicked
    }
}

const mapDispatchToProps=dispatch=>{
    return{
onViewProducts: (count)=>dispatch(actions.viewProducts(count)),
onsetProductId:(productId,variationId)=>dispatch(actions.setProductId(productId,variationId))
};
    
};

export default connect(mapStateToProps,mapDispatchToProps)(ViewProducts);