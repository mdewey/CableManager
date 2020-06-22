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
    deletedRow: {
      backgroundColor: 'purple',
    },
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

  const deleteCable = async (cable: Cable, index: number) => {
    if (cable && cable.id) {
      const resp = await Axios.delete(`/api/cable/${cable.id}`)
      if (resp.status === 200) {
        setSearchResults(p => {
          cable.isDeleted = true
          if (p) {
            p[index] = cable
            return [...p]
          }
          return p
        })
      }
    }
  }

  const undoDelete = async (cable: Cable, index: number) => {
    if (cable && cable.id) {
      const resp = await Axios.post(`/api/cable`, {
        ...cable,
        id: 0,
      })
      if (resp.status === 200) {
        setSearchResults(p => {
          cable.isDeleted = false
          if (p) {
            p[index] = cable
            return [...p]
          }
          return p
        })
      }
    }
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
              {searchResults?.map((cable, index) => (
                <TableRow
                  key={cable.id}
                  className={cable.isDeleted ? classes.deletedRow : 'ooops'}
                >
                  <TableCell component="th" scope="row">
                    {cable.endOne}
                  </TableCell>
                  <TableCell align="right">{cable.endTwo}</TableCell>
                  <TableCell align="right">{cable.note}</TableCell>
                  <TableCell align="right">{cable.location}</TableCell>
                  <TableCell align="right">
                    {cable.isDeleted ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => undoDelete(cable, index)}
                      >
                        undo
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteCable(cable, index)}
                      >
                        X
                      </Button>
                    )}
                  </TableCell>
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
