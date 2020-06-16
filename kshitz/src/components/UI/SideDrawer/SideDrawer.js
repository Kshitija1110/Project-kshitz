import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import Backdrop from '../BackDrop/BackDrop';

const sideDrawer=(props)=>{
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.Open]
    }
    return(
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav>
                <NavigationItems />
            </nav>

        </div>
        </React.Fragment>
    );
};
export default sideDrawer;