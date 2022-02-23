import React from 'react'
import { connect } from 'react-redux'
import useProducts from '../../hooks/useProducts'
import {  updateCategory,deleteCategory,createCategory } from '../../store/actions/products'
import Grid from '@mui/material/Grid'
import CategoryForm from './CategoryForm'
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
    // { field: 'id', headerName: 'ID', width: 80 ,sortable:false},
    {field:'category_image',
    width:80,
    sortable:false,
    headerName:'Image',
    renderCell: (params) =>  <Avatar src={params.value} />
    },
    {
      field: 'category_name',
      headerName: 'Name',
      width: 120,
        sortable:false,

 
      },
      {
        field: 'supercategory_name',
        headerName: 'Supercategory  ',
        width: 120,
        sortable:false,

   
        },
    {
        field: 'total_brands',
        headerName: 'Brands',
        width: 100,
        sortable:false,

      },
    {
      field: 'category_visibility',
      headerName: 'Visibility',
      width: 100,
        sortable:false,

      renderCell: (params) => {
          return params.value ? <Visibility color="success"/> : <VisibilityOff color="warning" />
      }
    },
     
    {
      field: 'update',
      headerName: 'Update',
      description: 'Edit Category',
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
        description: 'Delete Category',
        sortable: false,
        resizable:false,
        width: 100,
        renderCell:(params) => {
            return <CustomButton onClick={params.value?.action} color="error" startIcon={<Delete />} disabled={params.value?.disabled}>Delete</CustomButton>
        },
        maxWidth:300
      }
  ];
export const ManageCategories = (props) => {

    const [_category,setCategory] = React.useState(null)
    const [formToggle,setFormToggle] = React.useState(false)
    const {categories,supercategories,category,categories_loading:loading,categoriesPage:page,categoriesLimit:limit,categoriesView:view,total_supercategories:total} = useProducts()

    const handleUpdateCategory = async (_super) => {
        setCategory(_super)
        _super ? openForm() : closeForm()
    }
    const handleDeleteCategory = async (id) => {
        await props.deleteCategory(id)
    }
    const onUpdate = async (formData) => {
        if(!_category) return 
        let res = await props.updateCategory(_category?.id,formData)
        if(res) {
            handleUpdateCategory(null)
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
                     Category Form 
                </Title>
                <Divider sx={{mb:2}} />
                <CategoryForm 
                onSubmit={_category ? onUpdate : props.createCategory} 
                category={_category} 
                supercategories={supercategories}
                cancel={(e) => handleUpdateCategory(null)}
                />
            </CardLayout>
            
        </Grid>}
      
        <Grid item md={formToggle ? 8 : 12} xs={12} >
            {categories?.length > 0  && !loading ? 
            <DataTable
                sx={{minHeight:'200px'}}
                columns={columns}
                rows={categories?.map(category => ({...category,
                    update: (e)=>handleUpdateCategory(category),
                    delete:{action:(e)=>handleDeleteCategory(category.id),disabled:category.total_brands > 0}}))}
                view={view}
                total={categories?.length}
                loading={loading}
                disableHide={true}
                selected={(id)=>{console.log(id)}}
                disableColumnFilter={true}
            />
            : 
            <Message loading={loading} variant="outlined" severity="info" message={"No categories at the moment"} /> 
            }   
        </Grid> 
        
    </Grid>
  )
}

 
const mapDispatchToProps = { createCategory,updateCategory,deleteCategory}

export default connect(null, mapDispatchToProps)(ManageCategories)