import React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Mail from '@mui/icons-material/Mail'
import PeopleAlt from '@mui/icons-material/PeopleAlt'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ValidationService from '../../services/ValidationService'
import { loginUser } from '../../utility/auth'
import Message from '../ui/Message'
import CardLayout from '../../layout/CardLayout'
import {useRouter} from 'next/router'
import LockOpen from '@mui/icons-material/LockOpen'
import  Typography from '@mui/material/Typography'


const vdService = new ValidationService()
const opposite = {"password":"password2","password2":"password"}


export default function LoginForm(props) {

    const router = useRouter()

    const [user,setUser] = React.useState({
        email:{value:'dimtzilopoylos@gmail.com',isValid:true,error:''},
        password:{value:'12345678',isValid:true,error:''},
    })
    const [showPassword,setShowPassword] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const [message,setMessage] = React.useState(null)
    const [error,setError] = React.useState(null)
    const togglePasswordVisibility = (e) => setShowPassword(prev => !prev)
    
    const onChange = (e) => {
        const {isValid,error,value} = handleValidation(e)
        let newState = {...user,[e.target.name]:{value:value,isValid:isValid,error}}
        if(opposite[e.target.name]) {
            newState[opposite[e.target.name]] = {...user[opposite[e.target.name]],isValid,error}
        }
        setUser(newState)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await loginUser(user)
        setError(res.error)
        setMessage(res.error ? null : 'Successfully logged in')
        setLoading(false)
        if(!res.error) {
            // setUser({      
            //     email:{value:'',isValid:false,error:''},
            //     password:{value:'',isValid:false,error:''},
            // })
            router.replace('/dashboard')
        }

    }

    const handleValidation = (e) => {
        if(e.target.type === "email") {
            let {isValid,value} = vdService.validateEmail(e.target.value) 
            return  {error:isValid ? '' : 'Email is incorrect',isValid,value}
        }
        if(["name","last_name"].indexOf(e.target.name) !== -1) 
        {
            let {isValid,value} = vdService.validateString(e.target.value,{
                min:2,
                max:20
            })
            return {isValid,error:isValid ? 'This field should be between 2 and 20 characters long' : '',value}
        }
        if(["password","password2"].indexOf(e.target.name) !== -1) 
        {
            let {isValid,value} = vdService.validateString(e.target.value,{
                min:8,
                max:16,
                trim:true
            })

           let isValid2 = vdService.compareValues(e.target.value,user[opposite[e.target.name]]?.value)
           
           return {isValid:isValid,value,error:isValid  ? '' : 'Password should be between 8 and 16 characters long' }
        }
    }

  return (  
  
            <Container maxWidth="sm" sx={{display:'flex', alignItems:'center',jsutifyContent:'center',height:'100vh',mt:-12}}>
                <CardLayout sx={{p:2}}>
                    <form autoComplete='off' onSubmit={onSubmit}>  
                        <Grid container spacing={3}  sx={{justifyContent:'center'}} >
                            <Grid item md={7} xs={12} sx={{display:'flex',justifyContent:'center'}}>
                                <Typography alignItems={'center'} component="h4" variant="h5"  sx={{display:'flex',alignItems:'center'}} >
                                    <LockOpen color="warning" sx={{fontSize:'inherit'}} />
                                    Login
                                </Typography>
                            </Grid>
                            <Grid item md={7} xs={12} >
                                <Message severity="success" onClose={()=>setMessage(null)} title={"Welcome"} message={message} />
                                <Message severity="error" onClose={()=>setError(null)} title={"Ooops..."} message={error} />
                            </Grid>
                            <Grid item md={7} xs={12} >
                                <Input 
                                name="email" 
                                type="email" 
                                id="email" 
                                disabled={loading}
                                onChange={onChange}
                                error={!user.email.isValid}
                                helperText={user.email.error} 
                                value={user.email?.value} 
                                label={"Email"} 
                                fullWidth={true}
                                options={{autoComplete:'off',fullWidth:true}} 
                                autoComplete="new-password"
                                variant="filled" 
                                icon={<Mail />} 
                                
                                />
                            </Grid>          
                            <Grid item md={7} xs={12} >
                                <Input 
                                name="password" 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                disabled={loading}
                                onChange={onChange} 
                                value={user.password.value} 
                                label={"Password"} 
                                fullWidth={true} 
                                options={{autoComplete:'off',fullWidth:true}} 
                                variant="filled"  
                                iconPosition={"end"}
                                endIcon={showPassword ? <VisibilityOff /> : <Visibility />}
                                onEndIconClick={togglePasswordVisibility}
                                error={!user.password.isValid}
                                helperText={user.password.error} 
                                />
                            </Grid>
                            <Grid item md={7} xs={12} sx={{justifyContent:'center',display:'flex',mt:2}}>
                                <Button endIcon={<PeopleAlt />} type={"submit"} disabled={ !!Object.values(user).find(val => !val.isValid) || loading} loading={loading}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>  
                    </form> 
                </CardLayout>    
            </Container>
  )
}
