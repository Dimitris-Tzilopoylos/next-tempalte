import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined';
import Home from '@mui/icons-material/Home';
import LockOpen from '@mui/icons-material/LockOpen';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Dashboard from '@mui/icons-material/Dashboard';
import PeopleAlt from "@mui/icons-material/PeopleAlt"
import SellOutlined from "@mui/icons-material/SellOutlined"
import Inventory from '@mui/icons-material/Inventory'
import MessageOutlined from '@mui/icons-material/MessageOutlined'
import StackedLineChartOutlined from '@mui/icons-material/StackedLineChartOutlined'


 export const navigationData = [
    {isHref:true,href:'/',title:'Home',auth:undefined,icon:<Home color='warning' />},
    {isHref:true,href:'/dashboard',title:'Dashboard',auth:true,icon:<Dashboard color='warning' />},
    {isHref:true,href:'/products',title:'Products',auth:true,icon:<Inventory color='warning' />},
    {isHref:true,href:'/orders',title:'Orders',auth:true,icon:<SellOutlined color='warning' />},
    {isHref:true,href:'/messages',title:'Messages',auth:true,icon:<MessageOutlined color='warning' />},
    {isHref:true,href:'/members',title:'Members',auth:true,icon:<PeopleAlt color='warning' />},
    {isHref:true,href:'/reports',title:'Reports',auth:true,icon:<StackedLineChartOutlined color='warning' />},
    {isHref:true,href:'/auth/login',title:'Login',auth:false,icon:<LockOpen color='warning'/>},
    {isHref:true,href:'/auth/register',title:'Register',auth:false,icon:<PersonAdd color='warning'/>},
    {isHref:false,title:'Logout',auth:true,icon:<ExitToAppOutlined color='warning'/>}
]

export const drawerData = [

]