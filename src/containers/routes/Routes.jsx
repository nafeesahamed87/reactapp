import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ContainerLoader from '../../components/loader/container-loader';
import AzureLogin from '../auth/AzureLogin';
import AuthenticateRoute from './AuthenticateRoute';
import RedirectIfAuthenticatedRoute from './RedirectIfAuthenticatedRoute';
import { RouteKeys } from './route-keys';
import AddUser from '../../components/add-user/addUser';


const Home = lazy(() => import('../home'));
const NotFound = lazy(() => import('../notfound'));
const AuthPage = lazy(() => import('../auth'));
const CreateUser = lazy(() => import('../../components/Crud/CreateUser'));
const EditUser = lazy(() => import('../../components/Crud/EditUser'));
class NavRoutes extends React.Component {
    render() {
        return (
            <Suspense fallback={<ContainerLoader />}>
                <Routes>
                    <>  
                        <Route
                            path={RouteKeys.Home}
                            element={
                                <AuthenticateRoute>
                                    <Home />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.AddUser}
                            element={
                                <AuthenticateRoute>
                                    <AddUser />
                                </AuthenticateRoute>
                            }
                        />
                        
                        <Route
                            path={RouteKeys.Auth}
                            element={
                                <RedirectIfAuthenticatedRoute>
                                    <AuthPage />
                                </RedirectIfAuthenticatedRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.AzureLogin}
                            element={
                                <RedirectIfAuthenticatedRoute>
                                    <AzureLogin />
                                </RedirectIfAuthenticatedRoute>
                            }
                        />
                        
                        <Route
                            path={RouteKeys.CreateUser}
                            element={
                                <AuthenticateRoute>
                                    <CreateUser />
                                </AuthenticateRoute>
                            }
                        />
                        <Route
                            path={RouteKeys.EditUser}
                            element={
                                <AuthenticateRoute>
                                    <EditUser />
                                </AuthenticateRoute>
                            }
                        />
                        
                        <Route path={RouteKeys.NotFound} element={NotFound} />
                        <Route path="*" element={NotFound} />
                    </>
                </Routes>
            </Suspense>
        );
    }
}

export default NavRoutes;
