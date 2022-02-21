import CardLayout from "../../layout/CardLayout"
import Title from "../title/Title"

export default function DashboardCardInfo(props) {
  return (
    <CardLayout sx={{p:2,...props?.sx}} elevation={props.elevation ?? 0}>
        <Title>{props.icon} {props.title}</Title>
        <div>
            {props.children}    
        </div>     
    </CardLayout>
  )
}
