import React from 'react';
import { connect } from 'react-redux';

const errorHandler = (props)=>{
let show = null;
if(props.isError){
 show = <h2>{props.error.data.message}</h2>;
}
else{
    show=null;
}
       return <React.Fragment>
            {show}

        </React.Fragment>
    }

const mapStateToProps=state=>{

    return{
        error:state.error.error,
        isError:state.error.isError
    }
    
}


export default connect(mapStateToProps)(errorHandler);