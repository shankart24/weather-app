import React, { Component } from "react";
import './index.css';
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      temperature: "",
      high: "",
      low: "",
      type: "",
      icon: "",
      cityName: ""
    };
  }

  componentDidMount() {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7adadaa99d6e4cf9c24d88cd5a1ba311";
    axios.get(url).then(response => {
      this.setState({
        temperature: response.data.main.temp,
        high: response.data.main.temp_max,
        low: response.data.main.temp_min,
        type: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        cityName: response.data.name
      });
    });
  }

  searchCity = e => {
    e.preventDefault();
    const city = document.getElementById("city").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=7adadaa99d6e4cf9c24d88cd5a1ba311`;
    axios.get(url).then(response => {
      this.setState({
        temperature: response.data.main.temp,
        high: response.data.main.temp_max,
        low: response.data.main.temp_min,
        type: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        cityName: response.data.name
      });
    });
  };

  render() {
    var iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;

    return (
     
        <div className='App'>
            <h1 className="title">Know Your Weather</h1>
            <form onSubmit={this.searchCity}>
              <input type="text" id="city" placeholder="Enter a city" />
            </form>
            <h1 className='cityName'>{this.state.cityName}</h1>
            <h2>{(this.state.temperature-273.15).toFixed(2)}</h2>
            <p>
            <span className='span1'> High</span> : {(this.state.high-273.15).toFixed(2)},<span className='span1'> Low</span> : {(this.state.low-273.15).toFixed(2)}
            </p>
            <p>
              <img src={iconUrl} alt="an icon"/>
            </p>
            <p>{this.state.type} </p>
        </div>
    );
  }
}

export default App;
