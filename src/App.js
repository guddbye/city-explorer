import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      city: '',
      cityData: {},
      error: false,
      errorMessage: ''
    };
  }

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  handleCitySubmit = async (e) => {
    e.preventDefault();
    try{    

      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
      let cityInfo = await axios.get(url);
      let cityMap = await `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=10`;
      console.log(cityInfo.data);
      this.setState({
        cityData: cityInfo.data[0],
        cityMap: cityMap
      });
    }
    catch(error){
      this.setState({
        error: true,
        errorMessage: `An Error has occurred! ${error.response.status} Please try again!`
      })
    }
  }

  render() {

    return( 
      <>
        <h1>Find a City</h1>
        <form onSubmit={this.handleCitySubmit}>
          <label>Enter a City: <br/>
          <br/>
            <input type="text" onInput={this.handleCityInput} /> 
          </label>
          <button>Go</button>
        </form>
        {this.state.error?<Alert variant="danger">{this.state.errorMessage}</Alert>:
        <Card>
          <Card.Text>City: {this.state.cityData.display_name}</Card.Text>
          <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
          <Card.Text>Longitude: {this.state.cityData.lon}</Card.Text>
          <Card.Img src={this.state.cityMap}/>
        </Card>}
      </>
    )  
  };
}

export default App;