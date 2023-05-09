import React, { useEffect, useState } from 'react';
import api from '../../api';
import 'react-widgets/scss/styles.scss';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import { Controller, useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';
import { DropdownList } from 'react-widgets';
import RoleConfiguration from '../../hooks/role';
import { useNavigate, useParams } from 'react-router-dom';
import ContainerLoader from '../loader/container-loader';

export default function EditUser({ setIsOpen, isOpen }) {
    const [loading, setLoading] = useState(true);
    const [isloadingbutton, setIsloadingbutton] = useState(false);
    const [emailError, setEmailError] = useState({ error: false, message: '' });
    const [emailVerified, setEmailVerified] = useState(false);
    const [user, setUser] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const status = [
        { Status: 'Active', IsActive: true },
        { Status: 'Inactive', IsActive: false },
    ];

    const { data: roleData } = RoleConfiguration();

    const [apiRole, setapiRole] = useState([]);

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
            is_active: '',
        },
    });

    let email = watch('role_id');
    let isactive = watch('is_active');

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
    useEffect(async () => {
        try {
            setLoading(true);
            const response = await api.user.getUserById(params.id);
            if (response.data.status == 200) {
                setUser(true);
                setValue('first_name', response.data.data.first_name);
                setValue('last_name', response.data.data.last_name);
                setValue('display_name', response.data.data.display_name);
                setValue('email', response.data.data.email);
                setValue('role_id', response.data.data.role_id);
                setValue('is_active', response.data.data.is_active);
            }
            const roles = await api.rolelist.getRole();
            if (roles.data.status == 200) {
                setapiRole(roles?.data?.data);
            }
            setLoading(false);
        } catch (error) {}
    }, []);
    const LogicButtton = (prop) => (
        <>
            {emailVerified ? (
                <div {...prop}>{prop.children}</div>
            ) : (
                <button {...prop}>{prop.children}</button>
            )}
        </>
    );

    const handleOnSumit = async (data) => {
        try {
            setIsloadingbutton(true);
            const request = { resource: `api/users/${params.id}` };
            const res = await api.user.updateUser(request, {
                ...data,
            });
            if (res.data.status === 200) {
                toastr.success('Success', 'User updated successfully');
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
            {loading ? (
                <ContainerLoader></ContainerLoader>
            ) : (
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
                        <h4 className="fw-bold ms-4 text-center">Edit User</h4>
                        <>
                            <>
                                {apiRole.length > 0 ? (
                                    <>
                                        <Form
                                            onSubmit={handleSubmit(
                                                handleOnSumit,
                                            )}
                                        >
                                            <div className="col-12">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="font-weight-semibold mb-2">
                                                                Email
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <Controller
                                                                    control={
                                                                        control
                                                                    }
                                                                    name="email"
                                                                    defaultValue={
                                                                        ''
                                                                    }
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
                                                                                className="form-control"
                                                                                type="text"
                                                                                disabled
                                                                                name={
                                                                                    name
                                                                                }
                                                                                value={
                                                                                    value
                                                                                }
                                                                                onChange={(
                                                                                    e,
                                                                                ) =>
                                                                                    setValue(
                                                                                        'email',
                                                                                        e.target.value.trim(),
                                                                                    )
                                                                                }
                                                                            />
                                                                        </>
                                                                    )}
                                                                ></Controller>
                                                            </div>
                                                            <div className="text-danger  text-start  mx-3">
                                                                {emailError?.error && (
                                                                    <>
                                                                        {
                                                                            emailError.message
                                                                        }
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="container mt-4">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="font-weight-semibold mb-2">
                                                                Last Name
                                                            </div>

                                                            <Controller
                                                                control={
                                                                    control
                                                                }
                                                                name="last_name"
                                                                defaultValue={
                                                                    ''
                                                                }
                                                                render={({
                                                                    field: {
                                                                        value,
                                                                        name,
                                                                    },
                                                                }) => (
                                                                    <>
                                                                        <input
                                                                            value={
                                                                                value
                                                                            }
                                                                            name={
                                                                                name
                                                                            }
                                                                            disabled
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                setValue(
                                                                                    'last_name',
                                                                                    e
                                                                                        .target
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
                                                            </div>

                                                            <Controller
                                                                control={
                                                                    control
                                                                }
                                                                name="first_name"
                                                                defaultValue={
                                                                    ''
                                                                }
                                                                render={({
                                                                    field: {
                                                                        value,
                                                                        name,
                                                                    },
                                                                }) => (
                                                                    <>
                                                                        <input
                                                                            value={
                                                                                value
                                                                            }
                                                                            name={
                                                                                name
                                                                            }
                                                                            disabled
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                setValue(
                                                                                    'first_name',
                                                                                    e
                                                                                        .target
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

                                                <div className="container mt-4">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="font-weight-semibold w-100 mb-2">
                                                                Display Name
                                                            </div>

                                                            <Controller
                                                                control={
                                                                    control
                                                                }
                                                                name="display_name"
                                                                defaultValue={
                                                                    ''
                                                                }
                                                                render={({
                                                                    field: {
                                                                        value,
                                                                        name,
                                                                    },
                                                                }) => (
                                                                    <>
                                                                        <input
                                                                            value={
                                                                                value
                                                                            }
                                                                            name={
                                                                                name
                                                                            }
                                                                            disabled
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                setValue(
                                                                                    'display_name',
                                                                                    e
                                                                                        .target
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
                                                            </div>
                                                            <div className="">
                                                                <Controller
                                                                    control={
                                                                        control
                                                                    }
                                                                    name="role_id"
                                                                    render={({
                                                                        field: {
                                                                            onChange,
                                                                            value,
                                                                        },
                                                                    }) => (
                                                                        <>
                                                                            <DropdownList
                                                                                data={
                                                                                    apiRole
                                                                                }
                                                                                dataKey="role_id"
                                                                                textField="role_name"
                                                                                defaultValue={
                                                                                    value
                                                                                }
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
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="container mt-4">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="font-weight-semibold mb-2">
                                                                Status
                                                            </div>
                                                            <div className="relative">
                                                                <Controller
                                                                    control={
                                                                        control
                                                                    }
                                                                    name="is_active"
                                                                    defaultValue={
                                                                        ''
                                                                    }
                                                                    render={({
                                                                        field: {
                                                                            onChange,
                                                                            value,
                                                                        },
                                                                    }) => (
                                                                        <div className="custom-dropdown ">
                                                                            <DropdownList
                                                                                data={
                                                                                    status
                                                                                }
                                                                                value={
                                                                                    value
                                                                                }
                                                                                dataKey="IsActive"
                                                                                textField="Status"
                                                                                defaultValue={
                                                                                    value
                                                                                }
                                                                                onChange={(
                                                                                    data,
                                                                                ) => {
                                                                                    onChange(
                                                                                        data.IsActive,
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                ></Controller>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-end">
                                                    <Button
                                                        type="button"
                                                        className="btn btn my-3  mt-4 mx-3"
                                                        variant="outline-secondary"
                                                        onClick={() =>
                                                            navigate('/users')
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        disabled={
                                                            isloadingbutton
                                                        }
                                                        type="submit"
                                                        className="btn btn my-3  mt-4 px-3"
                                                        style={{
                                                            backgroundColor:
                                                                'green',
                                                        }}
                                                        variant="success"
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
                                ) : null}
                            </>
                        </>
                    </div>
                </div>
            )}
        </Container>
    );
}
