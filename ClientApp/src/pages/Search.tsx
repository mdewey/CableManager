import React, { useState } from 'react'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Axios from 'axios'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
)

const Search = () => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState<string>('')

  const search = async () => {
    const resp = await Axios.get(`/api/cables/search?searchTerm=${searchTerm}`)
    console.log(resp.data)
  }

  return (
    <div>
      <TextField
        id="outlined-search"
        label="end type, location, notes"
        type="search"
        variant="outlined"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={search}>
        search
      </Button>
    </div>
  )
}

export default Search
