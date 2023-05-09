import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FiUsers } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function SideNavBar({ name, handleClose, show, ...props }) {
    const authState = useSelector((state) => state.authUser);

    return (
        <div
            className=" position-absolute d-none d-md-block"
            style={{
                height: '93.3vh',
                maxWidth: '160px',
                minWidth: '160px',
                background: 'rgb(33, 37, 41)',
            }}
        >
            <Container>
                {/* <Row>
                    <Col>
                        <NavLink to="/metrics">
                            {({ isActive }) => (
                                <div className="menu">
                                    <span className="icon">
                                        <FaScrewdriver
                                            size={'1.5em'}
                                            color={
                                                isActive
                                                    ? 'rgb(90, 238, 90)'
                                                    : null
                                            }
                                        />
                                    </span>
                                    <span className="ict">Metrics</span>
                                </div>
                            )}
                        </NavLink>
                    </Col>
                </Row> */}
                {/* <Row style={{ marginTop: '25px' }}>
                    <Col>
                        <Row>
                            <Col>
                                <label
                                    for="touch"
                                    className="d-flex gap-2 ms-2"
                                >
                                    <MdOutlineDashboardCustomize
                                        className="text-light"
                                        size={'1.5em'}
                                    ></MdOutlineDashboardCustomize>
                                    <div className="text-light titlename ">
                                        Dashboard
                                    </div>
                                </label>
                                <input type="checkbox" id="touch"></input>
                                <div className="slide">
                                    <NavLink to="/dashboard/freshness">
                                        {({ isActive }) => (
                                            <div
                                                color={
                                                    isActive
                                                        ? 'rgb(90, 238, 90)'
                                                        : null
                                                }
                                            >
                                                Freshness
                                            </div>
                                        )}
                                    </NavLink>
                                    <NavLink to="/dashboard/schema">
                                        {({ isActive }) => (
                                            <div
                                                color={
                                                    isActive
                                                        ? 'rgb(90, 238, 90)'
                                                        : null
                                                }
                                            >
                                                Schema
                                            </div>
                                        )}
                                    </NavLink>
                                    <NavLink to="/dashboard/volume">
                                        {({ isActive }) => (
                                            <div
                                                color={
                                                    isActive
                                                        ? 'rgb(90, 238, 90)'
                                                        : null
                                                }
                                            >
                                                Volume
                                            </div>
                                        )}
                                    </NavLink>
                                    <NavLink to="/dashboard/distribution">
                                        {({ isActive }) => (
                                            <div
                                                color={
                                                    isActive
                                                        ? 'rgb(90, 238, 90)'
                                                        : null
                                                }
                                            >
                                                Distribution
                                            </div>
                                        )}
                                    </NavLink>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row> */}
                {/* {authState.profile.role_id === 1 ? (
                    <Row style={{ marginTop: '35px' }}>
                        <Col>
                            <Row>
                                <Col>
                                    <label
                                        for="stouch"
                                        className="d-flex gap-2 ms-2"
                                    >
                                        <IoSettingsSharp
                                            className="text-light"
                                            size={'1.5em'}
                                        ></IoSettingsSharp>
                                        <div className="text-light titlename ">
                                            Settings
                                        </div>
                                    </label>
                                    <input type="checkbox" id="stouch"></input>
                                    <div className="slide settingsSlide">
                                        <NavLink
                                            to={
                                                RouteKeys.AddConfigurationSettings
                                            }
                                        >
                                            {({ isActive }) => (
                                                <div
                                                    color={
                                                        isActive
                                                            ? 'rgb(90, 238, 90)'
                                                            : null
                                                    }
                                                >
                                                    Config
                                                </div>
                                            )}
                                        </NavLink>
                                        <NavLink to={RouteKeys.DataSource}>
                                            {({ isActive }) => (
                                                <div
                                                    color={
                                                        isActive
                                                            ? 'rgb(90, 238, 90)'
                                                            : null
                                                    }
                                                >
                                                    Data Source
                                                </div>
                                            )}
                                        </NavLink>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ) : null} */}
                {authState.profile.role_id === 1 ? (
                    <Row>
                        <Col>
                            <NavLink
                                className={(nav) =>
                                    nav?.isActive ? 'active' : null
                                }
                                to="/users"
                            >
                                {({ isActive }) => (
                                    <div className="menu">
                                        <span className="icon">
                                            <FiUsers
                                                size={'1.5em'}
                                                color={
                                                    isActive
                                                        ? 'rgb(90, 238, 90)'
                                                        : null
                                                }
                                            />
                                        </span>
                                        <span className="ict">Users</span>
                                    </div>
                                )}
                            </NavLink>
                        </Col>
                    </Row>
                ) : null}
            </Container>
        </div>
    );
}
