import React, { Component } from 'react';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/SideDrawer/SideDrawer';




class Layout extends Component{

    state={
        showSideDrawer:false
    }; 

   

     sideDrawerHandler=()=>{
      this.setState({showSideDrawer:false});

    }

     toggleHandler=()=>{
        this.setState(prevstate=>{

            return{
                showSideDrawer:!prevstate.showSideDrawer
            };
        })
    
    }


    render(){
       
        
        return(
            <div >
                <Toolbar toggleClicked={this.toggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerHandler}/>
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