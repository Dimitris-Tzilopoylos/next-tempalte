import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';



export default  (props) =>  {
    return (
        <NextLink href={props.href} passHref  >
            <MUILink variant={props.variant} underlinew={props.hover} style={{textDecoration:'none',color:'white',display:'flex'}} >{props.children}</MUILink>
        </NextLink>
    )
}