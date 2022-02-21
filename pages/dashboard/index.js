import MainLayout from "../../layout/MainLayout"
import  {withAuth,withSSRClientAuthentication} from "../../HOC/withServerSideAuthentication"
import { getDashboardData } from "../../utility/dashboard"
import DashboardGridCards from '../../components/dashboard-grid-cards/DashboardGridCards'
import Breadcrumb from "../../components/breadcrumb/Breadcrumb"
import { Grid } from "@mui/material"


function Dashboard(props) {
  return (
    <MainLayout withContainer={true} title={"Dashboard"}  mainSx={{mt:12}}>
        <Grid container spacing={3} >
            <Grid item md={12} xs={12}>
                <Breadcrumb links={props.links} />
            </Grid>
            <Grid item md={12} xs={12}>
              <DashboardGridCards total_users={props.total_users} />
            </Grid>
        </Grid>
        
    </MainLayout>
  
  )
}

export default withSSRClientAuthentication(Dashboard)


export const getServerSideProps = withAuth( async ctx => {
  const data = await getDashboardData() 
  return {
    props:{
      user:ctx.req.user,
      token:ctx.req.token,
      ...data,
      links:[{href:'/dashboard',title:'Dashboard'}]
    }
  }
})