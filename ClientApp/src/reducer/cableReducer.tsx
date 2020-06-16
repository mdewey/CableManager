// state is the current value of our state object

import {
  AppContextInterface,
  AppState,
  Cable,
} from '../context/useCableContext'

type Action =
  | { type: 'NEW_END_ONE'; value: string }
  | { type: 'NEW_END_TWO'; value: string }
  | { type: 'NEW_LOCATION'; value: string }
  | { type: 'NEW_NOTE'; value: string }
  | { type: 'CABLE_ADDED'; value: { cable: Cable; total: number } }
  | { type: 'SET_COUNT'; value: number }
  | { type: 'CABLE_UNDO'; value: number }

// action is the data we received from our dispatch
const reducerFunction = (state: AppState, action: Action): AppState => {
  console.log({ action, state })

  switch (action.type) {
    case 'NEW_END_ONE':
      return { ...state, newCable: { ...state.newCable, endOne: action.value } }
    case 'NEW_NOTE':
      return { ...state, newCable: { ...state.newCable, note: action.value } }

    case 'NEW_END_TWO':
      return { ...state, newCable: { ...state.newCable, endTwo: action.value } }
    case 'NEW_LOCATION':
      return {
        ...state,
        newCable: { ...state.newCable, location: action.value },
      }
    case 'CABLE_ADDED':
      return {
        ...state,
        mostRecent: action.value.cable,
        totalCables: action.value.total,
        newCable: {
          endOne: '',
          endTwo: '',
          note: '',
          location: '',
          id: undefined,
        },
      }
    case 'SET_COUNT':
      return {
        ...state,

        totalCables: action.value,
      }
    case 'CABLE_UNDO':
      return {
        ...state,
        mostRecent: null,
        totalCables: action.value,
      }
    default:
      // Returns a new COMPLETE state
      // or I could throw an error
      return state
  }
}

export default reducerFunction
