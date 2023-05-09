import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaScrewdriver, FaUser } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoSettingsSharp } from 'react-icons/io5';
import '../offcanvas/offcanvas.scss';
import { RouteKeys } from '../../containers/routes/route-keys';

function RenderOffCanvas({ name, handleClose, show, ...props }) {
    const authState = useSelector((state) => state.authUser);

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header
                    closeButton
                    closeVariant="white"
                    className="bg-dark text-white"
                >
                    <Offcanvas.Title>
                        <FaUser size={'1.3em'} className="m-2" />
                        <span style={{ color: 'rgb(34, 194, 34)' }}>
                            {authState.profile.display_name}
                        </span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="bg-dark text-white">
                    <Row>
                        <Col>
                            <NavLink to="/metrics">
                                {({ isActive }) => (
                                    <div className="menu" onClick={handleClose}>
                                        <span className="icon">
                                            <FaScrewdriver
                                                size={'1.4em'}
                                                color={
                                                    isActive
                                                        ? 'rgb(90, 238, 90)'
                                                        : null
                                                }
                                            />
                                        </span>
                                        <span className="ict text-sm-start ms-2">
                                            Metrics
                                        </span>
                                    </div>
                                )}
                            </NavLink>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <NavLink to={RouteKeys.AddConfigurationSettings}>
                                {({ isActive }) => (
                                    <div className="menu" onClick={handleClose}>
                                        <span className="icon">
                                            <IoSettingsSharp
                                                size={'1.4em'}
                                                color={
                                                    isActive
                                                        ? 'rgb(90, 238, 90)'
                                                        : null
                                                }
                                            />
                                        </span>
                                        <span className="ict text-sm-start ms-2">
                                            Settings
                                        </span>
                                    </div>
                                )}
                            </NavLink>
                        </Col>
                    </Row>
                    {authState.profile.role_id === 1 ? (
                        <Row>
                            <Col>
                                <NavLink to="/users">
                                    {({ isActive }) => (
                                        <div
                                            className="menu"
                                            onClick={handleClose}
                                        >
                                            <span className="icon">
                                                <FiUser
                                                    size={'1.4em'}
                                                    color={
                                                        isActive
                                                            ? 'rgb(90, 238, 90)'
                                                            : null
                                                    }
                                                />
                                            </span>
                                            <span className="ict text-sm-start ms-2">
                                                Users
                                            </span>
                                        </div>
                                    )}
                                </NavLink>
                            </Col>
                        </Row>
                    ) : null}
                    {/* {authState.profile.role_id === 1 ? (<Row> */}
                    {/* {authState.profile.role_id === 1 ? (<Row>
                        <Col>
                            <NavLink
                                className={(nav) =>
                                    nav?.isActive ? 'active' : null
                                }
                                to="/themes"
                            >
                                {({ isActive }) => (
                                    <div className="menu">
                                        <span className="icon">
                                            <FiSettings
                                                size={'1.4em'}
                                                color={
                                                    isActive
                                                        ? 'rgb(90, 238, 90)'
                                                        : null
                                                }
                                            />
                                        </span>
                                        <span className="ict">
                                            SiteSettings
                                        </span>
                                    </div>
                                )}
                            </NavLink>
                        </Col>
                    </Row>) : null} */}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default RenderOffCanvas;
