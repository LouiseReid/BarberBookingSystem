import React from 'react';
import Chart from 'react-google-charts';

const DailyTimeTable = (props, NoBookingsPH) => {


  if(props.bookings.length === 0) return <p>No Bookings For this Date</p>;


  const data = props.bookings.map((booking, index) => {
    return [booking.barber.name, booking.customer.name, new Date(booking.startTime), new Date(booking.endTime)]
  })

  return (

    <Chart
      width={'70%'}
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
  )

}


export default DailyTimeTable
