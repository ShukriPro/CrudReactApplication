// DataTable.js
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DataTable = ({ data, onEdit, onDelete }) => {
  // Columns definition for Material-UI DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'active',
      headerName: 'Active',
      width: 110,
      valueFormatter: ({ value }) => value ? 'Yes' : 'No', // Assuming active is a boolean
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 110,
      renderCell: (params) => (
        <React.Fragment>
          <IconButton onClick={() => onEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      ),
      sortable: false,
      filterable: false,
      disableClickEventBubbling: true,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        //checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
