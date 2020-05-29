import React, { Component} from 'react';
import CustomerSignup from './SignUp/CustomerSignUp/CustomerSignUp';
import SellerSignup from './SignUp/SellerSignup/SellerSignUp';
import Login from './LogIn/Login';
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

  console.log(this.state.isSignUp);

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
    this.props.onSetLoginClicked();

  
}


    render(){

        let displayForm = null;
        if(this.state.isSignUp && this.state.showModal&&this.state.isCustomer)
        {
            displayForm=(<Modal modalclosed={this.modalHandler}>
            <CustomerSignup/>
            <Button
             clicked={this.switchSignUpFormHandler}
            btnType="Danger">Signup as {this.state.isCustomer?' Seller?':'Customer?'}</Button>
            <Button
             clicked={this.switchSignHandler}
            btnType="Danger">Switch to {this.state.isSignUp?'LOGIN !':'SIGNUP !'}</Button>

        </Modal>);
        }

        else if(this.state.isSignUp && this.state.showModal&& !this.state.isCustomer)
        {
            displayForm=(<Modal modalclosed={this.modalHandler}>
                <SellerSignup/>
                <Button
             clicked={this.switchSignUpFormHandler}
            btnType="Danger">Signup as {this.state.isCustomer?'Seller? !':'Customer?'}</Button>
                <Button
                 clicked={this.switchSignHandler}
                btnType="Danger">Switch to {this.state.isSignUp?'LOGIN !':'SIGNUP !'}</Button>
                </Modal>);

            } 
        



         else if(!this.state.isSignUp && this.state.showModal)
         {
             displayForm =  <div>
                 
                 <Modal modalclosed={this.modalHandler}>
                               <Login/>
                         <Button
                        clicked={this.switchSignHandler}
                        btnType="Danger">Switch to {this.state.isSignUp?'LOGIN !':'SIGNUP !'}</Button>
            
                        </Modal>
                        
                        </div>
            
            }
            else{
                displayForm=<Auth/>
            }
            



        return(<React.Fragment>
            {displayForm}
            </React.Fragment>);
    
}
}

const mapDispatchToProps=dispatch=>{
    return{

        onSetLoginClicked: ()=>dispatch(actions.setLoginClicked())

    };
};

export default connect(null,mapDispatchToProps)(Auth);
