import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import Train from '../Logo/Train/Train';
import Toggle from '../UI/SideDrawer/Toggle/Toggle';



const Toolbar=(props)=>{

     
    return(<header className={classes.Toolbar}>
        <Toggle clicked={props.toggleClicked}/>
            <Train />
        <div className={classes.Logo}>
<Logo />
</div>

</header>);
};


export default Toolbar;