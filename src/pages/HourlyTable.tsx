import { Paper, TableHead, Typography } from "@mui/material";
import React, { useContext } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TableColumn } from "../types";
import { AppContext } from "../context";


export default function HourlyTable() {
    const { data, selectedHour } = useContext(AppContext);
    const rows = data?.days[selectedHour].hours || [];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns: TableColumn[] = [
        { id: 'datetime', label: 'datetime' },
        { id: 'temp', label: 'temp' },
        { id: 'dew', label: 'dew' },
        { id: 'humidity', label: 'humidity' },
        { id: 'windgust', label: 'windgust' },
        { id: 'windspeed', label: 'windspeed' },
        { id: 'winddir', label: 'winddir' },
        { id: 'cloudcover', label: 'cloudcover' },
        { id: 'visibility', label: 'visibility' },
        { id: 'conditions', label: 'conditions' },
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <br />
            <Typography variant="h6" gutterBottom>
                Date: {data?.days[selectedHour].datetime}
            </Typography>
            <br />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.datetimeEpoch}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}