import React from 'react';
import Chart from 'react-google-charts';

const DailyTimeTable = (props, NoBookingsPH) => {


  if(props.bookings.length === 0) return <p>No Bookings For this Date</p>;

  const data = props.bookings.map(booking => {
    return [booking.barber.name, booking.customer.name, new Date(booking.startTime), new Date(booking.endTime)]
  })

  return (

    <Chart
      width={'70%'}
      height={'200px'}
      chartType='Timeline'
      loader={<div>Loading Chart</div>}
      data={[
        [
          { type: 'string', id: 'Barber' },
          { type: 'string', id: 'Customer' },
          { type: 'date', id: 'Start' },
          { type: 'date', id: 'End' },
        ],
        ["Gemma", "Joe", new Date(0, 0, 0, 15, 0, 0), new Date(0, 0, 0, 15, 15, 0)],
        ["Alan", "Steve", new Date(0, 0, 0, 12, 0, 0), new Date(0, 0, 0, 12, 30, 0)],
        ["Jeff", "Jim", new Date(0, 0, 0, 10, 0, 0), new Date(0, 0, 0, 10, 15, 0)],
        ["Jeff", "Tony", new Date(0, 0, 0, 9, 0, 0), new Date(0, 0, 0, 10, 0, 0)],
        // {data}

      ]}
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
