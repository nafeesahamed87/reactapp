import api from "../../api";
import { createAction, createActionWithPayload } from "../utils";
import { COMMON_RESET_DATA_ACTION } from "./common";

// action types
// login
const AUTH_LOGGED_IN_ACTION = "AUTH/LOGGED_IN";
// profile
const AUTH_PROFILE_UPDATED_ACTION = "AUTH/PROFILE_UPDATED_ACTION";
// logout
const AUTH_LOGOUT_ACTION = "AUTH/LOGOUT";
// redirect
const AUTH_REDIRECT_SAVE_ACTION = "AUTH/REDIRECT_SAVE";
const AUTH_REDIRECT_APPLY_ACTION = "AUTH/REDIRECT_APPLY";
const AUTH_ROLE_CHANGE = 'AUTH/CHANGE_ROLE';

// initial state
const initialState = {
  redirectTo: "/home",
};

export const logoutAction = () => {
  return createAction(AUTH_LOGOUT_ACTION);
};

export const redirectApplyAction = () => {
  return createAction(AUTH_REDIRECT_APPLY_ACTION);
};

export const redirectSaveAction = (to) => {
  return createActionWithPayload(AUTH_REDIRECT_SAVE_ACTION, to);
};

export const profileUpdatedAction = (profile) => {
  return createActionWithPayload(AUTH_PROFILE_UPDATED_ACTION, profile);
};

export const loggedInAction = (data) => {
  return createActionWithPayload(AUTH_LOGGED_IN_ACTION, data);
};

export const changeRole = (data) => {
  return createActionWithPayload(AUTH_ROLE_CHANGE, data)
};

// reducer
export const authUserReducer = (state = initialState, action) => {
  switch (action.type) {
    // login
    case AUTH_LOGGED_IN_ACTION:
      return {
        ...state,
        token: action.payload.token,
        profile: action.payload.user,
        //apiPermissions: action.payload.apiPermissions,
      };

    // logout
    case AUTH_LOGOUT_ACTION:
      api.setToken(undefined);
      return {
        ...state,
        token: undefined,
        profile: undefined,
      };
    // profile
    case AUTH_PROFILE_UPDATED_ACTION:
      return {
        ...state,
        profile: action.payload,
      };

    case COMMON_RESET_DATA_ACTION:
      return {
        ...initialState,
      };

    // redirect
    case AUTH_REDIRECT_SAVE_ACTION:
      return { ...state, redirectTo: action.payload };
    case AUTH_REDIRECT_APPLY_ACTION:
      return { ...state, redirectTo: undefined };
    case AUTH_ROLE_CHANGE:
      return {
        ...state,
        profile: {
          ...state.profile,
          Role: { ...state.profile.Role, RoleName: action.payload },
        },
      }
    default:
      return state;
  }
};
