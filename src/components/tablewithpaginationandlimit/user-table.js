import React from 'react';
import Limitdropup from '../limit-drop-up/limit-drop-up';
import Pagination from '../pagination/pagination';
import UserTable from '../table/user-tables/user-tables';

import { Row } from 'react-bootstrap';

export default function DynamicUserTable({
    row,
    columns,
    isPagination,
    isLimit,
    pages,
    limit,
    handlingLimit,
    handlePageChange,
    currentPage,
}) {
    return (
        <div className="">
            <div className="my-4">
                <UserTable row={row} columns={columns}></UserTable>
            </div>
            <div className="d-flex justify-content-end  mx-auto mt-5 w-100 ">
                {isLimit && (
                    <Row>
                        <div className="d-flex  mx-3">
                            <div className="py-2 font-weight-semibold">
                                Records per page
                            </div>
                            <div className=" px-1">
                                <Limitdropup
                                    limit={limit}
                                    handlingLimit={handlingLimit}
                                ></Limitdropup>
                            </div>
                        </div>
                    </Row>
                )}
                {isPagination && (
                    <div className="py-1">
                        <Pagination
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                            pages={pages}
                        ></Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}
