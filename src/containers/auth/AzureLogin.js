import React, { useReducer } from 'react';
import { AuthenticationState, AzureAD } from 'react-aad-msal';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Loader from '../../components/loader/container-loader';
import { useAuth } from '../../hooks/useAuth';
import { logoutAction } from '../../store/reducers/authUser';
import { RouteKeys } from '../routes/route-keys';
import AuthCanvas from './AuthCanvas';
import Styles from './authPage.module.scss';
import { getAuthProvider } from './azureAuthProvider';

const initialState = {
    status: 'pending',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'AUTHENTICATING':
            return { ...state, status: 'authenticating' };
        case 'AUTHENTICATED':
            return { ...state, status: 'authenticated' };
        case 'FAILED':
            return { ...state, status: 'failed' };
        case 'PENDING':
            return { ...state, status: 'pending' };
        default:
            throw new Error();
    }
};

/**
 * @function AzureLogin
 * @desc a component that handles the Azure AD authentication process for the application.
 * @returns {JSX.Element} - The JSX markup for the component.
 */
export default function AzureLogin() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const auth = useAuth(api.auth);

    const authProvider = getAuthProvider();

    // React.useEffect(() => {
    //     return () => dispatch({ type: 'PENDING' });
    // }, []);

    const authenticate = async () => {
        try {
            const accessToken = await (
                await authProvider.getAccessToken()
            ).accessToken;

            if (!accessToken) {
                toastr.error('Error', 'No Access Token');
                dispatch({ type: 'FAILED' });
                return;
            }
            await auth.azureAdLogin(
                accessToken,
                (jwtToken) => api.setToken(jwtToken),
                window.localStorage.getItem('redirect') ?? RouteKeys.Home,
                () => {
                    window.localStorage.removeItem('redirect');
                },
                () => {
                    dispatch({ type: 'FAILED' });
                },
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {!authProvider && (
                <AuthCanvas error={true}>
                    <p
                        style={{
                            color: '#000',
                            lineHeight: 'none',
                            textAlign: 'center',
                        }}
                    >
                        Configuration Error: Azure AD Configuration Missing
                    </p>
                    <span className={Styles['bsk-container']}>
                        <button
                            className="bsk-btn bsk-btn-default"
                            onClick={() => dispatch({ type: 'PENDING' })}
                        >
                            <object
                                type="image/svg+xml"
                                data="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
                                className="x-icon"
                            ></object>
                            Sign in with Agilisium
                        </button>
                    </span>
                </AuthCanvas>
            )}
            {state.status === 'pending' && authProvider && (
                <AzureAD provider={authProvider} forceLogin={true}>
                    {({ accountInfo, authenticationState, error, login }) => {
                        if (!error) {
                            if (
                                authenticationState ===
                                AuthenticationState.Authenticated
                            ) {
                                if (accountInfo.account) {
                                    dispatch({ type: 'AUTHENTICATED' });
                                    authenticate();
                                }
                            } else if (
                                authenticationState ===
                                AuthenticationState.Unauthenticated
                            ) {
                                // login();
                            }
                            return (
                                <>
                                    <Loader />
                                </>
                            );
                        } else {
                            if (error.errorCode === 'access_denied') {
                                window.location.pathname = RouteKeys.Auth;
                            }
                            return (
                                <>
                                    <Loader />
                                </>
                            );
                        }
                    }}
                </AzureAD>
            )}
            {state.status === 'authenticated' && (
                <>
                    <Loader />
                </>
            )}
            {state.status === 'failed' && (
                <>
                    <AuthCanvas error={true}>
                        <p
                            style={{
                                color: '#000',
                                lineHeight: 'none',
                                textAlign: 'center',
                            }}
                        >
                            Unable to login with your account. Please contact
                            the admininstrator
                        </p>
                        <span className={Styles['bsk-container']}>
                            <button
                                id="loginbutton"
                                className="bsk-btn bsk-btn-default"
                                onClick={() => dispatch({ type: 'PENDING' })}
                            >
                                <object
                                    type="image/svg+xml"
                                    data="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
                                    className="x-icon"
                                ></object>
                                Sign in with Agilisium
                            </button>
                        </span>
                    </AuthCanvas>
                </>
            )}
        </>
    );
}

/**
 * @function AzureLogout
 * @desc Custom component for logging out of Azure AD authentication
 * @return {JSX.Element} JSX element for rendering the logout button
 */
export const AzureLogout = () => {
    const authProvider = getAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            <AzureAD provider={authProvider} forceLogin={false}>
                {({ authenticationState, logout }) => {
                    if (
                        authenticationState ===
                        AuthenticationState.Authenticated
                    ) {
                        return (
                            <>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 "
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="user-menu-item-2"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    Logout
                                </a>
                            </>
                        );
                    } else {
                        return (
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 "
                                role="menuitem"
                                tabIndex="-1"
                                id="user-menu-item-2"
                                onClick={async () => {
                                    dispatch(logoutAction());
                                    sessionStorage.clear();
                                    localStorage.clear();
                                    navigate(RouteKeys.Auth);
                                }}
                            >
                                Logout
                            </a>
                        );
                    }
                }}
            </AzureAD>
        </>
    );
};

/**
 * @function AzureAuthenicationWrapper
 * @desc This component is a higher-order component that wraps its children and ensures
 * that they are only rendered if the user is authenticated. If the user is not authenticated,
 * the component redirects them to the login page.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {React.ReactNode} - A component that wraps the children and handles Azure AD authentication
 */
export const AzureAuthenicationWrapper = ({ children }) => {
    const authProvider = getAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useAuth(api.auth);
    if (auth.isAuthenticated) {
        return (
            <>
                <AzureAD
                    provider={authProvider}
                    unauthenticatedFunction={() => {
                        dispatch(logoutAction());
                        sessionStorage.clear();
                        localStorage.clear();
                        navigate(RouteKeys.Auth);
                    }}
                >
                    {({ authenticationState }) => {
                        if (
                            authenticationState ===
                            AuthenticationState.Unauthenticated
                        ) {
                            dispatch(logoutAction());
                            sessionStorage.clear();
                            localStorage.clear();
                            navigate(
                                `${RouteKeys.Auth}?redirect=${window.location.pathname}`,
                            );
                            return (
                                <>
                                    <Loader />
                                </>
                            );
                        }
                        return <>{children}</>;
                    }}
                </AzureAD>
            </>
        );
    }
};
