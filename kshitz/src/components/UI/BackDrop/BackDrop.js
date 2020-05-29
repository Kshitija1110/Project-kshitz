import React from 'react';
import classes from './BackDrop.module.css';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const backDrop = (props)=>{

    
    return(
        <div className={classes.Backdrop} onClick={props.clicked}>
        </div>

    );
}

export default backDrop;