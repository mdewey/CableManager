import React, { useState } from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { useCableContext } from '../context/useCableContext'

import Button from '@material-ui/core/Button'

type ListProps = {
  items: Array<string> | undefined
  searchTerm: string
  updateKey: 'END_ONE' | 'END_TWO' | 'LOCATION' | 'NOTE'
}

const ListOfChoices = ({ items, searchTerm, updateKey }: ListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<Number | null>()

  const context = useCableContext()
  const { dispatch } = context

  const handleClick = (index: number, end: any) => {
    setSelectedIndex(0)
    if (items) {
      dispatch({ type: `NEW_${updateKey}`, value: end })
    }
  }

  const clearClicked = () => {
    setSelectedIndex(null)
    dispatch({ type: `NEW_${updateKey}`, value: '' })
  }

  return (
    <>
      <List component="nav" aria-label="main mailbox folders">
        {items
          ?.filter(f => (f ? f.indexOf(searchTerm) >= 0 : false))
          .map((m, index) => {
            return (
              <ListItem
                button
                selected={selectedIndex === index}
                onClick={event => handleClick(index, m)}
                key={index}
              >
                <ListItemText primary={m} />
              </ListItem>
            )
          })}
      </List>
      <div>
        <Button onClick={clearClicked} variant="contained" color="secondary">
          clear
        </Button>
      </div>
    </>
  )
}

export default ListOfChoices
