import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectInput(props) {
    return (
      <FormControl sx={props.sx} error={props.error} variant={props.variant} fullWidth={props.fullWidth ?? true}>
        <InputLabel id={props?.id ? `${props.id}-label` : 'select-label-id'}>{props.label}</InputLabel>
        <Select
          name={props.name ?? 'select_control'}
          labelId={props?.id ? `${props.id}-label` : 'select-label-id'}
          id={props?.id ?? 'select-input'}
          value={props?.value ?? ''}
          label={props.label}
          onChange={props.onChange}
          disabled={props.disabled}
        >
             
           {!props.disableDefault && 
            <MenuItem value={props.defaultValue ?? ''}>
                <em>{props.defaultValue ?? 'None'}</em>
            </MenuItem>}
          {props.options?.length ? 
          props.options.map(option => (
          <MenuItem value={option.value} key={option.title}>
            {option.title}
          </MenuItem>)) 
          
          :   null}
        </Select>
        {props.error && props.helperText ?  <FormHelperText>{props.helperText}</FormHelperText> : null}
      </FormControl>
  );
}
