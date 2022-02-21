 import Card from '@mui/material/Card';
 

export default function CardLayout(props) {
  return (
    <Card sx={props.sx}>
       {props.children}
    </Card>
  );
}
