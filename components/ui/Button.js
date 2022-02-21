import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
 

export default function CutomButton(props) {
   
  
  return (
  
 
      <Box sx={{  position: 'relative' }}>
        <Button
          type={props.type ?? 'button'}
          variant={props.variant ?? 'contained'}
          color={props.color ?? 'primary'}
          sx={props.sx}
          fullWidth={props.fullWidth}
          disabled={props.disabled || props.loading}
          onClick={props.onClick}
          startIcon={props.startIcon}
          endIcon={props.endIcon}
          className={props.className}
          size={props.size ?? "small"}
        >
          {props.children} 
        </Button>
        {props.loading && (
          <CircularProgress
            size={props.spinnerSize ?? 24}
            sx={{
              ...props?.sx,
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
   
  );
}
