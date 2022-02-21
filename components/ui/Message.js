import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import withLoading from '../../HOC/withLoading';

function Message(props) {

    if(!props.message) return null 
 
    return (
 
      <Alert variant={props.variant ?? 'outlined'} severity={props.severity ?? 'info'} className={props.className} sx={props.sx} onClose={props.onClose}>
        {props.title ? <AlertTitle>{props.title}</AlertTitle>: null}
        {props.message}
        {props.children}
      </Alert>
 
  );
}


export default withLoading(Message)