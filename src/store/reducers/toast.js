import { createAction, createActionWithPayload } from '../utils'

// action types
const CREATE_TOAT = 'TOAST/CREATED'
const CLOSE_TOAT = 'TOAST/CREATED'

// initial state
const initialState = { type: null, msg: null }

export const toastInAction = (data) => {
  return createActionWithPayload(CREATE_TOAT, data)
}
export const toastInClose = () => {
  return createAction(CLOSE_TOAT)
}

// reducer
export const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TOAT:
      return {
        ...state,
        type: action.payload.type,
        msg: action.payload.msg,
      }
    case CLOSE_TOAT:
      return {
        ...state,
        type: null,
        msg: null,
      }
    default:
      return state
  }
}
