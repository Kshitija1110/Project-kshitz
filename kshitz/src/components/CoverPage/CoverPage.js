import React from 'react';
import classes from './CoverPage.module.css';
import { connect } from 'react-redux';
import Auth from '../../containers/Auth/Auth';

const CoverPage = (props)=>{
    let loginModal = null;

    if(props.loginClicked){
        loginModal = <Auth/>
    }

    return (<div className={classes.Cover}>
        <marquee> <h1 style={{fontFamily:'Sigmar One, cursive'}}>Summer sale 50% off on every Product ! !</h1></marquee>
        <img src = {require('/home/kshitija/kshitz/src/assets/Images/Background2.jpg')}/>
        {loginModal}
    </div>);
}

const mapStateToProps=state=>{
    return{
        loginClicked:state.showFields.loginClicked
    }
}

export default connect(mapStateToProps)(CoverPage);