import {
    SUPERCATEGORIES_LOADING,
    CATEGORIES_LOADING,
    PRODUCTS_LOADING,
    SET_PRODUCTS,
    SET_SUPERCATEGORIES,
    SET_CATEGORIES,
    SET_PRODUCT,
    SET_SUPERCATEGORY,
    SET_CATEGORY,
} from '../reducers/products/types'
import { addNotification } from './notifications'
import { convertFile } from '../../utility/files'
import axios from '../../utility/apiClient'
const API ='http://localhost:3000/api'


export const supercategoriesLoading = (loading) => (dispatch,getState) => dispatch({type:SUPERCATEGORIES_LOADING,payload:loading})
export const categoriesLoading = (loading) => (dispatch,getState) => dispatch({type:CATEGORIES_LOADING,payload:loading})
export const productsLoading = (loading) => (dispatch,getState) => dispatch({type:PRODUCTS_LOADING,payload:loading})
export const setSupercategories = (data) => (dispatch,getState) => dispatch({type:SET_SUPERCATEGORIES,payload:{...data}})
export const setCategories = (data) => (dispatch,getState) => dispatch({type:SET_CATEGORIES,payload:{...data}})
export const setProducts = (data) => (dispatch,getState) => dispatch({type:SET_PRODUCTS,payload:{...data}})
export const setSupercategory = (supercategory) => (dispatch,getState) => dispatch({type:SET_SUPERCATEGORY,payload:supercategory})
export const setCategory = (category) => (dispatch,getState) => dispatch({type:SET_CATEGORY,payload:category})
export const setProduct = (product) => (dispatch,getState) => dispatch({type:SET_PRODUCT,payload:product})



/// GETTERS 

export const getSupercategories = (page=1,view=12) => async (dispatch,getState) => {
    let status = true 
    try {
        dispatch(supercategoriesLoading(true))
        const res = await axios.post(`${API}/supercategories`,{
            page,
            view
        })
        dispatch(setSupercategories({...res.data}))
    } catch (error) {
        status = false
         dispatch(setSupercategories({supercategories:[],supercategoriesPage:1,supercategoriesLimit:1,total_supercategories:0}))
    } finally {
        dispatch(supercategoriesLoading(false))
        return status
    }
}


export const getCategories = (page=1,view=12) => async (dispatch,getState) => {
    let status = true 
    try {
        dispatch(categoriesLoading(true))
        const res = await axios.post(`${API}/categories`,{
            page,
            view
        })
        dispatch(setCategories({...res.data}))
    } catch (error) {
        dispatch(setCategories({categories:[],categoriesPage:1,categoriesLimit:1,total_categories:0}))
        status = false
    } finally {
        dispatch(categoriesLoading(false))
        return status
    }
}


export const getProducts = (page=1,view=12) => async (dispatch,getState) => {
    let status = true 
    try {
        dispatch(productsLoading(true))
        const res = await axios.post(`${API}/supercategories`,{
            page,
            view
        })
        dispatch(setProducts({...res.data}))
    } catch (error) {
        status = false
    } finally {
        dispatch(productsLoading(false))
        return status
    }
}



/// CRUD SUPER CATEGORIES 

export const createSuperCategory = (formData) => async (dispatch,getState) => {
    let status = true 
    try {
        const data = {}
        const image =  await convertFile(formData.image.file)
        console.log(image)
        Object.keys(formData).forEach(key => {
            data[key] = formData[key].value !== undefined  ? formData[key].value : image
        })
        dispatch(supercategoriesLoading(true))
        let res = await axios.post(`${API}/supercategories/manage`,data)
        dispatch(addNotification({notification:res.data.message,variant:'success'}))
        await dispatch(getSupercategories())
    } catch (error) {
        console.log(error)
        status = false
        dispatch(addNotification({notification:'Supercategory was not created',variant:'error'}))
    } finally {
        dispatch(supercategoriesLoading(false))
        return status
    }
}



export const updateSuperCategory = (id,formData) => async (dispatch,getState) => {
    let status = true 
    try {
        if(!id) throw new Error('No supercategory provided')
        const data = {}
        const image =  formData.image?.file ? await convertFile(formData.image.file) : formData.image.src
        Object.keys(formData).forEach(key => {
            data[key] = formData[key].value !== undefined  ? formData[key].value  : image
        })
        data.id = id
        dispatch(supercategoriesLoading(true))
        let res = await axios.put(`${API}/supercategories/manage`,data)
        dispatch(addNotification({notification:res.data.message,variant:'success'}))
        await dispatch(getSupercategories())
    } catch (error) {
        status = false
        dispatch(addNotification({notification:'Supercategory was not updated',variant:'error'}))
    } finally {
        dispatch(supercategoriesLoading(false))
        return status
    }

} 


export const deleteSuperCategory = (id) => async (dispatch,getState) => {
    let status = true 
    try {
        if(!id) throw new Error('No supercategory provided')
         
        dispatch(supercategoriesLoading(true))
        let res = await axios.delete(`${API}/supercategories/manage`,{
            data:{id}
        })
        dispatch(addNotification({notification:res.data.message,variant:'success'}))
        await dispatch(getSupercategories())
    } catch (error) {
        status = false
        dispatch(addNotification({notification:'Supercategory was not deleted',variant:'error'}))
    } finally {
        dispatch(supercategoriesLoading(false))
        return status
    }

} 


/// CRUD CATEGORIES 

export const createCategory = (formData) => async (dispatch,getState) => {
    let status = true 
    try {
        const data = {}
        const image =  await convertFile(formData.image.file)
        Object.keys(formData).forEach(key => {
            data[key] = formData[key].value !== undefined  ? formData[key].value : image
        })
        dispatch(categoriesLoading(true))
        let res = await axios.post(`${API}/categories/manage`,data)
        dispatch(addNotification({notification:res.data.message,variant:'success'}))
        await dispatch(getSupercategories())
        await dispatch(getCategories())
    } catch (error) {
        console.log(error)
        status = false
        dispatch(addNotification({notification:'Category was not created',variant:'error'}))
    } finally {
        dispatch(categoriesLoading(false))
        return status
    }
}



export const updateCategory = (id,formData) => async (dispatch,getState) => {
    let status = true 
    try {
        if(!id) throw new Error('No Category provided')
        const data = {}
        const image =  formData.image?.file ? await convertFile(formData.image.file) : formData.image.src
        Object.keys(formData).forEach(key => {
            data[key] = formData[key].value !== undefined  ? formData[key].value  : image
        })
        data.id = id
        dispatch(categoriesLoading(true))
        let res = await axios.put(`${API}/categories/manage`,data)
        dispatch(addNotification({notification:res.data.message,variant:'success'}))
        await dispatch(getSupercategories())
        await dispatch(getCategories())
    } catch (error) {
        status = false
        dispatch(addNotification({notification:'Category was not updated',variant:'error'}))
    } finally {
        dispatch(categoriesLoading(false))
        return status
    }

} 


export const deleteCategory = (id) => async (dispatch,getState) => {
    let status = true 
    try {
        if(!id) throw new Error('No Category provided')
         
        dispatch(categoriesLoading(true))
        let res = await axios.delete(`${API}/categories/manage`,{
            data:{id}
        })
        dispatch(addNotification({notification:res.data.message,variant:'success'}))
        await dispatch(getSupercategories())
        await dispatch(getCategories())
    } catch (error) {
        status = false
        dispatch(addNotification({notification:'Category was not deleted',variant:'error'}))
    } finally {
        dispatch(categoriesLoading(false))
        return status
    }

} 