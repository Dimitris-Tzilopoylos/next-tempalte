import MainLayout from '../../layout/MainLayout'
import LoginForm from '../../components/login/LoginForm'
import { isAuthenticated } from '../../utility/auth'

export default function Login(props) {
  return (
    <MainLayout>
        <LoginForm />        
    </MainLayout>
  )
}


 export async function getServerSideProps(ctx) {
    const user = isAuthenticated(ctx)
    if(user) return {
        redirect:{permanent:false,destination:'/dashboard'}
      }

      return {
        props:{}
      }
  
   
 }