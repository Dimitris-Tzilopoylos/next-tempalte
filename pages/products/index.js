import MainLayout from "../../layout/MainLayout"
import  {withAuth,withSSRClientAuthentication} from "../../HOC/withServerSideAuthentication"
import { getAllSuperCategories } from "../../utility/supercategories"
import Breadcrumb from "../../components/breadcrumb/Breadcrumb"
import { Grid } from "@mui/material"
import ProductsAdminUtilities from "../../components/products-admin-utilities/ProductsAdminUtilities"


function ProductsPage(props) {
  return (
    <MainLayout withContainer={true} title={"Dashboard"}  mainSx={{mt:12}}>
        <Grid container spacing={3} >
            <Grid item md={12} xs={12}>
                <Breadcrumb links={props.links} />
            </Grid>
            <Grid item md={12} xs={12}>
                <ProductsAdminUtilities />
            </Grid>
            
        </Grid>
        
    </MainLayout>
  
  )
}

export default withSSRClientAuthentication(ProductsPage)


export const getServerSideProps = withAuth( async ctx => {
  const data = await getAllSuperCategories() 
  return {
    props:{
      user:ctx.req.user,
      token:ctx.req.token,
      ...data,
      links:[{href:'/dashboard',title:'Dashboard'},{href:'/products',title:'Products'}]
    }
  }
})