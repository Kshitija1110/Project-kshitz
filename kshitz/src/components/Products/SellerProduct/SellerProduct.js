import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import classes from './SellerProduct.module.css';
import AddProduct from './AddProduct/AddProduct';
import AddVariation from './AddVariation/AddVariation';
import UpdateProduct from './UpdateProduct/UpdateProduct';
import UpdateVariation from './UpdateVariation/UpdateVariation';



const SellerProduct = (props)=>{

    const [showProduct,setShowProduct] = useState(false);
    const [addProduct,setAddProduct] = useState(false);
    const [updateComponent,setUpdateComponent] = useState();
    const [updateProduct,setUpdateProduct] = useState(false);
    const [updateProductVariation,setUpdateProductVariation] = useState(false);
    const [addProductVariation,setAddProductVariation] = useState(false);
    const [showProductVariation,setShowProductVariation] = useState(false);


    const viewProductHandler=()=>{

        props.onViewProducts(props.token);
        setShowProduct(true);
        setShowProductVariation(false);
        setAddProduct(false);
        setUpdateProduct(false);
        setUpdateProductVariation(false);
        setAddProductVariation(false);

    }
    const viewProductVariationHandler=(productId)=>{

        props.onViewProductVariation(props.token,productId);
        setShowProductVariation(true);
        setShowProduct(false);
        setAddProduct(false);
        setUpdateProduct(false);
        setAddProductVariation(false);
        setUpdateProductVariation(false);


    }
    const addProductHandler=()=>{

        setAddProduct(true);
        setShowProductVariation(false);
        setShowProduct(false);
        setUpdateProduct(false);
        setAddProductVariation(false);
        setUpdateProductVariation(false);
    }
    const deleteProductHandler=(id)=>{

        setAddProduct(false);
        setShowProductVariation(false);
        setShowProduct(true);
        setUpdateProduct(false);
        setAddProductVariation(false);
        setUpdateProductVariation(false);
        props.onDeleteProduct(props.token,id);
    }
    const updateProductHandler=(name,description,id)=>{

        setUpdateComponent(<UpdateProduct name={name} description={description} id={id}/>)
        setAddProduct(false);
        setUpdateProduct(true);
        setShowProductVariation(false);
        setShowProduct(false);
        setAddProductVariation(false);
        setUpdateProductVariation(false);
    }
    const updateProductVariationHandler=(id,price,quantity,colour,size,image)=>{

        setUpdateComponent(<UpdateVariation id={id} price={price} quantity={quantity} colour={colour} size={size} image={image}/>)
        setAddProduct(false);
        setUpdateProduct(false);
        setShowProductVariation(false);
        setShowProduct(false);
        setAddProductVariation(false);
        setUpdateProductVariation(true);
    }
    const addProductVariationHandler=()=>{
        setAddProductVariation(true);
        setAddProduct(false);
        setUpdateProduct(false);
        setShowProductVariation(false);
        setShowProduct(false);
        setUpdateProductVariation(false);
    }
    let displayProduct = null;
    let displayProductVariation = null;
    let productAdd = null;

    if(showProductVariation && props.productVariation.length!==0){

        displayProductVariation = Object.keys(props.productVariation).map(igkey=> {
            return [...Array(props.productVariation[igkey])].map(key => {  
                     
                        return <div className={classes.Product} key ={igkey}>
                            <h3>Product Variation:</h3>
                        <img className={classes.Photo}  src = {require('/home/kshitija/kshitz/src/assets/Images/'+key.primaryImageName)} alt='product variation '/>
                        <p>Size: {key.metadata.Size}</p>
                        <p>Colour: {key.metadata.Colour}</p>
                        <p>Quantity: {key.quantityAvailable}</p>
                        <p>Rs.{key.price} /-</p>
                        <button className={classes.Button2} onClick={()=>updateProductVariationHandler(key.id,key.price,key.quantityAvailable,key.metadata.Colour,key.metadata.Size,key.primaryImageName)}>Update Product Variation</button>
                    </div>;
            });
        });
    }

    if(showProduct && props.productData.length!==0){
       displayProduct =   Object.keys(props.productData).map(igkey=> {
            return [...Array(props.productData[igkey])].map(key => {  
                     
        
                        return <div className={classes.Product} key={igkey}>
                       <p> <strong>Name of Product : </strong>{key.name} </p>
                       <p> <strong>Description : </strong>{key.description} </p>
                       <p> <strong>Brand : </strong>{key.brand} </p>
                       <button className={classes.Button2} onClick={()=>updateProductHandler(key.name,key.description,key.id)}>Update Product</button>
                       <button className={classes.Button2} onClick={()=>deleteProductHandler(key.id)}>Delete Product</button>
                  <button className={classes.Button2} onClick={()=>viewProductVariationHandler(key.id)}>Product Variations</button> 
                    </div>;
             });
        });
        
    }
    if(addProduct){
        productAdd = <AddProduct/>
        
    }
    if(addProductVariation){
        productAdd = <AddVariation/>
        
    }
    if(updateProduct){
        productAdd = updateComponent;
    }
    if(updateProductVariation){
        
        productAdd = updateComponent;
    }

    
   


    return (<div >

        <div className={classes.Tab}>

       
            <button  onClick={()=>addProductHandler()} >Add Product</button>
        
            <button  onClick={()=>addProductVariationHandler()}>Add Product Variation</button>
            
            <button  onClick={()=>viewProductHandler()}>View Your Product</button>

            </div>
            
            {displayProduct}
            {displayProductVariation}
            {productAdd}
            
       

    </div>)
}

const mapStateToProps=state=>{
    return{
        token:state.auth.token,
        isAuthenticated :state.auth.token!==null,
        productData:state.seller.productData,
        productVariation:state.seller.productVariation

    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onViewProducts:(token)=>dispatch(actions.viewSellerProduct(token)),
        onViewProductVariation:(token,id)=>dispatch(actions.viewSellerProductVariation(token,id)),
        onDeleteProduct:(token,id)=>dispatch(actions.deleteProduct(token,id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SellerProduct);