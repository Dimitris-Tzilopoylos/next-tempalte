import React from 'react'
import { connect } from 'react-redux'
import useProducts from '../../hooks/useProducts'
import {  updateSuperCategory,deleteSuperCategory,createSuperCategory } from '../../store/actions/products'
import Grid from '@mui/material/Grid'
import SupercategoryForm from './SupercategoryForm'
import CardLayout from '../../layout/CardLayout'
import Title from '../title/Title'
import Edit from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import DataTable from '../data-table/DataTable'
import Message from '../ui/Message'
import CustomButton from '../ui/Button'
import  Delete from '@mui/icons-material/Delete'
import  Visibility from '@mui/icons-material/Visibility'
import  VisibilityOff from '@mui/icons-material/VisibilityOff'
import Avatar from '@mui/material/Avatar'



const columns = [
    // { field: 'id', headerName: 'ID', width: 80,sortable:false},
    {field:'supercategory_image',
    sortable:false,
    width:80,
    headerName:'Image',
    renderCell: (params) =>  <Avatar src={params.value} />
    },
    {
      field: 'supercategory_name',
        sortable:false,
      headerName: 'Name',
      width: 120,
 
      },
    {
        field: 'total_categories',
        sortable:false,
        headerName: 'Categories',
        width: 100,
      },
    {
      field: 'supercategory_visibility',
        sortable:false,
      headerName: 'Visibility',
      width: 120,
      renderCell: (params) => {
          return params.value ? <Visibility color="success"/> : <VisibilityOff color="warning" />
      }
    },
     
    {
      field: 'update',
      headerName: 'Update',
      description: 'Edit Super Category',
      sortable: false,
      width: 100,
      renderCell:(params) => {
          return <CustomButton onClick={params.value} color="primary" startIcon={<Edit />}>Update</CustomButton>
      },
      maxWidth:300
    },
    {
        field: 'delete',
        headerName: 'Delete',
        description: 'Delete Super Category',
        sortable: false,
        resizable:false,
        width: 100,
        renderCell:(params) => {
            return <CustomButton onClick={params.value?.action} color="error" startIcon={<Delete />} disabled={params.value?.disabled}>Delete</CustomButton>
        },
        maxWidth:300
      }
  ];
export const ManageSupercategories = (props) => {

    const [_supercategory,setSupercategory] = React.useState(null)
    const [formToggle,setFormToggle] = React.useState(false)
    const {supercategories,supercategory,supercategories_loading:loading,supercategoriesPage:page,supercategoriesLimit:limit,supercategoriesView:view,total_supercategories:total} = useProducts()
    
 

    const handleUpdateSuper = async (_super) => {
        setSupercategory(_super)
        _super ? openForm() : closeForm()
    }
    const handleDeleteSuper = async (id) => {
        await props.deleteSuperCategory(id)
    }

    const onUpdate = async (formData) => {
        if(!_supercategory) return 
        let res = await props.updateSuperCategory(_supercategory?.id,formData)
        if(res) {
            handleUpdateSuper(null)
        }
    } 
    const openForm = () => {
        setFormToggle(true)
    }

    const closeForm = () => {
        setFormToggle(false)
    }

    return (
    <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
            <Grid container spacing={1}>
                <Grid item md={2} xs={12}>
                    <CustomButton fullWidth={true} startIcon={<Edit color="warning"/>} color={formToggle ? "success" : "primary"} onClick={(e)=>setFormToggle(prev=>!prev)}>Manage</CustomButton>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Divider />
                </Grid>
            </Grid>
        </Grid>
       {formToggle && 
        <Grid item md={4} xs={12} lg={4} xl={4}>
            <CardLayout sx={{p:2}}>
                <Title sx={{justifyContent:'flex-start'}}>
                    <Edit color="warning" />
                     Supercategory Form 
                </Title>
                <Divider sx={{mb:2}} />
                <SupercategoryForm 
                onSubmit={_supercategory ? onUpdate : props.createSuperCategory} 
                supercategory={_supercategory} 
                cancel={(e) => handleUpdateSuper(null)}
                />
            </CardLayout>
            
        </Grid>}
      
        <Grid item md={formToggle ? 8 : 12} xs={12} >
            {supercategories?.length > 0  && !loading ? 
            <DataTable
                sx={{minHeight:'200px'}}
                columns={columns}
                rows={supercategories.map(_super => ({..._super,
                    update: (e)=>handleUpdateSuper(_super),
                    delete:{action:(e)=>handleDeleteSuper(_super.id),disabled:_super.total_categories > 0}}))}
                view={view}
                total={supercategories?.length}
                loading={loading}
                disableHide={true}
                selected={(id)=>{console.log(id)}}
                disableColumnFilter={true}
            />
            : 
            <Message loading={loading} variant="outlined" severity="info" message={"No supercategories at the moment"} /> 
            }   
        </Grid> 
        
    </Grid>
  )
}

// const mapStateToProps = (state) => ({
//     supercategories:state.products.supercategories,
//     supercategory:state.products.supercategory,
//     loading:state.products.supercategoryLoading})

const mapDispatchToProps = {createSuperCategory,updateSuperCategory,deleteSuperCategory}

export default connect(null, mapDispatchToProps)(ManageSupercategories)