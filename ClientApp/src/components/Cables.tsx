import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ListOfChoices from './ListOfChoices'

import { useCableContext } from '../context/useCableContext'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '33%',
    },
    div: {
      display: 'flex',
      flexDirection: 'column',
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

  const [currentEndings, setCurrentEndings] = useState<Array<string>>()
  const [currentLocation, setCurrentLocation] = useState<Array<string>>()

  const context = useCableContext()
  const { dispatch } = context
  const { newCable } = context.state
  console.log({ newCable })

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
              dispatch({ type: 'NEW_END_ONE', value })
            }}
          />
          <ListOfChoices
            items={currentEndings}
            searchTerm={newCable.endOne}
            updateKey={'END_ONE'}
          />
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
              dispatch({ type: 'NEW_END_TWO', value })
            }}
          />
          <ListOfChoices
            items={currentEndings}
            searchTerm={newCable.endTwo}
            updateKey={'END_TWO'}
          />
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
              dispatch({ type: 'NEW_LOCATION', value })
            }}
          />
          <ListOfChoices
            items={currentLocation}
            searchTerm={newCable.location}
            updateKey={'LOCATION'}
          />
        </div>
      </form>
    </>
  )
}

export default Cables
