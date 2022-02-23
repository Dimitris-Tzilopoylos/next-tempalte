import React from 'react'
import { connect } from 'react-redux'
import  Grid  from '@mui/material/Grid'
import TabContainer from '../tabs/TabContainer'
import Tab from '../tabs/Tab'
import Category from '@mui/icons-material/Category'
import ClassOutlined  from '@mui/icons-material/ClassOutlined'
import LabelImportant from '@mui/icons-material/LabelImportant'
import  Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import useProducts from '../../hooks/useProducts'
import ManageSupercategories from './ManageSupercategories'
import ManageCategories from './ManageCategories'
import  ManageBrands from './ManageBrands'
import Filters from './Filters'
import { getSupercategories,getCategories } from '../../store/actions/products'


export const ProductsAdminUtilities = (props) => {

  const {supercategories} = useProducts()

  const tabs = [
    {label:'Supercategories',icon:<Category color="warning" />,disabled:supercategories?.length === 0},
    {label:'Categories',icon:<ClassOutlined color="warning" />,disabled:supercategories?.length === 0},
    {label:'Brands',icon:<LabelImportant color="warning" />,disabled:supercategories?.length === 0},
    {label:'Products',icon:<Inventory2Outlined color="warning" />,disabled:supercategories?.length === 0},
  ]


  React.useEffect(()=>{
    let res = true 
    const getData = async () => {
      res = await props.getSupercategories()
      res = await props.getCategories()
    }
    getData()
    return () => res = false
  },[])

  return (
    <Grid container spacing={3}>
      <Grid item md={3} xs={12}></Grid>
        <Grid item md={10} xs={12}>
          <Filters />
        </Grid>
        <Grid item md={12} xs={12}>
          <TabContainer tabs={tabs} defaultTab={0} orientation={'vertical'}>
            <Tab value={0} index={0}>
              {/* <CustomButton endIcon={<Edit />} fullWidth={true} color="primary" variant="contained"> SuperCategories </CustomButton> */}
              <ManageSupercategories />
            </Tab>
            <Tab value={1} index={1}>
              {/* <CustomButton endIcon={<Edit />} fullWidth={true} color="primary" variant="contained"> Categories </CustomButton> */}
              <ManageCategories />
            </Tab>
            <Tab value={1} index={1}>
              {/* <CustomButton endIcon={<Edit />} fullWidth={true} color="primary" variant="contained"> Categories </CustomButton> */}
              <ManageBrands />
            </Tab>
            <Tab value={2} index={2}>
                 {/* <CustomButton endIcon={<Edit />} fullWidth={true} color="primary" variant="contained"> Products </CustomButton> */}
             </Tab>
          </TabContainer>
        </Grid>
 
    </Grid>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  getSupercategories,
  getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsAdminUtilities)