import { createActionWithPayload } from '../utils'

const ACTION_SIDE_MENU_EXPANDED = 'UI/SIDE_MENU_EXPANDED'

const initialState = {
  sideMenuExpanded: false,
}

export const sideMenuExpandedAction = (expanded) => {
  return createActionWithPayload(ACTION_SIDE_MENU_EXPANDED, expanded)
}

// reducer
export const uiDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SIDE_MENU_EXPANDED:
      return {
        ...state,
        sideMenuExpanded: action.payload,
      }
    default:
      return state
  }
}
