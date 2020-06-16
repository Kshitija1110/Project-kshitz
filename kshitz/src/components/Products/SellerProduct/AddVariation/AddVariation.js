import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../reduxStore/actions/index';
import Input from '../../../UI/Form/Input/Input';
import classes from './AddVariation.module.css';
import SuccessMessage from '../../../../SuccessMessageHandler/SuccessMessage';
import ErrorHandler from '../../../../ErrorHandler/ErrorHandler';


const AddVariation=(props)=>{

    const {onSetMetadataCategory,onViewProducts,onSetProductVariation,token,metadataCategory,productData}=props;

    useEffect(()=>{

        
        onViewProducts(token);

        },[onViewProducts,token]);

   

    let myComp = null;
    let myMetadata = null;

    if(metadataCategory.length!==0){
        myMetadata = Object.keys(props.metadataCategory).map(igkey=> {
            return [...Array(metadataCategory[igkey])].map(key => {  
                     
                        return <div key={igkey} >
                       <strong>{key.categoryMetadataIdentity.categoryMetadataField.name} :</strong>
                       <strong>{key.value}</strong>
                       
                       
                   
                    </div>;
             });
        });
    }

    myComp = Object.keys(productData).map(igkey=> {
        return [...Array(productData[igkey])].map(key => {  
                
    
                    return  (
                    <option key={igkey} value={key.category.id+','+key.id}>Name of Product : {key.name} </option>
                    );
                   
               
                
         });
    });
    
    const categoryMetadataHandler=(event)=>{


        let allId = event.target.value;
        let finalValue = allId.split(',');
        

        setProductId(finalValue[1]);
        onSetMetadataCategory(token,finalValue[0]);

    }

   

    const [addForm,setAddForm]=useState({
        quantity: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Enter Quantity'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        price:{
            elementType:'input',
            elementConfig:{
                type:'number',
                placeholder:'Enter Price'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        imagepath:{
            elementType:'file',
            elementConfig:{
                type:'file'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        }});


        const [inputValue,setInputValue] = useState();
        const [productId,setProductId] = useState(1);


    const changedHandler=(event,id)=>{
        const updatedForms={
            ...addForm,
            [id]:{
                ...addForm[id],
                value:event.target.value,
               }
        };
        setAddForm(updatedForms);
       
    }

    const changedMetadataHandler=(event)=>{
        setInputValue(event.target.value);
        
    }
    

    const submitHandler=()=>{

        let fileValue = addForm.imagepath.value;
    let imageName = fileValue.replace(/^.*\\/, "");
   
    

    onSetProductVariation(token,productId,addForm.quantity.value,
        addForm.price.value,
        imageName,
        inputValue);

        
      }
      let metadataValue=<div>
          {myMetadata}
          <p><input type='text' onChange={(event)=>changedMetadataHandler(event)} /></p>
      </div>

    const formElementArray=[];
        for(let key in addForm){
            formElementArray.push({
                id:key,
                config:addForm[key]
            });
        }
        let addDetails = null;
        
        addDetails = 
        <div>
            <h3>Please Enter details:</h3>
            {formElementArray.map(formElement=>(
                <strong key={formElement.id} >
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
            <h3>Product data:</h3>
            <select onChange={(e)=>categoryMetadataHandler(e)}>
            {myComp}
            </select>
            <h3>Category Metadata available for this product:</h3>
            {metadataValue}
           <p> <button onClick={()=>submitHandler()}>Submit</button> </p>
</div>





    return(<div className={classes.Box}>
        {addDetails}
        <SuccessMessage/>
        <ErrorHandler/>
    </div>);
}

const mapStateToProps=state=>{
    return{
        metadataCategory:state.seller.metadataCategory,
        token:state.auth.token,
        productData:state.seller.productData
    };
};
const mapDispatchToProps=dispatch=>{
    return{
        onSetMetadataCategory:(token,id)=>dispatch(actions.viewMetaDataCategory(token,id)),
        onViewProducts:(token)=>dispatch(actions.viewSellerProduct(token)),
        onSetProductVariation:(token,productId,quantity,price,imagepath,metadata)=>dispatch(actions.addProductVariation(token,productId,quantity,price,imagepath,metadata))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddVariation);
