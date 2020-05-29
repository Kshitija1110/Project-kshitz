import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';
import NavImage from '../Logo/NavImage/NavImage';
import Train from '../Logo/Train/Train';


const toolbar=(props)=>(
<header className={classes.Toolbar}>
<Train/>
    <div style={{display:'block'}}>
<Logo className={classes.Logo}/>
<input className={classes.Input} type='text' placeholder='Search 
here..'/>
<div></div>
</div>

    
    
    

    
    
    
    
</header>
);
export default toolbar;