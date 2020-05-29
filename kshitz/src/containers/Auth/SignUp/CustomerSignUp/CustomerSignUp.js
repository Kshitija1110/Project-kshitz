import React, { Component } from 'react';
import Input from '../../../../components/UI/Form/Input/Input';
import { Redirect } from 'react-router-dom';
import Button from '../../../../components/UI/Form/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../../../reduxStore/actions/index';

class Signup extends Component{
    state={
        signUpForm:{
            firstname:{
                elementType:'input',
                label:'First Name: ',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your First Name'
                },
                value:''

            },
            middlename:{
                elementType:'input',
                label:'Middle Name: ',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your Middle Name'
                },
                value:''

            },
            lastname:{
                elementType:'input',
                label:'Last Name: ',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your Last Name'
                },
                value:''

            },
            email:{
                elementType:'input',
                label:'Email Id: ',
                elementConfig:{
                    type:'email',
                    placeholder:'Enter your Email Id'
                },
                value:''

            },
            contact:{
                elementType:'input',
                label:'Contact: ',
                elementConfig:{
                    type:'number',
                    placeholder:'Enter your Contact Number'
                },
                value:''

            },
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
            },
            confirmpassword:{
                elementType:'input',
                label:'Confirm Password: ',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter password again'
                },
                value:''

            },
            fileupload:{
                elementType:'input',
                label:'Upload profile photo: ',
                elementConfig:{
                    type:'file',
                    placeholder:'enter file path'
                },
                value:''
            }

        }
    }

    inputChangedHandler=(event,id)=>{
        const updatedForms={
            ...this.state.signUpForm,
            [id]:{
                ...this.state.signUpForm[id],
                value:event.target.value,
               }
        };
        this.setState({signUpForm:updatedForms});
        console.log(this.state.signUpForm[id].value);
    }

    submitHandler=(e)=>{
        
        console.log('inside submit handler');
    //    const customerdetails={
    //         email: this.state.signUpForm.email.value ,
    //         firstName:this.state.signUpForm.firstname.value,
    //         middleName: this.state.signUpForm.middleName.value,
    //         userName: this.state.signUpForm.username.value,
    //         profileImage: this.state.signUpForm.fileupload.value,
    //         lastName: this.state.signUpForm.lastname.value,
    //         contact:this.state.signUpForm.contact.value,
    //         password: this.state.signUpForm.password.value,
    //         confirmPassword: this.state.signUpForm.confirmPassword.value
            
    //     };

    let fileValue = this.state.signUpForm.fileupload.value;
    let imageName = fileValue.replace(/^.*\\/, "");
    console.log(imageName);

console.log(
    this.state.signUpForm.fileupload.value
    );

        this.props.onregisterCustomer(this.state.signUpForm.username.value,
            this.state.signUpForm.firstname.value,
            this.state.signUpForm.middlename.value,
            this.state.signUpForm.lastname.value,
            this.state.signUpForm.email.value,
            imageName,
            this.state.signUpForm.contact.value,
            this.state.signUpForm.password.value,
            this.state.signUpForm.confirmpassword.value);
    }

    
    render(){
        const signupFormArray=[];
        for(let key in this.state.signUpForm){
            signupFormArray.push({
                id:key,
                config:this.state.signUpForm[key]
            });
        }

        let authRedirect=null;
        if(this.props.isRegistered){
            console.log(this.props.isRegistered);
            authRedirect=<Redirect to='/product'/>
        }

        let displayForm = (signupFormArray.map(loginForm=>
            <Input key ={loginForm.id} 
            elementType={loginForm.config.elementType} 
            changed={(event)=>this.inputChangedHandler(event,loginForm.id)}
            elementConfig={loginForm.config.elementConfig}
            label={loginForm.config.label}/>
            ));



        return(
            <div>
                <h1>Please Enter Details: </h1>
               {authRedirect}
                {displayForm}
                <Button btnType="Success" clicked={this.submitHandler}>Submit</Button>
                
                 </div>

        );
    }
}

const mapStateToProps=state=>{
    return{
    message:state.register.message,
    error:state.register.error,
    isRegistered:state.register.isRegistered
    };
};

const mapDispatchToProps=dispatch=>{
    return{

        onregisterCustomer:(username,firstname,middlename,lastname,email,fileupload,contact,password,confirmpassword)=>dispatch(actions.registerCustomer(username,firstname,middlename,lastname,email,fileupload,contact,password,confirmpassword))

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
