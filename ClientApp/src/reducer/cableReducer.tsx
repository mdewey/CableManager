// state is the current value of our state object

import { AppContextInterface, AppState } from '../context/useCableContext'

type Action = { type: 'something' }

// action is the data we received from our dispatch
const reducerFunction = (state: AppState, action: Action) => {
  console.log({ action })

  switch (action.type) {
    // case 'ADD':
    //   // This is the code for a dispatched ADD
    //   return {
    //     inventory: state.inventory.filter(
    //       (inventoryItem) => inventoryItem.id !== action.item.id
    //     ),
    //     cart: [...state.cart, action.item],
    //   }
    //   break

    default:
      // Returns a new COMPLETE state
      // or I could throw an error
      return state
  }
}

export default reducerFunction
