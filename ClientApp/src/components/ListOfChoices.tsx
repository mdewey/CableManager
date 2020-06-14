import React, { useState } from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { useCableContext } from '../context/useCableContext'

type ListProps = {
  items: Array<string> | undefined
  searchTerm: string
  updateKey: 'END_ONE' | 'END_TWO' | 'LOCATION'
}

const ListOfChoices = ({ items, searchTerm, updateKey }: ListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<Number>()

  const context = useCableContext()
  const { dispatch } = context

  const handleClick = (index: Number) => {
    setSelectedIndex(index)
    console.log({ index, thing: items[index], updateKey })
    dispatch({ type: `NEW_${updateKey}`, value: items[index] })
  }

  return (
    <>
      <List component="nav" aria-label="main mailbox folders">
        {items
          ?.filter(f => f.indexOf(searchTerm) >= 0)
          .map((m, index) => {
            return (
              <ListItem
                button
                selected={selectedIndex === index}
                onClick={event => handleClick(index)}
                key={index}
              >
                <ListItemText primary={m} />
              </ListItem>
            )
          })}
      </List>
    </>
  )
}

export default ListOfChoices
