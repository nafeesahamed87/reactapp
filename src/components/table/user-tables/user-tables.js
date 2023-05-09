import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { useTable } from 'react-table';
import './user.scss';

export default function UserTable({ columns, row }) {
    const memoziedColumns = useMemo(() => columns, [columns]);
    const memoziedRow = useMemo(() => row, [row]);

    const tableInstance = useTable({
        columns: memoziedColumns,
        data: memoziedRow,
    });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;
    return (
        <Table
            {...getTableProps()}
            responsive
            hover
            style={{
                // borderCollapse: 'separate',
                borderSpacing: '0  15px',
                backgroundColor: '#fff',
                fontSize: '17px',
            }}
        >
            <thead style={{ backgroundColor: '#F5F5F5' }}>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                className="py-3 fw-bold"
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <>
                            <tr {...row.getRowProps()} className="border">
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="py-2 "
                                            style={{
                                                fontSize: '15px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        </>
                    );
                })}
            </tbody>
        </Table>
    );
}
