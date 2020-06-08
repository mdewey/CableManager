import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '33%',
    },
    input: {
      width: '100%',
    },
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const Cables = () => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = useState<Number>()

  const [currentEndings, setCurrentEndings] = useState<Array<string>>()
  const [currentLocation, setCurrentLocation] = useState<Array<string>>()
  const [newCable, setNewCable] = useState({
    endOne: '',
    endTwo: '',
    location: '',
  })
  useEffect(() => {
    ;(async () => {
      const resp = await axios.get('/api/AutoComplete/ends')
      setCurrentEndings(resp.data.ends)
    })()
    ;(async () => {
      const resp = await axios.get('/api/AutoComplete/locations')
      setCurrentLocation(resp.data.locations)
    })()
  }, [])

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)
  }

  const addCable = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }
  return (
    <>
      <header></header>

      <form
        onSubmit={addCable}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-basic"
            label="One end"
            variant="outlined"
            color="secondary"
            value={newCable.endOne}
            onChange={e => {
              const { value } = e.target
              setNewCable(p => {
                return {
                  ...p,
                  endOne: value,
                }
              })
            }}
          />
          <List component="nav" aria-label="main mailbox folders">
            {currentEndings
              ?.filter(f => f.indexOf(newCable.endOne) >= 0)
              .map((m, index) => {
                return (
                  <ListItem
                    button
                    selected={selectedIndex === index}
                    onClick={event => handleListItemClick(event, index)}
                  >
                    <ListItemText primary={m} />
                  </ListItem>
                )
              })}
          </List>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="The other"
            variant="outlined"
            color="secondary"
            value={newCable.endTwo}
            onChange={e => {
              const { value } = e.target
              setNewCable(p => {
                return {
                  ...p,
                  endTwo: value,
                }
              })
            }}
          />
          <List component="nav" aria-label="main mailbox folders">
            {currentEndings
              ?.filter(f => f.indexOf(newCable.endOne) >= 0)
              .map((m, index) => {
                return (
                  <ListItem
                    button
                    selected={selectedIndex === index}
                    onClick={event => handleListItemClick(event, index)}
                  >
                    <ListItemText primary={m} />
                  </ListItem>
                )
              })}
          </List>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Where are you storing this?"
            variant="outlined"
            color="secondary"
            value={newCable.location}
            onChange={e => {
              const { value } = e.target
              setNewCable(p => {
                return {
                  ...p,
                  location: value,
                }
              })
            }}
          />
          <List component="nav" aria-label="main mailbox folders">
            {currentLocation
              ?.filter(f => f.indexOf(newCable.endOne) >= 0)
              .map((m, index) => {
                return (
                  <ListItem
                    button
                    selected={selectedIndex === index}
                    onClick={event => handleListItemClick(event, index)}
                  >
                    <ListItemText primary={m} />
                  </ListItem>
                )
              })}
          </List>
        </div>
      </form>
    </>
  )
}

export default Cables
