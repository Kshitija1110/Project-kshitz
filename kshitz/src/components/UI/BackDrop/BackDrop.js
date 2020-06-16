import React from 'react';
import classes from './BackDrop.module.css';

const backDrop = (props)=>{

    
    return(
        props.show ? <div className={classes.Backdrop} onClick={props.clicked}>uuyuyuyu</div>:null

    );
}

export default backDrop;