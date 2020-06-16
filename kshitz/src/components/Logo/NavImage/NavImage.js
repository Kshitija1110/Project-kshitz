import React from 'react';
import classes from './NavImage.module.css';


const navImage=(props)=>(
<div className={classes.Logo} style={{height: props.height}}>
    <img src={require('/home/kshitija/kshitz/src/assets/Images/bogie.png')} alt="MyBurger" />
    
        </div>

);
export default navImage;