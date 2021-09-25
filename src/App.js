import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './css/style.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      cityQuery:'',
      weatherDataArr:{},
      showData: false
    }
  }

  getCityInfo = async (e) =>{
    e.preventDefault()
    //http://localhost:3001/weather?city=amman

  await this.setState({
      cityQuery: e.target.cityQuery.value,
      // weatherDataArr: weatherData.data
    })

    let url = `https://weather-class-08.herokuapp.com/weather?city=${this.state.cityQuery}`
    console.log(url)

    let weatherData = await axios.get(url)

    this.setState({
      weatherDataArr: weatherData.data,
      showData: true
    })
    console.log(this.state.weatherDataArr)
  }

  

  render() {
    return (
      <div>
        <h1 className= 'header'>Lab 08 </h1>
        <h3 className='text'>Type the city you would like to get information about</h3>
        <form onSubmit={this.getCityInfo} className='text'>
          <input type="text" placeholder="Enter the city name" name='cityQuery'/>
          <button >Get info</button>
          <p></p>
        </form>
        {
          this.state.showData && 
          <>
          {this.state.weatherDataArr.map(element => {
            return (
              <>
              <p className='text'>{element.description}</p>
              <p className='text'>{element.date}</p>
              <p className='text'>---------------</p>
              </>
            )
          })}
          </>
        }
      </div>
    );
  }
}

export default App;