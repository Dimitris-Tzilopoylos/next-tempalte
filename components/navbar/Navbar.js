import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useRouter} from 'next/router'
import NavigationLink from '../navlink/NavigationLink'
import useUser from '../../hooks/useUser';
import { navigationData } from '../../data/Navigation';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Navbar(props) {

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const dispatch = useDispatch()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const {isAuthenticated} = useUser()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={false} >
        <Toolbar sx={{background:'#001'}}>
            <IconButton
                color="warning"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
          </IconButton>
          <Typography variant="h6"  noWrap sx={{ flexGrow: 1 }} component="div">
            <NavigationLink href={"/"}>
              My Shop
            </NavigationLink>
           
          </Typography>
          
        </Toolbar>
      </AppBar>
      {/* <Main open={open} >
        <DrawerHeader />
         {props.children}
      </Main> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background:'#001'
          },
          
        }}
        variant="persistent"
        anchor="left"
        open={open}
        style={{background:'#001'}}
      >
        <DrawerHeader sx={{background:'#001'}}>
          <IconButton onClick={handleDrawerClose} color="warning">
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{background:'#001'}}>
          {navigationData.map((route, index) => route.auth === undefined || route.auth === isAuthenticated 
          ? (
            <ListItem key={route.title} button={true}>
              {route.isHref ? 
              <NavigationLink href={route.href}>
                {route.icon ? 
                 <ListItemIcon>
                  {route.icon}
                </ListItemIcon>
                : null }
                <ListItemText primary={route.title}  />
              </NavigationLink>
              : 
              <>
              {route.icon ? 
                 <ListItemIcon>
                  {route.icon}
                </ListItemIcon>
                : null }
                <ListItemText style={{color:'white'}} primary={route.title} onClick={route.onClick ? routes.onClick :  (e) => dispatch(logout())} />
              </>}
            </ListItem>
           
          )
          : null
          )}
        </List>
        <Divider />
        
      </Drawer>
    </Box>
  );
}
