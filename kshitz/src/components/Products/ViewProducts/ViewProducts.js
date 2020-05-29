import React, { useEffect,useState} from 'react';
import {connect } from 'react-redux';
import classes from './ViewProducts.module.css';
import {Redirect } from 'react-router-dom';
import * as actions from '../../../reduxStore/actions/index';
import ProductVariations from '../ViewProductVariation/ProductVariations';
import Auth from '../../../containers/Auth/Auth';


const ViewProducts=(props)=>{


    useEffect(()=>{

        props.onViewProducts(0);

    },[props.onViewProducts]);


    const [count,setCount] = useState(0);
    const [isClicked,setIsClicked] = useState(false);
    const [id,setId] = useState();

    const imageClickHandler=(productId,variationId)=>{
        

        console.log(productId)
        setIsClicked(true);
        props.onsetProductId(productId,variationId);
     };

   let productData = null;


    if(props.products && !isClicked){
        

  let  productDetails =    Object.keys(props.products).map(igkey=> {
        return [...Array(props.products[igkey])].map(key => {  
                 console.log(key.primaryImageName) ;
                 console.log(key.product.id);              //Object.key =>[salad]=>igkey=salad=>mapping give array inside array =>[2].map=>[2 times return burger ingredient with igkey(salad) as type]
                    return <div className={classes.Product}>
                    <img onClick={()=>imageClickHandler(key.product.id,key.id)} className={classes.Photo}  src = {require('/home/kshitija/kshitz/src/assets/Images/'+key.primaryImageName)}/>
                    <strong>{key.product.name}</strong>
                    <p>Rs.{key.price} /-</p>
                </div>;
        });
    });

    productData = <div>
       <marquee> <h1 style={{fontFamily:'Sigmar One, cursive'}}>Summer sale 50% off on every Product ! !</h1></marquee>
        {productDetails}
    </div>

  
  
    }

    let authRedirect=null;

    if(isClicked){
        console.log('inside clicked');
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
        {authRedirect}
        {productData}
        {loginModal}
        <button style={{padding:'10px', width:'40px', height:'40px'} } onClick={submitPrevHandler}> prev </button>
        <button style={{padding:'10px', width:'40px', height:'40px'} } onClick={submitNextHandler}>next</button>
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