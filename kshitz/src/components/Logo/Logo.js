import React from 'react';
import classes from './Logo.module.css';

const logo=(props)=>{
    return(
        <div className={classes.Parent}>
            
            <div className={classes.Oval}>
            <div className={classes.LeftCircle}/>
            <div className={classes.RightCircle}/>
                <div className={classes.LeftEye}>
                </div>
                <div className={classes.RightEye}></div>
                <div className={classes.Smile}></div>
                 </div>
                 <div className={classes.Title}>Kshitz</div>

</div>
    );
}

export default logo;