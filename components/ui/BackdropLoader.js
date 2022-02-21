import  React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function BackdropLoader(props) {
  const [open, setOpen] = React.useState(props.open ?? false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={props.withClose ? handleClose : null}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
