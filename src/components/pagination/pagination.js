import React from 'react';
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleLeft,
    FaAngleRight,
} from 'react-icons/fa';

export default function Pagination({ currentPage, handlePageChange, pages }) {
    const handlePageChanges = (newPage) => {
        handlePageChange(newPage);
    };
    return (
        <div className="container d-flex justify-content-evenly">
            {currentPage > 1 ? (
                <button
                    onClick={() => handlePageChanges(1)}
                    className="btn btn-sm "
                >
                    <FaAngleDoubleLeft></FaAngleDoubleLeft>
                </button>
            ) : (
                <button className="btn btn-sm ">
                    <FaAngleDoubleLeft></FaAngleDoubleLeft>
                </button>
            )}{' '}
            {currentPage > 1 ? (
                <button
                    onClick={() => handlePageChanges(currentPage - 1)}
                    className="btn btn-sm btn btn-sm-sm"
                >
                    <FaAngleLeft></FaAngleLeft>{' '}
                </button>
            ) : (
                <button className="btn btn-sm ">
                    <FaAngleLeft></FaAngleLeft>{' '}
                </button>
            )}{' '}
            <div className="px-2 mx-4 btn btn-sm btn btn-sm-ouline-dark">
                Page {currentPage} of {pages}
            </div>
            {currentPage < pages ? (
                <button
                    onClick={() => handlePageChanges(currentPage + 1)}
                    className="btn btn-sm "
                >
                    <FaAngleRight></FaAngleRight>{' '}
                </button>
            ) : (
                <button className="btn btn-sm ">
                    <FaAngleRight></FaAngleRight>{' '}
                </button>
            )}
            {currentPage < pages ? (
                <button
                    onClick={() => handlePageChanges(pages)}
                    className="btn btn-sm "
                >
                    <FaAngleDoubleRight></FaAngleDoubleRight>{' '}
                </button>
            ) : (
                <button className="btn btn-sm ">
                    <FaAngleDoubleRight></FaAngleDoubleRight>{' '}
                </button>
            )}
        </div>
    );
}
