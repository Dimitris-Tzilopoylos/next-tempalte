import React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Mail from '@mui/icons-material/Mail'
import PeopleAlt from '@mui/icons-material/PeopleAlt'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ValidationService from '../../services/ValidationService'
import { registerUser } from '../../utility/auth'
import Message from '../ui/Message'
import CardLayout from '../../layout/CardLayout'
import PersonAdd from '@mui/icons-material/PersonAdd'

const vdService = new ValidationService()
const opposite = {"password":"password2","password2":"password"}
export default function RegisterForm(props) {

    const [user,setUser] = React.useState({
        name:{value:'',isValid:true,error:''},
        last_name:{value:'',isValid:true,error:''},
        email:{value:'',isValid:true,error:''},
        password:{value:'',isValid:true,error:''},
        password2:{value:'',isValid:true,error:''}
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
        const res = await registerUser(user)
        setError(res.error)
        setMessage(res.error ? null : 'Registration completed')
        setLoading(false)
        if(!res.error) setUser({
            name:{value:'',isValid:false,error:''},
            last_name:{value:'',isValid:false,error:''},
            email:{value:'',isValid:false,error:''},
            password:{value:'',isValid:false,error:''},
            password2:{value:'',isValid:false,error:''}
        })
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
            return {isValid,error:!isValid ? 'This field should be between 2 and 20 characters long' : '',value}
        }
        if(["password","password2"].indexOf(e.target.name) !== -1) 
        {
            let {isValid,value} = vdService.validateString(e.target.value,{
                min:8,
                max:16,
                trim:true
            })

           let isValid2 = vdService.compareValues(e.target.value,user[opposite[e.target.name]]?.value)
           
           return {isValid:isValid && isValid2,value,error:isValid && isValid2 ? '' : !isValid ? 'Password should be between 8 and 16 characters long' : !isValid2 ? 'Passwords  does not match' : 'Invalid field',value}
        }
    }

  return (  
  
            <Container maxWidth="sm" sx={{display:'flex', alignItems:'center',jsutifyContent:'center',height:'100vh',mt:-12}}>
                <CardLayout sx={{p:2}}>
                    <form autoComplete='off' onSubmit={onSubmit}>  
                        <Grid container spacing={3}  sx={{justifyContent:'center'}} >
                            <Grid item md={7} xs={12} sx={{display:'flex',justifyContent:'center'}}>
                                <Typography alignItems={'center'} component="h4" variant="h5"  sx={{display:'flex',alignItems:'center'}} >
                                    <PersonAdd color="warning" sx={{fontSize:'inherit'}} />
                                    Register
                                </Typography>
                            </Grid>
                            <Grid item md={7} xs={12} >
                                <Message severity="success" onClose={()=>setMessage(null)} title={"Thank you"} message={message} />
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
                                name="name" 
                                type="text" 
                                id="name"
                                disabled={loading} 
                                onChange={onChange} 
                                value={user.name?.value} 
                                label={"Name"} 
                                fullWidth={true} 
                                options={{autoComplete:'off',fullWidth:true}} 
                                variant="filled"  
                                error={!user.name.isValid}
                                helperText={user.name.error} 
                                />
                            </Grid>
                            <Grid item md={7} xs={12} >
                                <Input 
                                name="last_name" 
                                type="text" 
                                id="last_name"
                                disabled={loading} 
                                onChange={onChange} 
                                value={user.last_name?.value} 
                                label={"Last Name"} 
                                fullWidth={true} 
                                options={{autoComplete:'off',fullWidth:true}} 
                                variant="filled"  
                                error={!user.last_name.isValid}
                                helperText={user.last_name.error} 
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
                            <Grid item md={7} xs={12} >
                                <Input 
                                name="password2"
                                disabled={loading} 
                                type={showPassword ? "text" : "password"} 
                                id="password2" onChange={onChange} 
                                value={user.password2?.value} 
                                label={"Verify Password"} 
                                fullWidth={true}
                                options={{autoComplete:'off',fullWidth:true}} 
                                variant="filled"  
                                iconPosition={"end"}
                                endIcon={showPassword ? <VisibilityOff /> : <Visibility />}
                                onEndIconClick={togglePasswordVisibility}
                                error={!user.password2.isValid}
                                helperText={user.password2.error}
                                />
                            </Grid>
                            <Grid item md={7} xs={12} sx={{justifyContent:'center',display:'flex',mt:2}}>
                                <Button endIcon={<PeopleAlt />} type={"submit"} disabled={ !!Object.values(user).find(val => !val.isValid) || loading} loading={loading}>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>  
                    </form>   
                </CardLayout>  
            </Container>
  )
}
