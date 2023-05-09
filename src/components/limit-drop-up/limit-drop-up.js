import React from 'react';
import { DropdownList } from 'react-widgets';
import 'react-widgets/scss/styles.scss';

export default function Limitdropup(props) {
    const options = [10, 50, 100, 150];
    const handleChange = (e) => {
        props.handlingLimit(e);
    };

    return (
        <DropdownList
            dropUp
            data={props.option || options}
            defaultValue={props.limit}
            onChange={(value) => {
                handleChange(value);
            }}
        ></DropdownList>
    );
}
