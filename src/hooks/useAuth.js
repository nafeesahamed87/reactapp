import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    loggedInAction,
    redirectApplyAction,
    redirectSaveAction,
} from '../store/reducers/authUser';
import { StatusCodes } from 'http-status-codes';
import { toastr } from 'react-redux-toastr';

import { RouteKeys } from '../containers/routes/route-keys';
import { StringEncryption } from '../utils';

export const useAuth = (authService) => {
    const authState = useSelector((state) => state.authUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const azureAdLogin = async (
        azureToken,
        setToken,
        redirectTo,
        onSuccess,
        onFailed,
    ) => {
        try {
            const encryptToken = StringEncryption(azureToken);
            // navigate(RouteKeys.Home);
            // toastr.success('Success', 'Authenticated');
            const response = await authService.azureAdlogin({
                accesToken: encryptToken,
            });
            if (response.status === StatusCodes.OK) {
                if (response.data.user) {
                    dispatch(
                        loggedInAction({
                            ...response.data,
                            token: response.data.token,
                        }),
                    );
                    await setToken(response.data.token);
                    redirectApply();
                    navigate(redirectTo);
                    if (onSuccess) onSuccess();
                    toastr.success('Success', 'Logged In');
                } else {
                    navigate(RouteKeys.Auth);
                    toastr.error(
                        'Error',
                        response.message
                            ? response.message
                            : 'You dont have acess to application',
                    );
                }
            } else {
                navigate(RouteKeys.Auth);
                toastr.error(
                    'Error',
                    response.message
                        ? response.message
                        : 'You dont have acess to application',
                );
            }
        } catch (error) {
            toastr.error(
                'Error',
                error.message ? error.message : 'Some Error Occur!',
            );
            onFailed?.(error);
        }
    };

    const redirectSave = (to) => {
        dispatch(redirectSaveAction(to));
    };

    const redirectApply = () => dispatch(redirectApplyAction());
    return {
        isAuthenticated: !!authState.token,
        azureAdLogin,
        redirectSave,
        redirectApply,
    };
};
