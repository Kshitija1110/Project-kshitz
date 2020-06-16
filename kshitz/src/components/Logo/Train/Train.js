import React from 'react';
import classes from './Train.module.css';
import NavImage from '../NavImage/NavImage';
import * as actions from '../../../reduxStore/actions/index';
import { connect } from 'react-redux';
import {  NavLink } from 'react-router-dom';

const Train=(props)=>{
    
let login = <NavLink exact to='/login' style={{textDecoration:'none'}}>Login</NavLink>
    if(props.isLogin){
        login = <div onClick={()=>props.onLogout()}> Logout</div>
    }
    let column2 = null;
    let column3 = null;
    let column4 = null;
    let column5 = null;
    let column6 = null;

   

    if(props.role ==='CUSTOMER' || !props.isAuthenticated || !props.role){

        column2= <div className={classes.Box2}><NavLink exact to='/account' style={{textDecoration:'none'}}>Account</NavLink>
        <div className={classes.Space1}></div>
            <div className={classes.OuterCircle1}/>
            <div className={classes.Space2}></div>
    
            <div className={classes.OuterCircle2}/>
        </div> ;

        column3= <div className={classes.Box6}><NavLink exact to='/category' style={{textDecoration:'none'}}>Category</NavLink>
    <div className={classes.Space1}></div>
        <div className={classes.OuterCircle1}/>
        <div className={classes.Space2}></div>

        <div className={classes.OuterCircle2}/>
    </div>;


        column4 = <div className={classes.Box3} ><NavLink exact to='/orders' style={{textDecoration:'none'}}>Orders</NavLink>
        <div className={classes.Space1}></div>
            <div className={classes.OuterCircle1}/>
            <div className={classes.Space2}></div>
    
            <div className={classes.OuterCircle2}/></div>;

        column5 = <div className={classes.Box4}> <NavLink exact to='/product' style={{textDecoration:'none'}}>Products</NavLink>
        <div className={classes.Space1}></div>
            <div className={classes.OuterCircle1}/>
            <div className={classes.Space2}></div>
    
            <div className={classes.OuterCircle2}/></div>;

        column6 = <div className={classes.Box5}><NavLink exact to ='/cart' style={{textDecoration:'none'}}>Cart</NavLink>
        <div className={classes.Space1}></div>
            <div className={classes.OuterCircle1}/>
            <div className={classes.Space2}></div>
    
            <div className={classes.OuterCircle2}/></div>;
    }

    if(props.role ==='SELLER'){

        column2= <div className={classes.Box2}><NavLink exact to='/account' style={{textDecoration:'none'}}>Account</NavLink>
        <div className={classes.Space1}></div>
            <div className={classes.OuterCircle1}/>
            <div className={classes.Space2}></div>
    
            <div className={classes.OuterCircle2}/>
        </div> ;

        column3= <div className={classes.Box6}><NavLink exact to='/category' style={{textDecoration:'none'}}>Category</NavLink>
    <div className={classes.Space1}></div>
        <div className={classes.OuterCircle1}/>
        <div className={classes.Space2}></div>

        <div className={classes.OuterCircle2}/>
    </div>;


        column4 = null;

        column5 = <div className={classes.Box4}> <NavLink exact to='/product' style={{textDecoration:'none'}}>Products</NavLink>
        <div className={classes.Space1}></div>
            <div className={classes.OuterCircle1}/>
            <div className={classes.Space2}></div>
    
            <div className={classes.OuterCircle2}/></div>;

        column6 = null;

    }

    if(props.role==='ADMIN'){
        column2= <div className={classes.Box2}><NavLink exact to='/admin/users' style={{textDecoration:'none'}}>Users</NavLink>
        <div className={classes.Space1}></div>
            <div className={classes.OuterCircle1}/>
            <div className={classes.Space2}></div>
    
            <div className={classes.OuterCircle2}/>
        </div> ;
        column3 = <div className={classes.Box6}><NavLink exact to='/admin/products' style={{textDecoration:'none'}}>Products</NavLink>
        <div className={classes.Space1}></div>
            <div className={classes.OuterCircle1}/>
            <div className={classes.Space2}></div>
    
            <div className={classes.OuterCircle2}/>
        </div>;

        column4 = <div className={classes.Box3} ><NavLink exact to='/admin/category' style={{textDecoration:'none'}}>Categories</NavLink>
        <div className={classes.Space1}></div>
            <div className={classes.OuterCircle1}/>
            <div className={classes.Space2}></div>
    
            <div className={classes.OuterCircle2}/></div>;

        column5=null;
        column6=null;
    }

    


    return(
        <React.Fragment>
            <NavImage/>
    <div className={classes.Box1}>{login}
    <div className={classes.Space1}></div>
        <div className={classes.OuterCircle1}/>
        <div className={classes.Space2}></div>
        <div className={classes.OuterCircle2}/>
    </div>
    {column2}
    {column3}
    {column4}
    {column5}
    {column6}
    
        </React.Fragment>
    );
}

const mapStateToProps = state=>{
    return{
        isLogin:state.auth.isLogin,
        token: state.auth.token,
        isAuthenticated :state.auth.token!==null,
        role:state.auth.role
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onSetLoginClicked:(data)=>dispatch(actions.setLoginClicked(data)),
        onLogout:()=>dispatch(actions.logout())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Train);