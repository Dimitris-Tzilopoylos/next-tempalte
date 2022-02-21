import  Typography  from "@mui/material/Typography"



export default function Title(props) {
  return (
    <Typography  {...props} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',...props?.sx}}>
        {props.children}
    </Typography>
  )
}
