import React from 'react';
import Card from 'react-bootstrap/Card';


class Weather extends React.Component{
  render() {
    return(
    this.props.cityWeather.map((info, idx) => {
      return  (
        <WeatherDay
          day={info}
          key={idx}
        />
      )
    })
  )}
}

class WeatherDay extends React.Component {
  render() {

    

    return (
      <Card>
        <ul>
          <li>Date: {this.props.day.date}</li>
          <li>Description: {this.props.day.desc}</li>
        </ul>
      </Card>
    )
  }
}

export default Weather;