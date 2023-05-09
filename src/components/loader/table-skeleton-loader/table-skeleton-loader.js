import React from 'react';
import { Table, Placeholder } from 'react-bootstrap';

export default function TableSkeletonLoader({
    intialrows,
    columns,
    initalcolumns,
}) {
    const renderedbody = [...Array(intialrows)].map((e, i) => (
        <tr key={i}>
            {[...Array(initalcolumns)].map((e, index) => (
                <td className="p-2" key={index}>
                    <Placeholder animation="glow">
                        <Placeholder xs={12} className="rounded-1" size="lg" />
                    </Placeholder>
                </td>
            ))}
        </tr>
    ));

    return (
        <Table
            borderless
            hover
            responsive
            className=" my-4 mx-2 table-scroll"
            size="lg"
            style={{
                borderCollapse: 'separate',
                borderSpacing: '0  15px',
                backgroundColor: '#fff',
            }}
        >
            {/* <thead className=" text-dark ">
                <tr>
                    {columns.map((data) => (
                        <th>{data}</th>
                    ))}
                </tr>
            </thead> */}
            <tbody>{renderedbody}</tbody>
        </Table>
    );
}
