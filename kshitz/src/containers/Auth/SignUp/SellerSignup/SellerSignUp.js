import React, { Component } from 'react';
import Input from '../../../../components/UI/Form/Input/Input';

import Button from '../../../../components/UI/Form/Button/Button';
import { Redirect } from 'react-router-dom';
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
            companyName:{
                elementType:'input',
                label:'Company Name: ',
                elementConfig:{
                    type:'input',
                    placeholder:'Enter Company Name'
                },
                value:''
            },
            gst:{
                elementType:'input',
                label:'GST: ',
                elementConfig:{
                    type:'number',
                    placeholder:'Enter GST'
                },
                value:''
            },
            city:{
                elementType:'input',
                label:'City: ',
                elementConfig:{
                    type:'input',
                    placeholder:'Enter City: '
                },
                value:''
            },
            state:{
                elementType:'input',
                label:'State: ',
                elementConfig:{
                    type:'input',
                    placeholder:'Enter State: '
                },
                value:''
            },
            country:{
                elementType:'input',
                label:'Country: ',
                elementConfig:{
                    type:'input',
                    placeholder:'Enter Country'
                },
                value:''
            },
            zipcode:{
                elementType:'input',
                label:'Zipcode: ',
                elementConfig:{
                    type:'number',
                    placeholder:'Enter zipcode'
                },
                value:''
            },
            label:{
                elementType:'input',
                label:'Label: ',
                elementConfig:{
                    type:'input',
                    placeholder:'Enter label'
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


        this.props.onregisterSeller(this.state.signUpForm.username.value,
            this.state.signUpForm.firstname.value,
            this.state.signUpForm.middlename.value,
            this.state.signUpForm.lastname.value,
            this.state.signUpForm.email.value,
            this.state.signUpForm.contact.value,
            this.state.signUpForm.password.value,
            this.state.signUpForm.confirmpassword.value,
            this.state.signUpForm.companyName.value,
            this.state.signUpForm.gst.value,
            this.state.signUpForm.city.value,
            this.state.signUpForm.state.value,
            this.state.signUpForm.country.value,
            this.state.signUpForm.zipcode.value,
            this.state.signUpForm.label.value);
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

        onregisterSeller:(username,firstname,middlename,lastname,email,contact,password,confirmpassword,companyname,gst,city,state,country,zipcode,label)=>dispatch(actions.registerSeller(username,firstname,middlename,lastname,email,contact,password,confirmpassword,companyname,gst,city,state,country,zipcode,label))

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
