// state is the current value of our state object

import { AppContextInterface, AppState } from '../context/useCableContext'

type Action =
  | { type: 'NEW_END_ONE'; value: string }
  | { type: 'NEW_END_TWO'; value: string }
  | { type: 'NEW_LOCATION'; value: string }

// action is the data we received from our dispatch
const reducerFunction = (state: AppState, action: Action) => {
  console.log({ action, state })

  switch (action.type) {
    case 'NEW_END_ONE':
      return { ...state, newCable: { ...state.newCable, endOne: action.value } }

    case 'NEW_END_TWO':
      return { ...state, newCable: { ...state.newCable, endTwo: action.value } }
    case 'NEW_LOCATION':
      return {
        ...state,
        newCable: { ...state.newCable, location: action.value },
      }

    default:
      // Returns a new COMPLETE state
      // or I could throw an error
      return state
  }
}

export default reducerFunction
