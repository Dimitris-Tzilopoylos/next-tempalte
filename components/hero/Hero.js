import React from "react";
import { Typography, Box, Grid, Container } from "@mui/material"
import Image from "next/image";

 

export default function Hero({title,subtitle,image,children,}) {
  return (
  
        <Grid container spacing={0} >
          <Grid item xs={12} sm={12} md={12} lg={12} xs={12} sx={{width:'100%',height:400,background:'red'}} >
              <img src={image} layout="intrinsic"  width={'100%'} height={400}/> 
          </Grid>
        </Grid>
    
  );
}