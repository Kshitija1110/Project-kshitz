import React, { Component } from 'react';
import classes from './Layout.module.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Toolbar from '../../components/Toolbar/Toolbar';
import Products from '../../components/Products/ViewProducts/ViewProducts';
import Auth from '../Auth/Auth';
import Product from '../../components/Products/ViewProducts/ViewProducts';



class Layout extends Component{


    render(){
       
        
        return(
            <div >
                <Toolbar/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                 </div>
        );
    }

}
const mapStateToProps=state=>{
    return{
    isRegistered:state.register.isRegistered
    };
};



export default connect(mapStateToProps)(Layout);