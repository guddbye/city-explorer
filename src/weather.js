import React from 'react';


class Weather extends React.Component{
  
  
  render(){


    return (
      <>
        <h2>
          Here is your 3 day Forecast for:
        </h2>
        <p>
          {this.props.returnedWeatherData[0].datetime}
          {this.props.returnedWeatherData[0].description}
        </p>
        <p>
          {this.props.returnedWeatherData[1].datetime}
          {this.props.returnedWeatherData[1].description}
        </p>
        <p>
          {this.props.returnedWeatherData[2].datetime}
          {this.props.returnedWeatherData[2].description}
        </p>
      </>
    );
    
  };
  
}
export default Weather;