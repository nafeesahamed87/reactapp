import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Accordion } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FaFilter } from 'react-icons/fa';
import './filter.scss';
// import { useLinkClickHandler } from 'react-router-dom';
// import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useNavigate } from 'react-router-dom';

export default function Filters({
    filterData,
    handleFilter,
    emptyFilter,
    statusData,
}) {
    const [filter, setFilter] = useState({
        role: [],
        status: [],
    });
    const [role, setRole] = useState([]);
    const [status, setStatus] = useState([]);
    const navigate = useNavigate();
    const [close, setClose] = useState(false);

    const handleClose = () => {
        setClose(!close);
    };

    const handleRoleChange = ({ role_id, role_name, e }) => {
        // Destructuring
        const { checked } = e.target;
        if (checked) {
            setRole([...role, { role_name, role_id }]);
        } else {
            setRole((prev) => prev.filter((o) => o.role_name !== role_name));
        }
    };

    const handleStatusChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        if (checked) {
            setStatus([...status, value]);
        } else {
            setStatus(status.filter((e) => e !== value));
        }
    };

    const handleSubmit = () => {
        handleClose();

        const obj = {
            role,
            status,
        };
        handleFilter(obj);
        navigate('/users');
    };

    const handleClear = () => {
        setClose(false);
        setFilter({ ...filter, role: [], status: [] });
        handleFilter({ ...filter, role: [], status: [] });
    };

    useEffect(() => {
        setRole([]);
        setStatus([]);
    }, [emptyFilter]);

    const popover = (
        <div
            className="my-1 shadow-lg bg-light rounded p-2 border"
            style={{ width: '17em' }}
        >
            <Accordion className="my-2">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Role</Accordion.Header>
                    <Accordion.Body
                        className="body-1"
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    >
                        {filterData?.map(({ role_name, role_id }) => (
                            <div className="d-flex">
                                <input
                                    type="checkbox"
                                    id={role_id}
                                    value={{ role_name, role_id }}
                                    checked={role.find(
                                        (o) => o.role_name === role_name,
                                    )}
                                    name={role_name}
                                    onChange={(e) =>
                                        handleRoleChange({
                                            role_name,
                                            role_id,
                                            e,
                                        })
                                    }
                                ></input>
                                <label className="px-2" htmlFor={role_id}>
                                    {role_name}
                                </label>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Status</Accordion.Header>
                    <Accordion.Body
                        className="body-2"
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    >
                        {statusData.map((statusData) => (
                            <div className="d-flex">
                                <input
                                    className="px-2"
                                    type="checkbox"
                                    checked={status.includes(statusData)}
                                    onChange={handleStatusChange}
                                    value={statusData}
                                    name={statusData}
                                ></input>
                                <label className="px-2" htmlFor={statusData}>
                                    {statusData}
                                </label>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Row>
                <Col md={7}>
                    <Button
                        className="bg-secondary border border-secondary"
                        onClick={() => {
                            setRole([]);
                            setStatus([]);
                            handleClear();
                        }}
                    >
                        Reset
                    </Button>
                </Col>
                <Col md={4}>
                    <Button
                        className="custom-button-do "
                        variant="success"
                        onClick={handleSubmit}
                    >
                        Filter
                    </Button>
                </Col>
            </Row>
        </div>
    );
    return (
        <div className="d-flex flex-row-reverse">
            <div>
                <OverlayTrigger
                    rootClose
                    trigger="click"
                    placement="bottom-end"
                    overlay={popover}
                >
                    <Button variant="dark" className="mx-3">
                        <FaFilter className="mt-1"></FaFilter>
                    </Button>
                </OverlayTrigger>
            </div>
            <div className="overflow-auto" style={{ width: '75%' }}>
                {role?.length > 0 && (
                    <div className="d-flex flex-row-reverse overflow-auto m-1">
                        {role?.map((data) => (
                            <div
                                className="text-success mx-1  border border-success rounded-1 px-1 label-bg"
                                style={{ fontSize: '0.65em' }}
                            >
                                {data.role_name}
                            </div>
                        ))}
                        <div className="fw-bold " style={{ fontSize: '0.8em' }}>
                            Role:
                        </div>
                    </div>
                )}

                {status?.length > 0 && (
                    <div className="d-flex flex-row-reverse overflow-auto">
                        {status?.map((data) => (
                            <div>
                                <div
                                    className="text-success mx-1  border border-success rounded-1 px-1 label-bg"
                                    style={{ fontSize: '0.65em' }}
                                >
                                    {data}
                                </div>
                            </div>
                        ))}
                        <div className="fw-bold" style={{ fontSize: '0.8em' }}>
                            Status:
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
