import React from 'react'

import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Logo from '../../logo.png'

const useStyles = makeStyles(() => ({
  header: {
    height: '75px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    backgroundColor: '#009ddb'
  },
  logo: {
    width: '30',
    height: '30',
    position: 'relative',
    left: '50'
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
}))

export default function Header() {
  const classes = useStyles()

  return(
    <Grid className={ classes.header }>
      <Grid item xs={ 2 }>
        <img className={ classes.logo } src={ Logo } alt='logo' width='30' height='30' />
      </Grid>

      <Grid item xs={ 8 } className={ classes.title }>
        <Typography variant='h5'>
          RPC
        </Typography>
      </Grid>
    </Grid>
  )
}
