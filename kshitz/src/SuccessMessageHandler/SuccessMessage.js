import React from 'react'; 
import { connect } from 'react-redux';

const SuccessHandler = (props)=>{



let show = null;
if(props.isSuccess){
 show = <h2>{props.message}</h2>;
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
       message:state.success.message,
       isSuccess:state.success.isSuccess
    }
    
}


export default connect(mapStateToProps)(SuccessHandler);