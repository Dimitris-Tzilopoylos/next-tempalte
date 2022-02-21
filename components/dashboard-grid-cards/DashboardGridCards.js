import { Grid } from "@mui/material"
import PeopleAlt from "@mui/icons-material/PeopleAlt"
import SellOutlined from "@mui/icons-material/SellOutlined"
import Inventory from '@mui/icons-material/Inventory'
import MessageOutlined from '@mui/icons-material/MessageOutlined'
import DashboardCardInfo from "../dashboard-card/DashboardCardInfo"




const DashboardGridCards = (props) => {

    return (
        <Grid container spacing={3} sx={{my:2}}>
           <Grid item md={3} xs={12}>
               <DashboardCardInfo  elevation={4} title={`${props.total_users ?? 0} Orders`} icon={<SellOutlined color="warning"/>} />
           </Grid>
           <Grid item md={3} xs={12}>
               <DashboardCardInfo  elevation={4} title={`${props.total_users ?? 0} Products`} icon={<Inventory color="warning"/>} />
           </Grid>
           <Grid item md={3} xs={12}>
               <DashboardCardInfo  elevation={4} title={`${props.total_users ?? 0} Messages`} icon={<MessageOutlined color="warning"/>} />
           </Grid>
           <Grid item md={3} xs={12}>
               <DashboardCardInfo  elevation={4} title={`${props.total_users ?? 0} Members`} icon={<PeopleAlt color="warning"/>} />
           </Grid>
       </Grid>
    )
}

export default DashboardGridCards