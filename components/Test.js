import { connect } from "react-redux"
import requiresAuthentication from "../HOC/withServerSideAuthentication"
import useUser from "../hooks/useUser"
const TestComponent =  requiresAuthentication(props => {
    const {user} = useUser()
    return <div>{user?.name}</div>
})


export default TestComponent
  