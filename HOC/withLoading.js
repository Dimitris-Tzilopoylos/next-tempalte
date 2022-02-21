import  LinearProgress from "@mui/material/LinearProgress";


const withLoading = (WrapperComponent) => {
    return (props) => {
        if(props.loading) return <LinearProgress /> 
        return <WrapperComponent {...props} />
    }
}


export default withLoading