import React from 'react';
import { connect } from 'react-redux';

const UpdateHandler=(props)=>{


    return(<h2>{props.updateMessage}</h2>);
}

const MapStateToProps=state=>{
    return{

        updateMessage:state.showFields.updateMessage

    };
};


export default connect(MapStateToProps)(UpdateHandler);