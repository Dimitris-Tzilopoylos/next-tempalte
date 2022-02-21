import React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { connect } from 'react-redux';

const  Notifications = connect(
    (state) => ({notification:state.notifications.notification}),
    null
)((props) =>{
    const { enqueueSnackbar } = useSnackbar();
  
    const handleClick = () => {
      enqueueSnackbar('I love snacks.');
    };
  
    const handleClickVariant = (variant) => () => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar('This is a success message!', { variant });
    };
  
    React.useEffect(()=>{
      if(props.notification) {
          enqueueSnackbar(props.notification?.notification,{variant:props.notification.variant ?? 'info',})
      }
    },[props.notification])
  
    return null
  })

export default function NotificationContainer(props) {
  return (
    <SnackbarProvider maxSnack={props.maxSnack ?? 6}>
      <Notifications />
    </SnackbarProvider>
  );
}
