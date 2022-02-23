import React from 'react'
import { connect } from 'react-redux'
import useProducts from '../../hooks/useProducts'
import AutoCompleteInput from '../autocomplete/AutocompleteInput'
import  Grid from '@mui/material/Grid'
 
const Filters = (props) => {

    const filters = useProducts()

    return (
        <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
                <AutoCompleteInput placeholder={"Search..."} />    
            </Grid> 
        </Grid>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)