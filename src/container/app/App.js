import React, { useState, useEffect } from 'react';

import _ from 'lodash'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Header from '../../components/header'
import DatePicker from '../../components/date-picker'
import Listing from '../../components/listing'
import ProgramItem from '../../components/program-item'

import './App.css';

const useStyles = makeStyles(() => ({
  container: {
    width: '80%',
    margin: '0 auto'
  }
}))

function App() {
  const classes = useStyles()

  const [schedule, setSchedule] = useState([])
  const [date, setDate] = useState(new Date())
  const [dateLimit, setDateLimit] = useState(false)

  const currentHour = moment(new Date()).format('HH:MM')
  const currentDay = moment(new Date()).format('DD/MM/YYYY')

  const getData = (y, m ,d) => {
    return fetch(`/1337?date=${y}-${m}-${d}`)
      .then(resp => resp.json())
      .then((result) => setSchedule(result.programme.entries))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const day = moment(date).format('DD')
    const month = moment(date).format('MM')
    const year = moment(date).format('YYYY')

    if(_.isEmpty(schedule)) return getData(year, month, day)
    }
  )

  const handleAddDay = () => {
    const newDate = moment(date).add(1, 'd')
    const newYear = moment(newDate).format('YYYY')
    const newMonth = moment(newDate).format('MM')
    const newDay = moment(newDate).format('DD')

    const limit = '30/10/2020'

    if(limit === newDate.format('DD/MM/YYYY')) {
      setDateLimit(true)
      setDate(newDate)
    } else {
      getData(newYear, newMonth, newDay)
      setDate(newDate)
    }
  }

  const handleSubtractDay = () => {
    const newDate = moment(date).subtract(1, 'd')
    const newYear = moment(newDate).format('YYYY')
    const newMonth = moment(newDate).format('MM')
    const newDay = moment(newDate).format('DD')

    const limit = '30/10/2020'

    if(limit !== newDate.format('DD/MM/YYYY')) {
      setDateLimit(false)
      getData(newYear, newMonth, newDay)
      setDate(newDate)
    }
  }

  return (
    <Grid className="App">
      <Header />
      <Grid className={ classes.container }>
        <DatePicker
          date={ date }
          dateLimit={ dateLimit }
          add={ handleAddDay }
          subtract={ handleSubtractDay}
        />
        { _.isEmpty(!schedule) &&
          <Listing>
            { schedule.map((program, index) => {
              return (
                  <ProgramItem
                    key={ index }
                    program={ program }
                    currentHour={ currentHour }
                    currentDay={ currentDay }
                    date={ date }
                  />
              )}
            )}
          </Listing>
        }
      </Grid>
    </Grid>
  );
}

export default App;
