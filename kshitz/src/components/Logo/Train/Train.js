import React from 'react';
import classes from './Train.module.css';
import NavImage from '../NavImage/NavImage';
import * as actions from '../../../reduxStore/actions/index';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

const Train=(props)=>{
    const {onSetLoginClicked} = props;

    const OrderHandler=()=>{
        console.log('orders');
        return(<Redirect to='/orders'/>);
    }
    const HomeHandler=()=>{
        return(<Redirect to='/orders'/>);
    }
    const MoreHandler=()=>{
        return(<Redirect to='/orders'/>);
    }
    const LogoutHandler=()=>{
        return(<Redirect to='/orders'/>);
    }

    return(
        <React.Fragment>
            <NavImage/>
    <div className={classes.Box1} onClick={()=>onSetLoginClicked()}> Login
    <div className={classes.Space1}></div>
        <div className={classes.OuterCircle1}/>
        <div className={classes.Space2}></div>
        <div className={classes.OuterCircle2}/>
    </div>
    <div className={classes.Box2} onClick={()=>OrderHandler()}><NavLink exact to='/account' style={{textDecoration:'none'}}>Account</NavLink>
    <div className={classes.Space1}></div>
        <div className={classes.OuterCircle1}/>
        <div className={classes.Space2}></div>

        <div className={classes.OuterCircle2}/>
    </div>
    <div className={classes.Box3} onClick={()=>HomeHandler()}> Orders
    <div className={classes.Space1}></div>
        <div className={classes.OuterCircle1}/>
        <div className={classes.Space2}></div>

        <div className={classes.OuterCircle2}/></div>
    <div className={classes.Box4}> <NavLink exact to='/product' style={{textDecoration:'none'}}>Products</NavLink>
    <div className={classes.Space1}></div>
        <div className={classes.OuterCircle1}/>
        <div className={classes.Space2}></div>

        <div className={classes.OuterCircle2}/></div>
    <div className={classes.Box5}><NavLink exact to ='/cart' style={{textDecoration:'none'}}>Cart</NavLink>
    <div className={classes.Space1}></div>
        <div className={classes.OuterCircle1}/>
        <div className={classes.Space2}></div>

        <div className={classes.OuterCircle2}/></div>
        </React.Fragment>
    );
}
const mapDispatchToProps=dispatch=>{
    return{
        onSetLoginClicked:()=>dispatch(actions.setLoginClicked())
    };
};

export default connect(null,mapDispatchToProps)(Train);