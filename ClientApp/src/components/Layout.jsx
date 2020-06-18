import React, { Component } from 'react'
import NavMenu from './NavMenu'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

export function Layout(props) {
  return (
    <div>
      <NavMenu />
      <br />
      <CssBaseline />
      <Container>{props.children}</Container>
    </div>
  )
}
