import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import  Grid  from '@mui/material/Grid';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function TabContainer(props) {
  const [value, setValue] = React.useState(props.defaultTab || 0);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    if(typeof props.onTabChange === "function") {
        if(props.isAsyncChange) await props.onTabChange(event,newValue)
        else props.onTabChange(event,newValue)
    }
  };
  return (
    <Box
      sx={{ width:'100%',flexGrow: 1, bgcolor: 'background.paper', display: 'flex', ...props?.sx}}
    >
      <Grid container spacing={3}>
          <Grid item md={2} xs={12}>
            <Tabs
            orientation={props.orientation}
            variant={props.variant ?? 'scrollable'}
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: 'divider', ...props?.containerSx }}
            >
              {props.tabs.map(tab => (
                    <Tab key={tab.label} label={tab.label} {...a11yProps(0)} icon={tab.icon} iconPosition={tab.iconPosition ??  'start'} disabled={tab.disabled}/>
              ))}
            </Tabs>
          </Grid>
          <Grid item md={10} xs={12}>
            <Box sx={{width:'100%'}}>
              {props.children[value]}
            </Box>
          </Grid>
      </Grid>
    </Box>
  );
}
