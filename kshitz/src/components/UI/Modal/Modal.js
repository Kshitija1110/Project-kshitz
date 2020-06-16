import React from 'react';
import classes from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';

const modal = (props)=>{

    return(
        <React.Fragment>
            <BackDrop show={props.show} clicked={props.modalclosed}/>
        <div
         style={{
             transform:props.modalclosed ? 'translateY(0)' : 'translateY(-100vh)',
             opacity:props.modalclosed ?'100' :'0'
         }}
        className={classes.Modal}>
        {props.children}
    </div>
    </React.Fragment>

    );

}

export default modal;