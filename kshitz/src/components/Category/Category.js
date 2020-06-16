import React,{ useEffect,useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../reduxStore/actions/index';
import classes from './Category.module.css';
import ViewProduct from '../Products/ViewProducts/ViewProducts';

const Category =(props)=>{
    const {onsetCategoryData,categoryData} = props;

    useEffect(()=>{

        onsetCategoryData();

    },[onsetCategoryData]);
    const [showInnerCategory,setShowInnerCategory] = useState(false);
    const [showInner2Category,setShowInner2Category] = useState(false);
    const [showLeafCategory,setShowLeafCategory] = useState(false);
    const [showProduct,setShowProduct] = useState(false);
    const [id,setId] = useState();
    const [id2,setId2] = useState();
    const [id3,setId3] = useState();

    let category = null;
    let innerCategory = null;
    let inner2Category = null;
    let leafCategory = null;
    let displayProducts = null;

    

    const rootHandler=(id)=>{
        setId(id);
        setShowInnerCategory(true);
    }
    const innerHandler=(id)=>{
        setId2(id);
        setShowInner2Category(true);
    }
    const leafHandler=(id)=>{
        setId3(id);
        setShowLeafCategory(true);
    }
    const productHandler=(categoryId)=>{
        props.onSetProductByCategory(categoryId);
        setShowProduct(true);
    }



if(categoryData.length!==0){


    category = Object.keys(categoryData).map(igkey=>{
         return [...Array(categoryData[igkey])].map(key=>{  

    if(key.category===null){
            return <div className={classes.Category} key ={igkey} onClick={()=>rootHandler(key.id)}>
                {key.name}
            </div>
    }
    return null;

         });

    
    });
}
if(showInnerCategory){
    innerCategory  = Object.keys(categoryData).map(igkey=>{
        return [...Array(categoryData[igkey])].map(key=>{  

   if(key.category!==null){
       if(key.category.id===id){
           return <div key ={igkey} className={classes.Category} onClick={()=>innerHandler(key.id)}>
               
               {key.category.name}  >  {key.name}
           </div>
       }
       
       
   }
   return null;
        });  
   });
}
if(showInner2Category){
    inner2Category  = Object.keys(categoryData).map(igkey=>{
        return [...Array(categoryData[igkey])].map(key=>{  

   if(key.category!==null){
       if(key.category.id===id2){
           return <div key ={igkey} className={classes.Category} onClick={()=>leafHandler(key.id)} >
             {key.category.category.name} > {key.category.name}  >  {key.name}
           </div>
       }
   }
   return null;
        });  
   });
}
if(showLeafCategory){
    leafCategory  = Object.keys(categoryData).map(igkey=>{
        return [...Array(categoryData[igkey])].map(key=>{  

   if(key.category!==null){
       if(key.category.id===id3){
           return <div key ={igkey} className={classes.Category} onClick={()=>productHandler(key.id)} >
               {key.category.category.name} > {key.category.name}  >  {key.name}
           </div>
       }
   }
   return null;
        });  
   });
}
if(showProduct){

    displayProducts = <ViewProduct fromCategory={true}/>

}

    return(<React.Fragment><div className={classes.Bar}>
       {category}
       {innerCategory}
       {inner2Category}
       {leafCategory}
       </div>
       {displayProducts}
       </React.Fragment>
    );
}

const mapStateToProps=state=>{
    return{
        categoryData:state.category.categoryData
    };
};
const mapDispatchToProps=dispatch=>{
    return{
        onsetCategoryData:()=>dispatch(actions.categoryData()),
        onSetProductByCategory:(id)=>dispatch(actions.showProductByCategory(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Category);