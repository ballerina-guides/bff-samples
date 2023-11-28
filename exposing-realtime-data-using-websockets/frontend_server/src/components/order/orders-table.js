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
import { Scrollbar } from 'src/components/scrollbar';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function OrdersTable({items}) {
  const [location1, setLocation1] = useState({longitude: "...", latitude: "..."});
  const [location2, setLocation2] = useState({longitude: "...", latitude: "..."});

  useEffect(() => {
    const wsClient1 = new WebSocket("ws://localhost:9091/logistics/vehicles/V120");
    const wsClient2 = new WebSocket("ws://localhost:9091/logistics/vehicles/V121");

    wsClient1.onmessage = (message) => {
      setTimeout(()=>{
        setLocation1(JSON.parse(message.data));
       }, 10000)
    }
    wsClient2.onmessage = (message) => {
       setTimeout(()=>{
        setLocation2(JSON.parse(message.data));
       }, 10000)
    }
    
  }, [location1, location2]);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Ship
                </TableCell>
                <TableCell>
                  Item
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Longitude
                </TableCell>
                <TableCell>
                  Latitude
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                  <TableRow
                    hover
                    key={items[0].orderId}
                  >
                    <TableCell>
                      {items[0].orderId}
                    </TableCell>
                    <TableCell>
                      {items[0].status}
                    </TableCell>
                    <TableCell>
                      {items[0].shipId != null ? items[0].shipId : "Not Assigned"}
                    </TableCell>
                    <TableCell>
                      {items[0].item}
                    </TableCell>
                    <TableCell>
                      {items[0].quantity}
                    </TableCell>
                    <TableCell>
                      {items[0].date}
                    </TableCell>
                    <TableCell>
                      {location1.longitude}
                    </TableCell>
                    <TableCell>
                      {location1.latitude}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    hover
                    key={items[1].orderId}
                  >
                    <TableCell>
                      {items[1].orderId}
                    </TableCell>
                    <TableCell>
                      {items[1].status}
                    </TableCell>
                    <TableCell>
                      {items[1].shipId != null ? items[1].shipId : "Not Assigned"}
                    </TableCell>
                    <TableCell>
                      {items[1].item}
                    </TableCell>
                    <TableCell>
                      {items[1].quantity}
                    </TableCell>
                    <TableCell>
                      {items[1].date}
                    </TableCell>
                    <TableCell>
                      {location2.longitude}
                    </TableCell>
                    <TableCell>
                      {location2.latitude}
                    </TableCell>
                  </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};
