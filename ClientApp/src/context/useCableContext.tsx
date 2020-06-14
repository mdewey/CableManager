import { createContext, useContext } from 'react'

export interface Cable {
  endOne: string
  endTwo: string
  location: string
}

export interface AppState {
  newCable: Cable
}

export interface AppContextInterface {
  state: AppState
  dispatch: any
}

// Used to setup the provider
export const CableContext = createContext<AppContextInterface>(
  {} as AppContextInterface
)

// Used to be able to get data from the context
export const useCableContext = () => useContext(CableContext)
