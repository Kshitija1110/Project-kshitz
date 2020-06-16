import React, { Component } from 'react';
import Input from '../../../../components/UI/Form/Input/Input';
import { Redirect } from 'react-router-dom';
import Button from '../../../../components/UI/Form/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../../../reduxStore/actions/index';
import { checkValidity } from '../../../../shared/utility';


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
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false

            },
            middlename:{
                elementType:'input',
                label:'Middle Name: ',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your Middle Name'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false

            },
            lastname:{
                elementType:'input',
                label:'Last Name: ',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your Last Name'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false

            },
            email:{
                elementType:'input',
                label:'Email Id: ',
                elementConfig:{
                    type:'email',
                    placeholder:'Enter your Email Id'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false

            },
            contact:{
                elementType:'input',
                label:'Contact: ',
                elementConfig:{
                    type:'number',
                    placeholder:'Enter your Contact Number'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false

            },
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
            },
            confirmpassword:{
                elementType:'input',
                label:'Confirm Password: ',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter password again'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false

            },
            fileupload:{
                elementType:'input',
                label:'Upload profile photo: ',
                elementConfig:{
                    type:'file',
                    placeholder:'enter file path'
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
        passwordMatch:''
    }

    inputChangedHandler=(event,id)=>{
        const updatedForms={
            ...this.state.signUpForm,
            [id]:{
                ...this.state.signUpForm[id],
                value:event.target.value,
                isValid: checkValidity(event.target.value, this.state.signUpForm[id].validation)
               }
        };
        let formValid=true;
        for(let id in this.state.signUpForm){
            formValid = this.state.signUpForm[id].isValid && formValid
            
             }
        this.setState({signUpForm:updatedForms});
        this.setState({formIsValid:formValid});
       
    }

    submitHandler=(e)=>{
       

    let fileValue = this.state.signUpForm.fileupload.value;
    let imageName = fileValue.replace(/^.*\\/, "");
    



    if(this.state.signUpForm.password.value===this.state.signUpForm.confirmpassword.value){



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
        else{

            this.setState({passwordMatch:<h2>Password and confirm password not matched !</h2>});

        }
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
            authRedirect=<Redirect to='/'/>
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
                {this.state.passwordMatch}
                <Button btnType="Success" clicked={this.submitHandler} disabled={!this.state.formIsValid}>Submit</Button>
                
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
