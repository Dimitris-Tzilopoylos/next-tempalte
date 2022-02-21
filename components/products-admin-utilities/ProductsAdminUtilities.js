import React from 'react'
import { connect } from 'react-redux'
import { Grid } from '@mui/material'
import  Edit from '@mui/icons-material/Edit'
import TabContainer from '../tabs/TabContainer'
import Tab from '../tabs/Tab'
import {Category,ClassOutlined,Inventory2Outlined} from '@mui/icons-material'
import ManageSupercategories from './ManageSupercategories'

const tabs = [
  {label:'Supercategories',icon:<Category color="warning" />},
  {label:'Categories',icon:<ClassOutlined color="warning" />},
  {label:'Products',icon:<Inventory2Outlined color="warning" />},
]

export const ProductsAdminUtilities = (props) => {
  return (
    <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <TabContainer tabs={tabs} defaultTab={0} orientation={'vertical'}>
            <Tab value={0} index={0}>
              {/* <CustomButton endIcon={<Edit />} fullWidth={true} color="primary" variant="contained"> SuperCategories </CustomButton> */}
              <ManageSupercategories />
            </Tab>
            <Tab value={1} index={1}>
              {/* <CustomButton endIcon={<Edit />} fullWidth={true} color="primary" variant="contained"> Categories </CustomButton> */}
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsAdminUtilities)