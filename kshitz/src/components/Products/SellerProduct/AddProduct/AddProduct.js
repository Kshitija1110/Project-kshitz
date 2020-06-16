import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../reduxStore/actions/index';
import Input from '../../../UI/Form/Input/Input';
import classes from './AddProduct.module.css';
import SuccessMessage from '../../../../SuccessMessageHandler/SuccessMessage';
import ErrorHandler from '../../../../ErrorHandler/ErrorHandler';


const AddProduct=(props)=>{

    const {onAddProduct,onsetCategoryData,categoryData,token}=props;
   

    let myComp = null;
    

    useEffect(()=>{

        onsetCategoryData();
        },[onsetCategoryData]);

        
        const [categoryId,setCategoryId] = useState();


       

    if(categoryData.length!==0){

     myComp =  Object.keys(categoryData).map(igkey=>{
            return [...Array(categoryData[igkey])].map(key=>{  
                
               return(
                   <option key={igkey} value={key.id}>{key.name}</option>
               );
   
            });
   
       
       });
    }

    

    const [addForm,setAddForm]=useState({
        name: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Product Name'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        brand:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Brand Name'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        },
        description:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Add description'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        }});



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

    const submitHandler=()=>{

        onAddProduct(token,categoryId,addForm.name.value,
            addForm.description.value,addForm.brand.value);
            


      }

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
                <strong key={formElement.id}>
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
            <h3>Category data:</h3>
            <select onChange={(e)=>setCategoryId(e.target.value)}>
            {myComp}
            </select>
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
        categoryData:state.category.categoryData,
        token:state.auth.token
    };
};
const mapDispatchToProps=dispatch=>{
    return{
        onsetCategoryData:()=>dispatch(actions.categoryData()),
        onSetProductByCategory:(id)=>dispatch(actions.showProductByCategory(id)),
        onAddProduct:(token,id,name,description,brand)=>dispatch(actions.addProduct(token,id,name,description,brand))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddProduct);