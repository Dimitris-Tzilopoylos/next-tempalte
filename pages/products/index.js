import MainLayout from "../../layout/MainLayout"
import  {withAuth,withSSRClientAuthentication} from "../../HOC/withServerSideAuthentication"
import { getAllSuperCategories } from "../../utility/admin"
import Breadcrumb from "../../components/breadcrumb/Breadcrumb"
import { Grid } from "@mui/material"
import ProductsAdminUtilities from "../../components/products-admin-utilities/ProductsAdminUtilities"
import DBService from "../../services/DBService"


function ProductsPage(props) {
  return (
    <MainLayout withContainer={true} title={"Products"}  mainSx={{mt:12}}>
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
  const db = new DBService()
  let data = {}
  try {
    await db.connect()
    data = await getAllSuperCategories(db)
  } catch (error) {
    data = {}
  }  finally {
    db.close()
    return {
      props:{
        user:ctx.req.user,
        token:ctx.req.token,
        ...data,
        links:[{href:'/dashboard',title:'Dashboard'},{href:'/products',title:'Products'}]
      }
    }
  }
 
})