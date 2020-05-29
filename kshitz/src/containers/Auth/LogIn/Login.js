import React , { Component } from 'react';
import Button from '../../../components/UI/Form/Button/Button';
import Input from '../../../components/UI/Form/Input/Input';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../reduxStore/actions/index';

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
                value:''
            },
            password:{
                elementType:'input',
                label:'Password: ',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter password'
                },
                value:''
            }
        }
    }

     submitHandler=()=>{

        console.log('on submit handler');

        console.log(this.state.loginForm.username.value);
        console.log(this.state.loginForm.password.value);

        this.props.onAuth(this.state.loginForm.username.value,this.state.loginForm.password.value);
}

inputChangedHandler=(event,id)=>{
    const updatedForms={
        ...this.state.loginForm,
        [id]:{
            ...this.state.loginForm[id],
            value:event.target.value,
           }
    };
    this.setState({loginForm:updatedForms});
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
                message=<h1>{this.props.error.error_description}</h1>
            }

            let authRedirect=null;
        if(this.props.isLogin){
            console.log(this.props.isLogin);
            authRedirect=<Redirect to='/product'/>
        }


        return(   <div>
            {authRedirect}
            {message}
            
            {displayForm}
                               
             <Button btnType="Success" clicked={this.submitHandler}>Submit</Button>
                            
            </div>);
    }
}

const mapStateToProps=state=>{
    return{
        error : state.auth.error,
        isLogin:state.auth.isLogin

    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(username,password)=>dispatch(actions.auth(username,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);