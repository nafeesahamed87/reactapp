import React, { Suspense } from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { RouteKeys } from './route-keys';

import api from '../../api';
import Loader from '../../components/loader/container-loader';
import { AzureAuthenicationWrapper } from '../auth/AzureLogin';
import withErrorBoundary from '../../HOC/withErrorBoundary';
import { Layout } from '../../components/layout';

const AuthenticateRoute = (props) => {
    // Use the useAuth hook to get the authentication state.
    const auth = useAuth(api.auth);

    /**
     * useEffect that scrolls the window to the top corner of the page when the children of the component changes.
     * @param {Object} props.children - the children of the component
     */
    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }, [props.children]);

    //const { component, ...rest } = props;

    if (auth.isAuthenticated) {
        // If the user is authenticated, render the children within a MainLayout component.
        return (
            <MainLayout>
                <Suspense fallback={<Loader />}>{props.children}</Suspense>
            </MainLayout>
        );
    } else {
        // If the user is not authenticated, navigate to the auth route and pass the current pathname as state.
        return (
            <>
                <Navigate
                    to={`${RouteKeys.Auth}?redirect=${window.location.pathname}`}
                    state={{ path: window.location.pathname }}
                />
            </>
        );
    }

    /*return (
    <Route
      {...rest}
      render={(childProps) => {
        if (auth.isAuthenticated) {
          return <props.component {...childProps} />;
        }
        auth.redirectSave("");
        return (
          <Redirect
            to={{
              pathname: RouteKeys.Login,
            }}
            from={childProps.location.pathname}
          />
        );
      }}
    />
  );*/
};

/**
 * The main layout for the application.
 *
 * @param {Object} props - The props for the layout.
 * @param {React.ReactElement} props.children - The children to render within the layout.
 *
 * @returns {React.ReactElement} The main layout.
 */
const MainLayout = React.memo((props) => {
    const children = React.useMemo(() => props.children, [props.children]);
    return (
        <AzureAuthenicationWrapper>
            <Layout>{children}</Layout>
        </AzureAuthenicationWrapper>
    );
});

export default withErrorBoundary(
    AuthenticateRoute,
    MainLayout,
);
