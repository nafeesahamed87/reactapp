import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './main.css';

function Main({ children }) {
    return (
        <div
            className="main"
            style={{
                height: '93vh',
                paddingLeft: '150px',
                maxHeight: '93vh',
                overflow: 'scroll',
            }}
        >
            <Container>
                <Row>
                    <Col>{children}</Col>
                </Row>
            </Container>
        </div>
    );
}

export default Main;
