import React from 'react'
import { useCableContext } from '../context/useCableContext'
import Button from '@material-ui/core/Button'
import Axios from 'axios'

const MostRecent = () => {
  const context = useCableContext()
  const { mostRecent } = context.state

  const undoLastCable = async () => {
    if (mostRecent.id) {
      const resp = await Axios.delete(`/api/cable/${mostRecent.id}`)
      context.dispatch({ type: 'CABLE_UNDO', value: resp.data.count })
    }
  }

  if (!mostRecent) {
    return <></>
  }

  return (
    <>
      <h2>The most recent</h2>
      <div>
        <p>
          {mostRecent.endOne} to {mostRecent.endTwo}
        </p>

        {mostRecent.note && (
          <p>
            <em>Notes:</em>
            {mostRecent.note}
          </p>
        )}
        {mostRecent.location && (
          <p>
            <em>Location:</em>
            {mostRecent.location}
          </p>
        )}
      </div>
      <div>
        <Button variant="outlined" color="secondary" onClick={undoLastCable}>
          undo
        </Button>
      </div>
    </>
  )
}

export default MostRecent
