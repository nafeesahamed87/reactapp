import React from 'react';
import { useState } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import RenderOffCanvas from '../offcanvas/offcanvas';
import { FaBars, FaUser } from 'react-icons/fa';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AzureLogout } from '../../containers/auth/AzureLogin';
// import api from '../../api';

function Navigationbar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    // const [active, setActive] = useState(false);

    // const theme = useSelector((state) => state.themesSettings);
    const authState = useSelector((state) => state.authUser);

    return (
        <>
            <Navbar
                variant="light"
                className=" "
                style={{
                    background: '#ffffff',
                }}
            >
                <Container className="ms-3">
                    <Navbar.Brand
                        className="brand fw-bolder"
                        onClick={() => navigate('/')}
                    >
                        <h4>
                            <span className="fw-bolder" id="brandpre">
                                Data
                            </span>{' '}
                            <span className="fw-bolder">Sharing</span>
                        </h4>
                    </Navbar.Brand>
                </Container>
                <Nav className="me-4">
                    <div className="d-md-flex d-md-block d-none">
                        <FaUser size={'1.4em'} className="m-1" />

                        <Dropdown>
                            <Dropdown.Toggle variant="white">
                                {authState.profile.display_name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end">
                                <Dropdown.Item href="#/action-1">
                                    <AzureLogout />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <FaBars
                        size={'1.4em'}
                        className="d-md-none d-sm-block"
                        onClick={handleShow}
                    />
                </Nav>
            </Navbar>
            <RenderOffCanvas
                name="side bar"
                handleClose={handleClose}
                show={show}
                placement={'end'}
            />
        </>
    );
}

export default Navigationbar;
