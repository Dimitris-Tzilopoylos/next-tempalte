 import { DataGrid } from '@mui/x-data-grid';
 
 




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
        disableColumnFilter={props.disableColumnFilter}
        
      />
   
  );
}
