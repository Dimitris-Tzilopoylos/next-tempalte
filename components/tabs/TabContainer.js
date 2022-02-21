import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


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
      <Tabs
        orientation={props.orientation}
        variant={props.variant ?? 'scrollable'}
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider',...props?.containerSx }}
      >
          {props.tabs.map(tab => (
                <Tab key={tab.label} label={tab.label} {...a11yProps(0)} icon={tab.icon} iconPosition={tab.iconPosition ??  'start'} />
          ))}
      </Tabs>
      <Box sx={{width:'100%'}}>
        {props.children[value]}
      </Box>
      
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
    </Box>
  );
}
