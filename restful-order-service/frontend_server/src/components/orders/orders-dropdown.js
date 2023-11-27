/**
 * Copyright (c) 2023, WSO2 LLC (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function OrderSelect({handleChange, status}) {
  console.log(status)
  return (
    <div>
      <FormControl sx={{minWidth: 200, maxWidth: 500}}>
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId='status'
          id="status"
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
