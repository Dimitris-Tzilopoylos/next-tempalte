import  React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const TIMER_INTERVAL = 500

export default function AutoCompleteInput(props) {

    const timer = React.useRef(null) 
    const [value,setValue] = React.useState('')

    React.useEffect(()=>{
        return () => {
            if(timer.current) {
                clearTimeout(timer.current)
            }
        }
    },[])

    const onChange = (e) => {
        if(timer.current) {
            clearTimeout(timer.current)
        }
        setValue(e.target.value)
        timer.current = setTimeout(async ()=>{
            if(props.onAutocomplete instanceof Function) {
                if(props.isSync) props.onAutocomplete(e,e.target.value)
                else await props.onAutocomplete(e,e.target.value)
            }
        },TIMER_INTERVAL)
    }

    return (
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',...props?.sx }}
        >
        {props.withMenu && 
        <IconButton sx={{ p: '10px' }} aria-label="menu">
            <MenuIcon />
        </IconButton>
        }
        <InputBase
            value={value}
            onChange={onChange}
            sx={{ ml: 1, flex: 1 }}
            placeholder={props.placeholder}
            
        />
        <IconButton type={props.type ?? 'button'} sx={{ p: '10px' }} aria-label="search" onClick={props.search}>
        {props.searchIcon ??  <SearchIcon />}
        </IconButton>
        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <DirectionsIcon />
        </IconButton> */}
        </Paper>
  );
}
