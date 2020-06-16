import React from 'react';
import classes from "./NavigationItems.module.css";
import { NavLink } from 'react-router-dom';
import * as actions from '../../../reduxStore/actions/index';
import { connect } from 'react-redux';

const NavigationItems=(props)=>{



    let login = <NavLink className={classes.Box} exact to='/login' style={{textDecoration:'none'}}>Login</NavLink>
    if(props.isLogin){
        login = <div onClick={()=>props.onLogout()}> Logout</div>
    }
    let column2 = null;
    let column3 = null;
    let column4 = null;
    let column5 = null;
    let column6 = null;

    if(props.role ==='CUSTOMER' || !props.isAuthenticated){

        column2= <NavLink className={classes.Box} exact to='/account' style={{textDecoration:'none'}}>Account</NavLink>

        column3= <NavLink className={classes.Box} exact to='/category' style={{textDecoration:'none'}}>Category</NavLink>
    


        column4 = <NavLink className={classes.Box} exact to='/orders' style={{textDecoration:'none'}}>Orders</NavLink>
       

        column5 =<NavLink className={classes.Box} exact to='/product' style={{textDecoration:'none'}}>Products</NavLink>
        

        column6 =<NavLink className={classes.Box} exact to ='/cart' style={{textDecoration:'none'}}>Cart</NavLink>
    }

    if(props.role ==='SELLER'){

        column2= <NavLink className={classes.Box} exact to='/account' style={{textDecoration:'none'}}>Account</NavLink>
        

        column3= <NavLink className={classes.Box} exact to='/category' style={{textDecoration:'none'}}>Category</NavLink>
    


        column4 = null;

        column5 =  <NavLink className={classes.Box} exact to='/product' style={{textDecoration:'none'}}>Products</NavLink>

        column6 = null;

    }

    if(props.role==='ADMIN'){
        column2= <NavLink className={classes.Box} exact to='/admin/users' style={{textDecoration:'none'}}>Users</NavLink>
        
        column3 = <NavLink className={classes.Box} exact to='/admin/products' style={{textDecoration:'none'}}>Products</NavLink>
      

        column4 = <NavLink className={classes.Box} exact to='/admin/category' style={{textDecoration:'none'}}>Categories</NavLink>
       
        column5=null;
        column6=null;
    }





    return(
        
        <ul className={classes.NavigationItems}>
            {login}
            {column2}
            {column3}
            {column4}
            {column5}
            {column6}


        
    
    </ul>
    
)
};

const mapStateToProps=state=>{
    return{
        loginClicked:state.showFields.loginClicked,
        isLogin:state.auth.isLogin,
        token: state.auth.token,
        isAuthenticated :state.auth.token!==null,
        role:state.auth.role
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onSetLoginClicked:()=>dispatch(actions.setLoginClicked()),
        onLogout:()=>dispatch(actions.logout())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(NavigationItems);