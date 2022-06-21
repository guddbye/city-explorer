import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    city:'',
    cityFind: []

  }}

  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let url = (`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
    let cityInfo = await axios.get(url);
  
    console.log(cityInfo.data);
  }

  render() {

    return(
      <>
      <h1>Explore The City Of Your Next Adventure!</h1>
      <form onSubmit={this.handleSubmit} >
        <label> Enter your city: 
          <input type="text" onInput={this.handleCityInput}/>
        </label>
        <button type="submit">EXPLORE!</button>

      </form>
      {this.state.cityFind && <p>{this.state.cityFind.display_name}</p>}
      </>
    )
  }
};


export default App;