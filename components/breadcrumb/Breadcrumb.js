import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigationLink from '../navlink/NavigationLink';
import { Divider } from '@mui/material';
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb(props) {
    if(!props.links?.length) return null
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {props.links.map(link =>(
            <NavigationLink href={link.href} underline="hover" key={link.href}>
                {link.title}
            </NavigationLink>
        ))}
      </Breadcrumbs>
      <Divider />
    </div>
  );
}
