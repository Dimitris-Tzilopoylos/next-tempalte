import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


 




export default function DataTable(props) {
  if(!props.rows?.length) return null
  return (

      <DataGrid
        loading={props.loading}
        disableColumnSelector={props.disableHide}
        rowCount={props.total}
        rows={props.rows}
        columns={props.columns}
        pageSize={props.view}
        rowsPerPageOptions={props.rowsPerPageOptions ?? [6,12,24,48]}
        checkboxSelection={props.withCheckbox}
        disableSelectionOnClick
        sx={{width:'100%',height:'100%',...props?.sx}}
        page={props.page ? props.page  : 0}
        autoHeight={props.autoHeight ?? true}
      />
   
  );
}
