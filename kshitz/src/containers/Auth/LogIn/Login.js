import React , { Component } from 'react';
import Button from '../../../components/UI/Form/Button/Button';
import Input from '../../../components/UI/Form/Input/Input';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../reduxStore/actions/index';
import { checkValidity } from '../../../shared/utility';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

class Login extends Component{

    state={
        loginForm :{
            username:{
                elementType:'input',
                label:'UserName: ',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your username'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false
            },
            password:{
                elementType:'input',
                label:'Password: ',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter password'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false
            }
        }, 
        formIsValid:false,
        forgotPassword:false
    }


     submitHandler=()=>{

        this.props.onAuth(this.state.loginForm.username.value,this.state.loginForm.password.value);

       
}

inputChangedHandler=(event,id)=>{
    const updatedForms={
        ...this.state.loginForm,
        [id]:{
            ...this.state.loginForm[id],
            value:event.target.value,
            isValid: checkValidity(event.target.value, this.state.loginForm[id].validation)
           }
    };

    let formValid=true;
        for(let id in this.state.loginForm){
            formValid = this.state.loginForm[id].isValid && formValid
             }

    this.setState({loginForm:updatedForms});
    this.setState({formIsValid:formValid});
}
forgotPasswordHandler=()=>{

    this.setState({forgotPassword:true});

}



    render(){

        const loginFormArray=[];
        for(let key in this.state.loginForm){
            loginFormArray.push({
                id:key,
                config:this.state.loginForm[key]
            });
        }


        let displayForm = (loginFormArray.map(loginForm=>
            <Input key ={loginForm.id} 
            elementType={loginForm.config.elementType} 
            elementConfig={loginForm.config.elementConfig}
            changed={(event)=>this.inputChangedHandler(event,loginForm.id)}
            label={loginForm.config.label}/>
            ));

            let message= <h1>Please Login First !</h1>

            if(this.props.error){

                message=<h1>{this.props.error.data.error_description}</h1>
            }

            let authRedirect=null;
        if(this.props.isLogin){
            authRedirect=<Redirect to='/product'/>
        }

        let finalDisplay = (
            <div>
            {authRedirect}
            {message}
            
            {displayForm}

            <Button btnType="View" clicked={()=>this.forgotPasswordHandler()}>forgot password</Button>
                               
             <Button btnType="Success" clicked={this.submitHandler} disabled={!this.state.formIsValid}>Submit</Button>
                            
            </div>
        );

        if(this.state.forgotPassword){
            finalDisplay = <ForgotPassword/>
        }


        return(   <React.Fragment>
            {finalDisplay}
            </React.Fragment>);
    }
}

const mapStateToProps=state=>{
    return{
        error : state.auth.error,
        isLogin:state.auth.isLogin,
        


    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(username,password)=>dispatch(actions.auth(username,password)),
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);