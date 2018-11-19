import React from 'react';
import Chart from 'react-google-charts';
import './DailyTimeTable.css'


const DailyTimeTable = (props, NoBookingsPH) => {

  if(props.bookings.length === 0) return <p className="timetable timetable-placeholder">No Bookings For this Date</p>;

  const data = props.bookings.map((booking, index) => {
    const startTimeHr = booking.startTime.slice(-8).slice(0,2)
    const startTimeMin = booking.startTime.slice(-5).slice(0,2)
    const endTimeHr = booking.endTime.slice(-8).slice(0,2)
    const endTimeMin = booking.endTime.slice(-5).slice(0,2)

    return [booking.barber.name, `${booking.customer.name} - ${booking.service.name}`, new Date(0,0,0, startTimeHr, startTimeMin, 0), new Date(0,0,0,endTimeHr, endTimeMin, 0)]
  })

  return (
    <div className="timetable">
      <Chart
        width={'100%'}
        height={'200px'}
        chartType='Timeline'
        loader={<div>Loading Chart</div>}
        columns={[
          { type: 'string', id: 'Barber' },
          { type: 'string', id: 'Customer' },
          { type: 'date', id: 'Start' },
          { type: 'date', id: 'End' }
        ]}
        rows={data}
        options={{
          timeline: {
            singleColor: '#8d8',
            showBarLabels: false
          },
          hAxis: {
            minValue: new Date(0, 0, 0, 9, 0, 0),
            maxValue: new Date(0, 0, 0, 17, 0, 0)
          }
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )

}


export default DailyTimeTable
