import React, { useState } from 'react'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Axios from 'axios'
import { Cable } from '../context/useCableContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {},
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
  const [searchResults, setSearchResults] = useState<Array<Cable>>()

  const search = async () => {
    const resp = await Axios.get(`/api/search/cables?searchTerm=${searchTerm}`)
    console.log(resp.data)
    setSearchResults(resp.data.results)
  }

  return (
    <>
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
      <br />
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>End One</TableCell>
                <TableCell align="right">End Two</TableCell>
                <TableCell align="right">Notes</TableCell>
                <TableCell align="right">location</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults?.map(cable => (
                <TableRow key={cable.id}>
                  <TableCell component="th" scope="row">
                    {cable.endOne}
                  </TableCell>
                  <TableCell align="right">{cable.endTwo}</TableCell>
                  <TableCell align="right">{cable.note}</TableCell>
                  <TableCell align="right">{cable.location}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default Search
