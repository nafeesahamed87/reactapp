import React from 'react';
import { Spinner } from 'react-bootstrap';

const ContainerLoader = (props) => {
    return (
        <div
            className="position-relative"
            style={{ height: props.height || '93vh' }}
        >
            <div className="">
                <Spinner
                    animation="border"
                    className="fw-bolder"
                    variant="primary"
                    style={{
                        height: '2em',
                        width: '2em',
                        position: 'absolute',
                        fontSize: '18px',
                        top: '50%',
                        left: '50%',
                    }}
                ></Spinner>
                {props.text && <div className="Loader__text">{props.text}</div>}
            </div>
        </div>
    );
};

export default ContainerLoader;
