import React,{useEffect,useState} from 'react';
import classes from './AddCategory.module.css';
import { connect } from 'react-redux';
import Input from '../../../UI/Form/Input/Input';
import * as actions from '../../../../reduxStore/actions/index';
import ErrorHandler from '../../../../ErrorHandler/ErrorHandler';
import SuccessMessage from '../../../../SuccessMessageHandler/SuccessMessage';


const AddCategory=(props)=>{

    const {onsetCategoryData,setSuccessNull}=props;

    useEffect(()=>{
        onsetCategoryData();
        setSuccessNull();
    },[onsetCategoryData,setSuccessNull]);

    const [id,setId] = useState();
   
    const [addForm,setAddForm]=useState({
        name: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Enter Category Name'
            },
            value:'',
            validation:{
                required:true
            },
            isValid:false,
            touched:false
        }});

        let categories = null;

    categories = Object.keys(props.categoryData).map(igkey=>{

        return [...Array(props.categoryData[igkey])].map(key=>{  
           
           return(
               <option key={igkey} value={key.id}>{key.name}</option>
           )

        });
   });

   



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
        props.onAddChildCategory(props.token,id,addForm.name.value);
       
      
    };

    const formElementArray=[];
        for(let key in addForm){
            formElementArray.push({
                id:key,
                config:addForm[key]
            });
        }
        let addDetails = null;
        
        addDetails = 
        <div className={classes.Box}>
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
            <select onChange={(e)=>setId(e.target.value)} >
            {categories}
            </select>
            
            <ErrorHandler/>
            <SuccessMessage/>
           <p> <button className={classes.Button} onClick={()=>submitHandler()}>Submit</button> </p>
</div>


    
    

    return(<div>

        {addDetails}
        

    </div>);
}

const mapStateToProps=state=>{
    return{
        categoryData:state.admin.categoryData,
        token:state.auth.token


    };
};

const mapDispatchToProps=dispatch=>{ 
    return{

        onsetCategoryData:()=>dispatch(actions.adminCategoryData()),
        onAddChildCategory:(token,id,name)=>dispatch(actions.addChildCategory(token,id,name)),
        setSuccessNull:()=>dispatch(actions.setSuccessFail())

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AddCategory);