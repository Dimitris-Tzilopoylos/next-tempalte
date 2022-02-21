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
   

});

export default darkTheme;