import React from "react";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../utility/auth";
import { authenticate } from "../store/actions/auth";
import useUser from "../hooks/useUser";
import BackdropLoader from "../components/ui/BackdropLoader";

export function withSSRClientAuthentication(WrappedComponent)  {
  
    return (props) => {
        const {authLoading,isAuthenticated} = useUser()
        const dispatch = useDispatch()
        React.useEffect(()=>{
          dispatch(authenticate(props.user,props.token))
        }, [ dispatch ])
        if(authLoading || !isAuthenticated) return <BackdropLoader open={true} />
        return <WrappedComponent dispatch={dispatch} {...props} />

    }
}


export function withAuth(gssp) {
    return async (ctx) => {
      const user =  isAuthenticated(ctx)
      if(!user) return {
        props:{},
        redirect:{permanent:false,destination:'/auth/login'}
      }
      ctx.req.user = user
      ctx.req.token = ctx.req.cookies.jwt
     return await gssp(ctx)
    }
}


export default function requiresAuthentication(WrapperComponent) {
  return (props) => {
    const auth = useUser()
    if(!auth.isAuthenticated) return null 
    if(props.withAuth) {
      return <WrapperComponent {...props} {...auth} />
    }
    return <WrapperComponent  {...props} />
  }
}