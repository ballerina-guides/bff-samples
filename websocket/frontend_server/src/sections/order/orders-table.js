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
import { Scrollbar } from 'src/components/scrollbar';
import * as React from 'react';
import { useEffect, useState } from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';

// const WebSocket = require('ws');

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
