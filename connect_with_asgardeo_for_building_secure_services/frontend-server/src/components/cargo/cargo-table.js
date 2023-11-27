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

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export const CargosTable = (props) => {
  const {
    items = [],
    handleClick,
    open = false
  } = props;

  return (
    <Card>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Start From</b>
                </TableCell>
                <TableCell>
                  <b>End From</b>
                </TableCell>
                <TableCell>
                  <b>Type</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((cargo) => {
                return (
                  <TableRow
                    hover
                    key={cargo.cargoId}
                  >
                    <TableCell>
                      {cargo.cargoId}
                    </TableCell>
                    <TableCell>
                      {cargo.status}
                    </TableCell>
                    <TableCell>
                      {cargo.startFrom}
                    </TableCell>
                    <TableCell>
                      {cargo.endFrom}
                    </TableCell>
                    <TableCell>
                      {cargo.cargoType}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleClick(cargo.cargoId)}>View</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
    </Card>
  );
};

CargosTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  handleClick: PropTypes.func,
  open: PropTypes.bool
};