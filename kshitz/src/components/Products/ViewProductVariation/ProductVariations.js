import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../reduxStore/actions/index';
import classes from './ProductVariations.module.css';

const ProductVariations=(props)=>{

    const{onViewProductVariations,onAddToCart,productId,token,isAuthenticated,productVariation}=props;

    const[authRedirect,setAuthRedirect] = useState();

    const [continueCart,setContinueCart] = useState(false);


    useEffect(()=>{
     onViewProductVariations(productId);

     },[onViewProductVariations,productId]);


     const cartHandler=(productVarId)=>{

        if(isAuthenticated){
        onAddToCart(productVarId,token);
        setContinueCart(true);
        }
        else
        {
          
            props.onsetAuthRedirectPath('/product');
            setAuthRedirect(<Redirect to='/login'/>);
        }

        

     }
     const buyProductHandler=(productId,variationId)=>{
         props.onsetProductId(productId,variationId);
        setAuthRedirect(<Redirect to = '/order/product'/>);
    }

     let viewDetails = null;

      viewDetails =    Object.keys(productVariation).map(igkey=> {
         
         return <div className={classes.ProductVariation} key ={igkey}>
                                  <img className={classes.Box} src = {require('/home/kshitija/kshitz/src/assets/Images/'+productVariation[igkey].primaryImageName)} alt='product variation'/>
                                  <strong className={classes.PhotoName}>Name: {productVariation[igkey].product.name}</strong>
                                  <p>Brand: {productVariation[igkey].product.brand}</p>
                                  <p>Description: {productVariation[igkey].product.description}</p>
                                  <p>Size: {productVariation[igkey].metadata.Size}</p>
                                  <p>Colour: {productVariation[igkey].metadata.Colour}</p>
                                  <p>Price: Rs. {productVariation[igkey].price} /-</p>
                                  <button className={classes.Button} onClick={()=>cartHandler(productVariation[igkey].id)}>Add to cart</button>
                                  <button className={classes.Button } onClick={()=>buyProductHandler(productVariation[igkey].product.id,productVariation[igkey].id)}>Buy now</button>
                                  
                              </div>
     });

      

        if(continueCart){
            viewDetails = <h1>Item added to cart !!!</h1>
        }
  
return(<React.Fragment>
    {authRedirect}
    {viewDetails}
    
</React.Fragment>);

};

const mapStateToProps=state=>{
    return{

        productVariation:state.product.productVariation,
        productId:state.product.productId,
        variationId:state.product.variationId,
        token: state.auth.token,
        isAuthenticated :state.auth.token!==null

    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onViewProductVariations:(id)=>dispatch(actions.viewProductVariation(id)),
        onAddToCart:(variationId,token)=>dispatch(actions.addToCart(variationId,token)),
        onsetProductId:(productId,variationId)=>dispatch(actions.setProductId(productId,variationId)),
        onsetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductVariations);