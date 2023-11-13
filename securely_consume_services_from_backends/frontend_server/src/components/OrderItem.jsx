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

import { TableRow, TableCell } from "@mui/material";
import React from "react";

export default function OrderItem({ row }) {
    return (
        <TableRow
            key={row.orderId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {row.orderId}
            </TableCell>
            <TableCell align="right">{row.status}</TableCell>
            <TableCell align="right">{row.shipId == null ? "Not Assigned": row.shipId}</TableCell>
            <TableCell align="right">{row.item}</TableCell>
            <TableCell align="right">{row.quantity}</TableCell>
        </TableRow>
    );
}