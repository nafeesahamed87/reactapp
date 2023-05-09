import React, { useEffect, useState } from 'react';
import api from '../../api';
import 'react-widgets/scss/styles.scss';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import { BiSearch } from 'react-icons/bi';
import { Controller, useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';
import { DropdownList } from 'react-widgets';
import RoleConfiguration from '../../hooks/role';
import { useNavigate } from 'react-router-dom';

export default function CreateUser({ setIsOpen, isOpen }) {
    const [loading, setLoading] = useState(false);
    const [isloadingbutton, setIsloadingbutton] = useState(false);
    const [emailError, setEmailError] = useState({ error: false, message: '' });
    const [emailVerified, setEmailVerified] = useState(false);
    // const request = {
    //     resource: 'api/users',
    // };
    const navigate = useNavigate();
    const { data: roleData } = RoleConfiguration();

    const {
        handleSubmit,

        control,
        watch,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            first_name: '',
            last_name: '',
            display_name: '',
            email: '',
            role_id: '',
        },
    });

    let email = watch('email');
    useEffect(() => {
        if (emailVerified || emailError.error) {
            validator.isEmpty(email) &&
                setEmailError((preValue) => ({
                    ...preValue,
                    error: true,
                    message: 'Email is required',
                }));
            !validator.isEmpty(email) &&
                setEmailError((preValue) => ({
                    ...preValue,
                    error: true,
                    message: 'Invalid Email',
                }));
            validator.isEmail(email) &&
                setEmailError((preValue) => ({
                    ...preValue,
                    error: false,
                    message: '',
                }));
        }
        if (emailVerified) {
            setEmailVerified(false);
            reset({
                first_name: '',
                last_name: '',
                display_name: '',

                email: '',
                role: '',
            });
        }
    }, [email]);

    const handleOnSubmit = async (data) => {
        try {
            setIsloadingbutton(true);
            const request = { resource: 'api/users' };
            const res = await api.user.addUser(request, {
                ...data,
            });
            if (res.data.status === 200) {
                toastr.success('Success', 'User added successfully');
                setIsloadingbutton(false);
                navigate('/users');
            } else {
                toastr.error('Error', res.data.message);
            }
        } catch (error) {
            toastr.error('Error', error.message);
        }
    };

    return (
        <Container>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '80vh' }}
            >
                <div
                    className="rounded-5 mx-2 my-4 p-4 w-75 position-relative"
                    style={{
                        boxShadow: 'rgba(0,0,0,0.2) 0px 2px 8px 0px',
                        backgroundColor: 'whitesmoke',
                        marginLeft: '12.5%',
                    }}
                >
                    <h4 className="fw-bold ms-4 text-center">Add User</h4>
                    <>
                        <Form
                            onSubmit={handleSubmit((data) =>
                                handleOnSubmit(data),
                            )}
                        >
                            <div className="col-12">
                                <div
                                    className="container"
                                    style={{ height: '100px' }}
                                >
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="font-weight-semibold mb-1">
                                                Email
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <Controller
                                                    control={control}
                                                    name="email"
                                                    defaultValue={''}
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            value,
                                                            name,
                                                        },
                                                    }) => (
                                                        <>
                                                            <input
                                                                autoFocus
                                                                className="form-control mt-1"
                                                                type="text"
                                                                name={name}
                                                                value={value}
                                                                onChange={(e) =>
                                                                    setValue(
                                                                        'email',
                                                                        e.target.value.trim(),
                                                                    )
                                                                }
                                                            />
                                                            {emailVerified && (
                                                                <i className="icon-verify text-green-500" />
                                                            )}
                                                        </>
                                                    )}
                                                ></Controller>

                                                <button
                                                    className="ms-3"
                                                    onClick={async (e) => {
                                                        e.preventDefault();
                                                        if (
                                                            validator.isEmpty(
                                                                email,
                                                            ) ||
                                                            emailError.error
                                                        ) {
                                                            return;
                                                        }
                                                        setLoading(true);
                                                        if (
                                                            !validator.isEmail(
                                                                watch(
                                                                    'email',
                                                                ).trim(),
                                                            )
                                                        ) {
                                                            setEmailError(
                                                                (preValue) => ({
                                                                    ...preValue,
                                                                    error: true,
                                                                    message:
                                                                        'Invalid Email',
                                                                }),
                                                            );
                                                            setLoading(false);
                                                            return;
                                                        }
                                                        const response =
                                                            await api.azure.getUserByAzureEmail(
                                                                watch(
                                                                    'email',
                                                                ).trim(),
                                                            );
                                                        if (
                                                            response?.status ===
                                                            422
                                                        ) {
                                                            setEmailError(
                                                                (preValue) => ({
                                                                    ...preValue,
                                                                    error: true,
                                                                    message:
                                                                        'Email must be valid',
                                                                }),
                                                            );

                                                            setLoading(false);
                                                        }
                                                        if (
                                                            response?.status !==
                                                                200 &&
                                                            response?.field ===
                                                                'Email'
                                                        ) {
                                                            setEmailError(
                                                                (preValue) => ({
                                                                    ...preValue,
                                                                    error: true,
                                                                    message:
                                                                        response?.message,
                                                                }),
                                                            );

                                                            setLoading(false);
                                                            return;
                                                        }
                                                        if (
                                                            response?.data?.mail
                                                        ) {
                                                            reset({
                                                                first_name:
                                                                    response
                                                                        ?.data
                                                                        .givenName,
                                                                display_name:
                                                                    response
                                                                        ?.data
                                                                        .displayName,
                                                                last_name:
                                                                    response
                                                                        ?.data
                                                                        .surname,
                                                                email: response
                                                                    ?.data.mail,
                                                            });
                                                            setEmailVerified(
                                                                true,
                                                            );
                                                        }
                                                        setLoading(false);
                                                    }}
                                                    style={{
                                                        border: '0.5px solid grey',
                                                        padding: '7px 18px',
                                                        backgroundColor:
                                                            'white',
                                                        borderRadius: '8px',
                                                        marginTop: '3px',
                                                    }}
                                                >
                                                    {loading ? (
                                                        <div
                                                            className="spinner-border spinner-border-sm"
                                                            role="status"
                                                        >
                                                            <span className="visually-hidden"></span>
                                                        </div>
                                                    ) : (
                                                        <BiSearch />
                                                    )}
                                                </button>
                                            </div>
                                            <p className="text-danger  text-start  mx-2">
                                                {emailError?.error && (
                                                    <>{emailError.message}</>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="container mb-4">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="font-weight-semibold mb-2">
                                                Last Name
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </div>

                                            <Controller
                                                control={control}
                                                name="last_name"
                                                defaultValue={''}
                                                render={({
                                                    field: { value, name },
                                                }) => (
                                                    <>
                                                        <input
                                                            value={value}
                                                            name={name}
                                                            disabled
                                                            onChange={(e) =>
                                                                setValue(
                                                                    'last_name',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className={`form-control ${
                                                                !emailVerified &&
                                                                'cursor-not-allowed'
                                                            }`}
                                                            id="grid-last-name"
                                                            type="text"
                                                            aria-label="lname"
                                                        />
                                                    </>
                                                )}
                                            ></Controller>
                                        </div>

                                        <div className="col-6">
                                            <div className="font-weight-semibold mb-2">
                                                First Name
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </div>

                                            <Controller
                                                control={control}
                                                name="first_name"
                                                defaultValue={''}
                                                render={({
                                                    field: { value, name },
                                                }) => (
                                                    <>
                                                        <input
                                                            value={value}
                                                            name={name}
                                                            disabled
                                                            onChange={(e) =>
                                                                setValue(
                                                                    'first_name',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className={`form-control  ${
                                                                !emailVerified &&
                                                                'cursor-not-allowed'
                                                            }`}
                                                            id="grid-first-name"
                                                            type="text"
                                                            aria-label="fname"
                                                        />
                                                    </>
                                                )}
                                            ></Controller>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="container"
                                    style={{ height: '100px' }}
                                >
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="font-weight-semibold mb-2 w-100">
                                                Display Name
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </div>

                                            <Controller
                                                control={control}
                                                name="display_name"
                                                defaultValue={''}
                                                render={({
                                                    field: { value, name },
                                                }) => (
                                                    <>
                                                        <input
                                                            value={value}
                                                            name={name}
                                                            disabled
                                                            onChange={(e) =>
                                                                setValue(
                                                                    'display_name',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className={`form-control  ${
                                                                !emailVerified &&
                                                                'cursor-not-allowed'
                                                            }`}
                                                            id="grid-display-name"
                                                            type="text"
                                                            aria-label="displayname"
                                                        />
                                                    </>
                                                )}
                                            ></Controller>
                                        </div>

                                        <div className="col-6">
                                            <div className="font-weight-semibold mb-2">
                                                Role
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </div>
                                            <div className="">
                                                <Controller
                                                    control={control}
                                                    name="role_id"
                                                    rules={{
                                                        required: true,
                                                    }}
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            value,
                                                        },
                                                    }) => (
                                                        <>
                                                            <DropdownList
                                                                disabled={
                                                                    !emailVerified
                                                                }
                                                                data={
                                                                    roleData
                                                                        ?.data
                                                                        ?.data
                                                                }
                                                                dataKey="role_id"
                                                                textField="role_name"
                                                                // defaultValue={1}
                                                                onChange={(
                                                                    data,
                                                                ) => {
                                                                    onChange(
                                                                        data?.role_id,
                                                                    );
                                                                }}
                                                            ></DropdownList>
                                                        </>
                                                    )}
                                                />
                                                {errors.role_id && (
                                                    <div className="text-danger  text-start  mx-0 p-2">
                                                        {errors.role_id
                                                            ?.type ===
                                                        'required'
                                                            ? 'Role is required'
                                                            : ''}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <Button
                                        type="button"
                                        onClick={() => navigate('/users')}
                                        className="btn btn my-3  mt-4 mx-3 "
                                        variant="outline-secondary"
                                        size="md"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={
                                            !emailVerified || isloadingbutton
                                        }
                                        type="submit"
                                        variant="success"
                                        className="btn btn my-3   mt-4 px-3"
                                        style={{
                                            backgroundColor: 'rgb(73, 151, 73)',
                                        }}
                                    >
                                        {isloadingbutton ? (
                                            <div className="d-flex flex-row gap-2">
                                                <Spinner
                                                    className="text-dark  mx-2"
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        ) : (
                                            <>{'Save'}</>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </>
                </div>
            </div>
        </Container>
    );
}
