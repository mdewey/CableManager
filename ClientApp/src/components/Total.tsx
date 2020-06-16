import React, { useEffect } from 'react'
import { useCableContext } from '../context/useCableContext'
import Axios from 'axios'

const Total = () => {
  const context = useCableContext()
  const { totalCables } = context.state

  useEffect(() => {
    if (totalCables === null) {
      Axios.get('/api/cable/count').then(resp => {
        context.dispatch({ type: 'SET_COUNT', value: resp.data.count })
      })
    }
  }, [totalCables])
  return <h2>Total:{totalCables}</h2>
}

export default Total
