import React from 'react';
import classes from './Input.module.css';

const input = (props)=>{
    let inputElement = null;


    switch(props.elementType){
        case('input'):inputElement=<input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>
        break;
        case('textarea'):inputElement=<textarea className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>
        break;
        case('select'):inputElement=<select className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}>
            {props.elementConfig.options.map(order=>(
                <option key={order.value} value={order.vale}>{order.displayValue}</option>
            ))}
        </select>
        break;
        case('file'):inputElement=<input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>
        break;
        default:
            inputElement=<input className={classes.InputElement}  {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }

return(<div className={classes.Input} >
    <label>{props.label}</label>
    {inputElement}
    </div>
);

};

export default input;