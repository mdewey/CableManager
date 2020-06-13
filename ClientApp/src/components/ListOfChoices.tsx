import React, { useState } from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

type ListProps = {
  items: Array<string> | undefined
  searchTerm: string
}

const ListOfChoices = ({ items, searchTerm }: ListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<Number>()

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: Number
  ) => {
    setSelectedIndex(index)
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
                onClick={event => handleClick(event, index)}
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
