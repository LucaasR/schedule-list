import React from 'react'

import { List } from '@material-ui/core'

export default function Listing(props) {
  return(
    <List>
      { props.children }
    </List>
  )
}
