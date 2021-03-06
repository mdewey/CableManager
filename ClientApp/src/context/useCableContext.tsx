import { createContext, useContext } from 'react'

export interface Cable {
  id: number | undefined
  endOne: string
  endTwo: string
  location: string
  note: string
  isDeleted: boolean | undefined
}

export interface AppState {
  newCable: Cable
  allCables: Array<Cable>
  mostRecent: Cable | null
  totalCables: number | null
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
