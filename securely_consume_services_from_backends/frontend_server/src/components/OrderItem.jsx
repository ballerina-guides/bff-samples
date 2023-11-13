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