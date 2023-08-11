import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Weather from './Weather.js';
import Movie from './Movies.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialize the component's state
    this.state = {
      city: '',
      cityMap: '',
      cityData: {},
      error: false,
      errorMessage: '',
      cityWeatherData: [],
      cityMovieInfo: []
    };
  }

  // Handle input changes in the city input field
  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  // Handle form submission to get city data
  handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
      let cityInfo = await axios.get(url);
      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=11`;
      console.log(cityInfo.data);
      // Update the state with city data
      this.setState({
        cityData: cityInfo.data[0],
        cityMap: cityMap
      });
    } catch (error) {
      // Handle errors and update state
      this.setState({
        error: true,
        errorMessage: `An Error occurred: ${error.response.status}`
      })
    }
    // Fetch weather and movie data
    this.handleGetWeather();
    this.handleGetMovies();
  }

  // Fetch weather data for the selected city
  handleGetWeather = async () => {
    let url = (`${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`)
    try {
      let weatherData = await axios.get(url)
      console.log(weatherData.data);
      // Update state with weather data
      this.setState({
        cityWeatherData: weatherData.data
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch movie data for the selected city
  handleGetMovies = async () => {
    let url = (`${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`)
    try {
      let movieData = await axios.get(url);
      // Update state with movie data
      this.setState({
        cityMovieInfo: movieData.data
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <h2>Find a City</h2>
        {/* Form to input city name */}
        <form onSubmit={this.handleCitySubmit}>
          <label>Enter a City: <br/><br/>
            <input type="text" onInput={this.handleCityInput} />
          </label>
          <button>Go</button>
        </form>
        {/* Display error message if there's an error */}
        {this.state.error ? <Alert variant="danger">{this.state.errorMessage}</Alert> :
        <Card>
          {/* Display city information */}
          <Card.Text>City: {this.state.cityData.display_name}</Card.Text>
          <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
          <Card.Text>Longitude: {this.state.cityData.lon}</Card.Text>
          <Card.Img src={this.state.cityMap} />
        </Card>}
        {/* Display weather information */}
        <Weather cityWeather={this.state.cityWeatherData} />

        {/* Display movie information */}
        <Movie cityMovie={this.state.cityMovieInfo} />
      </>
    );
  };
}

export default App;
