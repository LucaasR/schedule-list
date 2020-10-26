import React, { useState } from 'react'

import moment from 'moment'
import {
  Collapse,
  Grid,
  ListItem,
  ListItemIcon,
  Typography
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  list: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  collapseContainer: {
    width: '90%',
    margin: '0 auto',
    display: 'flex',
  },
  descriptionContainer: {
    width: '100%',
    minHeight: '125px',
    color: 'gray',
    padding: '20px 50px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  programLine: {
    display: 'flex',
    alignItems: 'center'
  },
  programImage: {
    width: 250,
    height: 'auto'
  },
  inLive: {
    color: 'red',
    fontWeight: 'bold'
  }
}))

export default function ProgramItem(props) {
  const classes = useStyles()

  const {
    currentDay,
    currentHour,
    date,
    program
  } = props

  const [open, setOpen] = useState(false)

  const startProgram = moment(program.human_start_time, 'hh:mm').subtract('3:00', 'h').format('HH:MM')
  const endProgram = moment(program.human_end_time, 'hh:mm').subtract('3:00', 'h').format('HH:MM')
  const programDate = moment(date).format('DD/MM/YYYY')

  const inLive = currentHour >= startProgram &&
    currentHour < endProgram &&
    currentDay === programDate

  return(
    <>
      <ListItem className={ classes.list }>
        <Grid container justify='space-between'>
          <Grid item xs={ 1 } >
            <img
              alt={ program.custom_info.Complemento }
              src={ program.custom_info.Graficos.LogoURL }
            />
          </Grid>

          <Grid item xs={ 1 } className={ classes.programLine }>
            <Typography>
              { startProgram }
            </Typography>
          </Grid>

          <Grid item xs={ 1 } className={ classes.programLine }>
            { inLive &&
              <Typography className={ classes.inLive } variant='caption'>
                Ao vivo
              </Typography>
            }
          </Grid>

          <Grid item xs={ 6 } className={ classes.programLine }>
            <Typography>
              { program.title }
            </Typography>
          </Grid>

          <Grid item xs={ 1 } className={ classes.programLine }>
            <ListItemIcon onClick={ () => setOpen(!open) }>
              { open ? <ExpandMore /> : <ExpandLess /> }
            </ListItemIcon>
          </Grid>

          <Collapse
            className={ classes.collapseContainer }
            in={ open || inLive }
            timeout='auto'
          >
            <Grid className={ classes.descriptionContainer } item xs={ 12 } container wrap='wrap'>
              <Grid container item xs={ 5 }>
                { program.custom_info.Graficos.ImagemURL
                  ? <img
                      alt={ program.custom_info.Complemento }
                      src={ program.custom_info.Graficos.ImagemURL }
                      className={ classes.programImage }
                    />
                  : <Grid style={{ width: '300px' }} />
                }
              </Grid>

              <Grid item xs={ 5 }>
                <Typography>
                  { program.custom_info.DescricaoPrograma }
                </Typography>
              </Grid>

            </Grid>
          </Collapse>
        </Grid>
      </ListItem>
      <hr></hr>
    </>
  )
}
