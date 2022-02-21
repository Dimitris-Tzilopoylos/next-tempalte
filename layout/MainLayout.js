import React from 'react'
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import { Container } from '@mui/material';
import Footer from '../components/footer/Footer';
import { ThemeProvider, CssBaseline } from '@mui/material';
import lightTheme from '../styles/theme/lightTheme';
import darkTheme from '../styles/theme/darkTheme';
import Box from '@mui/system/Box';
import NotificationContainer from '../components/notifications/Notifications';

function MainLayout(props) {

    const [theme,setTheme] = React.useState(true)
    const toggleTheme = () => {
        setTheme(prev=>!prev)
    }
    
    return (
        <ThemeProvider theme={theme ? darkTheme : lightTheme}>
            <Head>
                <title>{props.title ?? 'Item'}</title>
            </Head>
            <CssBaseline />
            <Navbar toggleTheme={toggleTheme} />
            {props.withContainer ? 
            <Container maxWidth={props.maxWidth ?? "xl"} disableGutters={props.disableGutters} sx={{mt:8,...props?.mainSx,height:'100vh'}}>        
                    {props.children}         
            </Container>
            :
            <Box sx={{mt:8,...props?.mainSx }}>
                {props.children}
            </Box> 
            }       
            <Footer />
            <NotificationContainer maxSnack={props.maxSnack ?? 6} />
        </ThemeProvider>
    )


}


export default MainLayout