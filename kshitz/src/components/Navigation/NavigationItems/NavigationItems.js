import React from 'react';
import classes from "./NavigationItems.module.css";
import NavigationItem from '../NavigationItem/NavigationItem';
import Auth from '../../../containers/Auth/Auth';
import * as actions from '../../../reduxStore/actions/index';
import { connect } from 'react-redux';

const NavigationItems=(props)=>{

    const {onSetLoginClicked} = props;

    

    const elementConfig = {
        type:'text',
        placeholder:'Search here'
    };


    return(
        
        <ul className={classes.NavigationItems}>
        <NavigationItem clicked={()=>onSetLoginClicked()} >Login</NavigationItem>
        <NavigationItem link="/orders" >Home</NavigationItem> 
        <NavigationItem link="/logout">More</NavigationItem>
        <NavigationItem link="/auth" >Cart</NavigationItem>
        
    
    </ul>
    
)
};

const mapStateToProps=state=>{
    return{
        loginClicked:state.showFields.loginClicked
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onSetLoginClicked:()=>dispatch(actions.setLoginClicked())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(NavigationItems);