import React from 'react';
import { BiError } from 'react-icons/bi';

export default function NodataFound() {
    return (
        <div className=" text-secondary positon-relative fw-bolder fs-1 ">
            <div className="position-absolute top-50 start-50">
                <BiError></BiError>{" "} No Data found
            </div>
        </div>
    );
}
