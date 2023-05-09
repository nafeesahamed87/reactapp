import api from "../api";
import { unauthorizedApiResponseInterceptor } from "../api/interceptor";
import { AuthService } from "../api/services/auth";
import { logoutAction } from "./reducers/authUser";
import { clearDataAction } from "./reducers/common";
import { toastr } from "react-redux-toastr";

/**
 * Initializes the application's integration with an HTTP API.
 *
 * @param {Object} store - The Redux store instance.
 */
const initialize = (store) => {
  const state = store.getState();
  unauthorizedApiResponseInterceptor((message) => {
    store.dispatch(logoutAction());
    store.dispatch(clearDataAction());
    api.setToken(undefined);
    toastr.removeByType('error');
    window.location.href = `auth?token=${message}`
  }, [AuthService.loginUrl]);

  api.setToken(state.authUser.token);
  if (state.authUser.token) {
    api.setToken(state.authUser.token);
    // store.dispatch(userActions.fetchProfile());
  }
};

export default initialize;
