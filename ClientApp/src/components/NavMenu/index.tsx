import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import './style.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

const NavMenu = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CableManager
          </Typography>
          <Button>
            <Link component={RouterLink} color="secondary" to="/">
              Home
            </Link>
          </Button>
          <Button>
            <Link component={RouterLink} color="secondary" to="/dashboard">
              Dashboard
            </Link>
          </Button>
          <Button>
            <Link component={RouterLink} color="secondary" to="/search">
              search
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavMenu
