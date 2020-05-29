import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../reduxStore/actions/index';
import classes from './ProductVariations.module.css';

const ProductVariations=(props)=>{

    const{onViewProductVariations,onAddToCart,productId,variationId,token,isAuthenticated,productVariation}=props;

    const[authRedirect,setAuthRedirect] = useState();


    useEffect(()=>{
        console.log('inside productvariations',productId);
     onViewProductVariations(productId);

     },[onViewProductVariations,productId]);


     const cartHandler=()=>{

        console.log('inside cart handler');
        if(isAuthenticated){
        onAddToCart(variationId,token);
        }
        else
        {
            console.log('else');
            setAuthRedirect(<Redirect to='/login'/>);
        }

        

     }

     let viewDetails = null;

     let variationData =    Object.keys(productVariation).map(igkey=> {
         console.log(productVariation[igkey].primaryImageName);
         viewDetails = <div className={classes.ProductVariation}>
                                  <img className={classes.Box} src = {require('/home/kshitija/kshitz/src/assets/Images/'+productVariation[0].primaryImageName)}/>
                                  <strong className={classes.PhotoName}>Name: {productVariation[0].product.name}</strong>
                                  <p>Brand: {productVariation[0].product.brand}</p>
                                  <p>Description: {productVariation[0].product.description}</p>
                                  <p>Price: Rs. {productVariation[0].price} /-</p>
                                  <button className={classes.Button} onClick={()=>cartHandler()}>Add to cart</button>
                                  <button className={classes.Button}>Buy now</button>
                                  
                              </div>

        return [...Array(productVariation[igkey])].map(key => {  
                 console.log(key.primaryImageName) ; 
    
                              console.log(true);
                              
                               //Object.key =>[salad]=>igkey=salad=>mapping give array inside array =>[2].map=>[2 times return burger ingredient with igkey(salad) as type]
                    return {image:key.primaryImageName,
                            price: key.price,
                            name:key.product.name,
                            description:key.product.description,
                            brand:key.product.brand,
                            metadata:key.metadata};

        });
        
    
    });


    console.log(productVariation);

    

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
        onAddToCart:(variationId,token)=>dispatch(actions.addToCart(variationId,token))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductVariations);