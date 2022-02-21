import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl  from '@mui/material/FormControl';
import FormGroup  from '@mui/material/FormGroup';

export default function CustomSwitch(props) {
  const [checked, setChecked] = React.useState(props.checked ?? false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(typeof props.onChange === "function") {
        props.onChange(event,event.target.checked)
    }
  };

 

  return (
    <FormControl component="fieldset" variant="standard">
        <FormGroup>
            <FormControlLabel
                control={
                    <Switch
                    type={"checkbox"}
                    name={props.name ?? 'switch_input'}
                    checked={props.checked}
                    onChange={handleChange}
                    color={props.color ?? 'warning'}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />} 
                label={props.label ?? ''}
            />
        </FormGroup>
    
    </FormControl>
  );
}
