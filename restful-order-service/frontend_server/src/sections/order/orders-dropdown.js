import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function OrderSelect({handleChange, status}) {
  return (
    <div>
      <FormControl sx={{ p: 2, minWidth: 200, maxWidth: 500 }}>
        <Select
          id="status"
          label="status"
          onChange={handleChange}
          autoWidth
          value={status}
        >
          <MenuItem value="PENDING">PENDING</MenuItem>
          <MenuItem value="SHIPPED">SHIPPED</MenuItem>
          <MenuItem value="DELIVERED">DELIVERED</MenuItem>
          <MenuItem value="CANCELED">CANCELED</MenuItem>
          <MenuItem value="RETURNED">RETURNED</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
