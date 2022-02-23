import React from 'react'
import Input from '../ui/Input'
import SelectInput from '../ui/Select'
import CustomSwitch from '../ui/Switch'
import FileButton from '../file-button/FileButton'
import ValidationService from '../../services/ValidationService'
import CustomButton from '../ui/Button'
import Edit from '@mui/icons-material/Edit'
import Grid from '@mui/material/Grid'
import  Cancel from '@mui/icons-material/Cancel'
import IconButton from '@mui/material/IconButton'
import Delete from '@mui/icons-material/Delete'
import Message from '../ui/Message'
const vdService = new ValidationService()
const validationTextData = {
    "category_name":{min:2,max:20,error:'This field should be between 2 and 20 characters long'},
    "category_description":{min:2,max:5000,error:'This field should be between 2 and 5000 characters long'},
    "super_id":{error:'Please select a supercategory'}
}

export default function CategoryForm(props) {

    const [formData,setFormData] = React.useState({
        category_name:{isValid:false,error:'',value:props.category?.category_name ?? ''},
        category_description:{isValid:false,error:'',value:props.category?.category_description ?? ''},
        category_visibility:{isValid:true,error:'',value:props.category?.category_visibility ?? true},
        super_id:{isValid:true,error:'',value:props.category?.super_id ?? null}
    })
    const [fileError,setFileError] = React.useState(null)
    const [image,setImage] = React.useState(null)
    const [loading,setLoading] = React.useState(false)

    const onChange = (e) => {
        const {isValid,error} = handleValidation(e)
        let value = e.target.type !== "checkbox" ? e.target.value : e.target.checked
        setFormData(prev => ({
            ...prev,
            [e.target.name]:{value:value,error,isValid}
        }))
    }

    const handleValidation = (e) => {
        if(!validationTextData[e.target.name]) return {isValid:true,error:''}
        if(e.target.name === "super_id") {
            return {isValid:e.target.value !== "",value:e.target.value,error:e.target.value !== "" ? '' : validationTextData[e.target.name]?.error}
        }
        if(validationTextData[e.target.name]) 
        {
            let {isValid,value} = vdService.validateString(e.target.value,{
                ...validationTextData[e.target.name]
            })
            return {isValid,error:!isValid ? validationTextData[e.target.name].error : '',value}
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {...formData,image}
        let res = await props.onSubmit(data)
        if(res) {
            setFormData({
                category_name:{isValid:false,error:'',value:props.category_name ?? ''},
                category_description:{isValid:false,error:'',value:props.category_description ?? ''},
                category_visibility:{isValid:true,error:'',value:props.category_visibility ?? true},
                super_id:{isValid:true,error:'',value:props.category?.super_id ?? null}
            })
            setImage(null)
        }
        setLoading(false)
    }

    const onCancel = (e) => {
        setFormData({
            category_name:{isValid:false,error:'',value: ''},
            category_description:{isValid:false,error:'',value: ''},
            category_visibility:{isValid:true,error:'',value: true},
            super_id:{isValid:true,error:'',value:props.category?.super_id ?? null}
        })
        setImage(null)
        if(props.cancel instanceof Function) props.cancel(e)
    }

    const onFileInput = (e,file,error) => {
        if(!file) setImage(null)
        try {
            if(error) {
                return setFileError(error)
            }
            const src = URL.createObjectURL(file)
            setImage({file,src})
            setFileError(null)
        } catch (error) {
            
        }
    }

    const onFileDelete = () => {
        setImage(null)
    }


    React.useEffect(()=>{
        
            setFormData({
                category_name:{isValid:true,error:'',value:props.category?.category_name ?? ''},
                category_description:{isValid:true,error:'',value:props.category?.category_description ?? ''},
                category_visibility:{isValid:true,error:'',value:props.category?.category_visibility  ?? true},
                super_id:{isValid:true,error:'',value:props.category?.super_id ?? null}
            })
            setImage(props.category ? {file:null,src:props?.category?.category_image} : null)
         
    },[props.category])

    return (
        <form autoComplete='off' onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                    <Input
                    name="category_name" 
                    type="text" 
                    id="text" 
                    disabled={loading}
                    onChange={onChange}
                    error={!formData.category_name.isValid}
                    helperText={formData.category_name.error} 
                    value={formData.category_name?.value} 
                    label={"Category Name"} 
                    fullWidth={true}
                    options={{autoComplete:'off',fullWidth:true}} 
                    autoComplete="new-password"
                    variant="filled" 
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Input
                    name="category_description" 
                    type="text" 
                    multiline={true}
                    rows={4}
                    id="text" 
                    disabled={loading}
                    onChange={onChange}
                    error={!formData.category_description.isValid}
                    helperText={formData.category_description.error} 
                    value={formData.category_description?.value} 
                    label={"Category Description"} 
                    fullWidth={true}
                    options={{autoComplete:'off',fullWidth:true}} 
                    autoComplete="new-password"
                    variant="filled" 
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <SelectInput
                        name="super_id"
                        value={formData?.super_id?.value}
                        onChange={onChange}
                        disabled={loading}
                        error={!formData?.super_id?.isValid}
                        helperText={formData?.super_id?.error}
                        label={'Supercategory'}
                        id={'supercategory'}
                        options={props.supercategories?.length  ? props.supercategories.map(_super => ({value:_super.id,title:_super.supercategory_name})) : []}
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <CustomSwitch
                        label={"Visibility"}
                        checked={formData.category_visibility.value}
                        onChange={onChange}
                        name={"category_visibility"}
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                     
                </Grid>
                <Grid item md={3} xs={12}>
                    <FileButton onFileInput={onFileInput} maxFilesSize={1} />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item md={image ? 10 : 12} xs={image ? 10 : 12}>
                        {image 
                            ? <img width="100%" src={image.src} alt="Image upload" />
                            : <Message  severity="info" message="No image uploaded"/> 
                        }
                        </Grid>
                        <Grid item md={2} xs={2}>
                        {image 
                            ? <IconButton onClick={onFileDelete} color="error" disabled={loading || !image}><Delete /></IconButton>
                            : null 
                        }   
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Message severity="warning" message={fileError}/> 
                        </Grid>
                    </Grid>
                   
                </Grid>
                <Grid item md={12} xs={12} sx={{display:'flex',justifyContent:'center'}}>
                 <CustomButton 
                 endIcon={<Edit />} 
                 type="submit" 
                 fullWidth={false} 
                 color="primary" 
                 variant="contained"
                 loading={loading}
                 disabled={!image || loading || !!Object.values(formData).find(value => !value.isValid)}
                 > 
                 {props.category?.id ? 'UPDATE' : 'CREATE'} </CustomButton>
                 {props.category?.id  && props.cancel instanceof Function ? 
                 <CustomButton 
                 sx={{ml:1}}
                 endIcon={<Cancel />} 
                 type="button" 
                 fullWidth={false} 
                 color="error" 
                 variant="contained"
                 loading={loading}
                 onClick={onCancel}
                 disabled={loading || !!Object.values(formData).find(value => !value.isValid)}
                 > Cancel</CustomButton>
                : null }
                </Grid>
            </Grid>
        </form>
  )
}
