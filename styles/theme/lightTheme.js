import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
          "&.Mui-disabled":{
            pointerEvents:'unset',
            cursor:'not-allowed'
          }
        }
      }
    },
    MuiButtonBase:{
      styleOverrides:{
        root:{
          "&.Mui-disabled":{
            pointerEvents:'unset',
            cursor:'not-allowed'
          }
        }
      }
    },
    MuiInput:{
      styleOverrides:{
        root:{
          "&.Mui-disabled":{
            pointerEvents:'unset',
            cursor:'not-allowed'
          }
        }
      }
    }
  }
});

export default lightTheme;