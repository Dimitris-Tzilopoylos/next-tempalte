import { createTheme } from '@mui/material/styles';
import { deepPurple,amber,purple, blue} from '@mui/material/colors';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background:{
      default:'#012',
      paper:'#012'
    },
    primary:{
      main:blue[900]
    },
    secondary:amber,
    
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

export default darkTheme;