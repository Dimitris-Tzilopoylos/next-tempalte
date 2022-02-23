import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText  from '@mui/material/FormHelperText';
import { OutlinedInput,FilledInput } from '@mui/material';
export default function TextInput(props) {

  let Component = props.variant === "outlined" ? OutlinedInput : props.variant === "filled" ? FilledInput : Input

  return (
      <FormControl  error={props.error} sx={props.sx} variant="standard" fullWidth={props.fullWidth} >
        <InputLabel htmlFor={props.htmlFor ?? ''} sx={{ml:1,p:1}}>
         {props.label}
        </InputLabel>
        <Component
          autoComplete='off'
          type={props.type ?? 'text'}
          name={props.name ?? ''}
          {...props?.options}
          disabled={props.disabled}
          multiline={props.multiline ?? false}
          rows={props.multiline ? props.rows : 1}
          id={props.id ?? ''}
          startAdornment={
              props.icon ? 
            <InputAdornment position={props.iconPosition ?? 'start'} onClick={props.onIconClick} sx={{cursor:'pointer'}}>
                {props.icon}
            </InputAdornment> 
            : null
          }
          endAdornment={
            props.endIcon ? 
          <InputAdornment position={props.iconPosition ?? 'start'} onClick={props.onEndIconClick} sx={{cursor:'pointer'}}>
              {props.endIcon}
          </InputAdornment> 
          : null
        }
          sx={props.sx}
          onChange={props.onChange}
          value={props.value ?? ''}
          required={props.required}
        />
        {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
      </FormControl>  
  );
}
