import { loadingBarReducer } from "react-redux-loading-bar";
import { reducer as toastrReducer } from "react-redux-toastr";
import { combineReducers } from "redux";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'


import { authUserReducer } from "./reducers/authUser";
import { navigateReducer } from './reducers/navigate'
import { toastReducer } from './reducers/toast'
import { uiDataReducer } from './reducers/ui-data'
// import { themeReducer } from "./reducers/theme";

/**
 * Root reducer for the application.
 *
 * @param {Object} state - The current state of the store.
 * @param {Object} action - The action being dispatched.
 *
 * @returns {Object} The new state of the store.
 */
const rootReducer = combineReducers({
  authUser: authUserReducer,
  toastr: toastrReducer,
  loadingBar: loadingBarReducer,
  uiData: uiDataReducer,
  toast: toastReducer,
  navigateReducer: navigateReducer,
});

export default rootReducer;
