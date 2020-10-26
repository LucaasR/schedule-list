import React from 'react'

import moment from 'moment'
import { Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  container: {
    height: '100px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  date: {
    fontWeight: 'bold'
  }
}))

export default function DatePicker(props) {
  const classes = useStyles()
  const { date, dateLimit, add, subtract } = props

  return (
    <Grid className={ classes.container}>
      <IconButton onClick={ subtract }>
        <ChevronLeft />
      </IconButton>

      <Typography className={ classes.date }>
        { date && moment(date).format('DD/MM/YYYY') }
      </Typography>

      <IconButton onClick={ add } disabled={ dateLimit }>
        <ChevronRight />
      </IconButton>
    </Grid>
  )
}
