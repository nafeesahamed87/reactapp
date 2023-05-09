import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';

export default function SearchBar({ handleSearch, emptySearchbar }) {
    const [value, setValue] = useState('');
    const [emptySearch, setEmptySearch] = useState(false);

    const handleChange = (e) => {
        if (e.target.value.trim() === '') {
            setEmptySearch(true);
        }
        if (e.target.value.length > 0) {
            setEmptySearch(false);
        }
        setValue(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() === '') {
            setEmptySearch(true);
        } else {
            setEmptySearch(false);
            handleSearch(value);
        }
    };
    const handleClear = () => {
        setValue('');
        handleSearch('');
        setEmptySearch(false);
    };

    useEffect(() => {
        setValue('');
    }, [emptySearchbar]);
    return (
        <>
            <form className="d-flex flex-row gap-2" onSubmit={handleSubmit}>
                <input
                    placeholder="&#x1F50E; Search"
                    className="py-1  rounded-2 w-100"
                    onChange={handleChange}
                    value={value}
                ></input>
                {(value || emptySearch) && (
                    <h4 type="button" onClick={handleClear}>
                        <IoClose></IoClose>
                    </h4>
                )}
                <Button variant="dark" type="submit">
                    Search
                </Button>
            </form>
            {emptySearch && (
                <div className="validation-msg mx-2 text-red-500 mt-1">
                    <p>Enter a value</p>
                </div>
            )}
        </>
    );
}
