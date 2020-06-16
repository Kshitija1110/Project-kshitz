import React, { Component} from 'react';
import CustomerSignup from './SignUp/CustomerSignUp/CustomerSignUp';
import SellerSignup from './SignUp/SellerSignup/SellerSignUp';
import Login from './LogIn/Login';
import {Redirect} from 'react-router-dom';
import Button from '../../components/UI/Form/Button/Button';
import classes from './Auth.module.css';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../reduxStore/actions/index';
import { connect } from 'react-redux';




class Auth extends Component{

    state={
        isSignUp:false,
      showModal:true,
      isCustomer:true
  }

switchSignHandler=()=>{

  this.setState(prevstate=>{

      return{
          isSignUp:!prevstate.isSignUp
      };
  })



}
switchSignUpFormHandler=()=>{

    this.setState(prevstate=>{

        return{
            isCustomer:!prevstate.isCustomer
        };
    })

}
modalHandler=()=>{
  this.setState({showModal:false});
    this.props.onSetLoginClicked(false);

  
}


    render(){


        let displayForm = null;
        if(this.state.isSignUp && this.state.showModal&&this.state.isCustomer  && !this.props.isLogin)
        {
            displayForm=(<div className={classes.Box}>
            <CustomerSignup/>
            <Button
             clicked={this.switchSignUpFormHandler}
            btnType="Danger">Signup as {this.state.isCustomer?' Seller?':'Customer?'}</Button>
            <Button
             clicked={this.switchSignHandler}
            btnType="Danger">Switch to {this.state.isSignUp?'LOGIN !':'SIGNUP !'}</Button>

        </div>);
        }

        else if(this.state.isSignUp && this.state.showModal&& !this.state.isCustomer  && !this.props.isLogin)
        {
            displayForm=(<form className={classes.Box}>
                <SellerSignup/>
                <Button
             clicked={this.switchSignUpFormHandler}
            btnType="Danger">Signup as {this.state.isCustomer?'Seller? !':'Customer?'}</Button>
                <Button
                 clicked={this.switchSignHandler}
                btnType="Danger">Switch to {this.state.isSignUp?'LOGIN !':'SIGNUP !'}</Button>
                </form>);

            } 
        



         else if(!this.state.isSignUp && this.state.showModal && !this.props.isLogin)
         {
             displayForm =  <div className={classes.Box}>
                 
                 <Modal modalclosed={this.modalHandler}>
                    
                               <Login/>
                        

                         <Button
                        clicked={this.switchSignHandler}
                        btnType="Danger">Switch to {this.state.isSignUp?'LOGIN !':'SIGNUP !'}</Button>
            
                        </Modal>
                        
                        </div>
            
            }
            else if(this.props.isLogin){
                displayForm = <Redirect to = {this.props.path}/>
            }
            
            



        return(<React.Fragment>
            {displayForm}
            </React.Fragment>);
    
}
}
const mapStateToProps=state=>{
    return{
        isLogin:state.auth.isLogin,
        path:state.auth.authRedirectPath
    }
}

const mapDispatchToProps=dispatch=>{
    return{

        onSetLoginClicked: ()=>dispatch(actions.setLoginClicked())

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
