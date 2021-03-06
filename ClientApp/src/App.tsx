import React, { Component, useReducer, useState } from 'react'
import { Route, Switch } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import HelloWorld from './pages/_template/HelloWorld'
import HeyWorld from './pages/_template/HeyWorld'
import NotFound from './pages/NotFound'
import './custom.scss'
import reducerFunction from './reducer/cableReducer'
import {
  AppContextInterface,
  CableContext,
  AppState,
  Cable,
} from './context/useCableContext'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'

import { ThemeProvider } from '@material-ui/core/styles'

export default function() {
  const [state, dispatch] = useReducer(reducerFunction, {
    newCable: {
      endOne: '',
      endTwo: '',
      location: '',
      note: '',
    } as Cable,
    totalCables: null,
  } as AppState)

  const ctxt = { state, dispatch } as AppContextInterface

  return (
    <CableContext.Provider value={ctxt}>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/search" component={Search} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Layout>
    </CableContext.Provider>
  )
}
