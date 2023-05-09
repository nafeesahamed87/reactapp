import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Accordion } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FaFilter } from 'react-icons/fa';
import './filter.scss';
// import { useLinkClickHandler } from 'react-router-dom';
// import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useNavigate } from 'react-router-dom';

export default function Filter({
    filterData,
    handleFilter,
    emptyFilter,
    data,
}) {
    const [filter, setFilter] = useState({
        dataSource: [],
        checktypes: [],
    });
    const [dataSource, setDataSource] = useState([]);
    const [checktypes, setChecktype] = useState([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [close, setClose] = useState(false);

    const handleClose = () => {
        setClose(!close);
    };

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        if (checked) {
            setDataSource([...dataSource, value]);
        } else {
            setDataSource(dataSource.filter((e) => e !== value));
        }
    };

    const handleChecktypeChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        if (checked) {
            setChecktype([...checktypes, value]);
        } else {
            setChecktype(checktypes.filter((e) => e !== value));
        }
    };

    const handleSubmit = () => {
        handleClose();

        const obj = {
            dataSource,
            checktypes,
        };
        handleFilter(obj);
        navigate('/');
    };

    const handleClear = () => {
        setClose(false);
        setFilter({ ...filter, dataSource: [], checktypes: [] });
        handleFilter({ ...filter, dataSource: [], checktypes: [] });
    };
    useEffect(() => {
        setDataSource([]);
        setChecktype([]);
    }, [emptyFilter]);

    const popover = (
        <div
            className="my-1 shadow-lg bg-light rounded p-2 border"
            style={{ width: '17em' }}
        >
            <Accordion className="my-2">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Source</Accordion.Header>
                    <Accordion.Body className="accordion-body-table">
                        {/* <Checkbox data={filterData?.[0]}></Checkbox> */}
                        {filterData?.[0]?.map((data) => (
                            <div className="d-flex" key={data}>
                                <input
                                    type="checkbox"
                                    id={data}
                                    value={data}
                                    checked={dataSource.includes(data)}
                                    name={data}
                                    onChange={handleChange}
                                ></input>
                                <label className="px-2" htmlFor={data}>
                                    {data}
                                </label>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Check type</Accordion.Header>
                    <Accordion.Body>
                        {data.map((data) => (
                            <div className="d-flex" key={data}>
                                <input
                                    className="px-2"
                                    type="checkbox"
                                    checked={checktypes.includes(data)}
                                    onChange={handleChecktypeChange}
                                    value={data}
                                    name={data}
                                ></input>
                                <label className="px-2" htmlFor={data}>
                                    {data}
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
                            setDataSource([]);
                            setChecktype([]);
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
                    className="m-0"
                    show={show}
                    onToggle={(isOpen, event, metadata) => {
                        setShow(isOpen);
                    }}
                >
                    <Button variant="dark">
                        <FaFilter className="mt-1"></FaFilter>
                    </Button>
                </OverlayTrigger>
            </div>
            <div className="overflow-auto " style={{ width: '85%' }}>
                {dataSource?.length > 0 && (
                    <div className="d-flex flex-row-reverse overflow-auto m-1 ">
                        {dataSource?.map((data) => (
                            <div
                                className="text-success mx-1  border border-success rounded-1 px-1 label-bg"
                                style={{ fontSize: '0.65em' }}
                            >
                                {data}
                            </div>
                        ))}
                        <div
                            className="fw-bold mx-1"
                            style={{ fontSize: '0.8em' }}
                        >
                            Source:
                        </div>
                    </div>
                )}

                {checktypes?.length > 0 && (
                    <div className="d-flex flex-row-reverse overflow-auto mx-1">
                        {checktypes?.map((data) => (
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
                            Checktype:
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
