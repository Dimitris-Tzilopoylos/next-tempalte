import MainLayout from '../../layout/MainLayout'
import RegisterForm from '../../components/register/RegisterForm'
import { isAuthenticated } from '../../utility/auth'
export default function Register(props) {
  return (
    <MainLayout>
        <RegisterForm />    
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
 