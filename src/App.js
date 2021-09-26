import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './css/style.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cityQuery: '',
      weatherDataArr: {},
      moviesDataArr: {},
      showData: false
    }
  }

  getCityInfo = async (e) => {
    e.preventDefault()
    //http://localhost:3001/weather?city=amman

    await this.setState({
      cityQuery: e.target.cityQuery.value,
      // weatherDataArr: weatherData.data
    })

    let weatherURL = `https://weather-class-08.herokuapp.com/weather?city=${this.state.cityQuery}`
    // let weatherURL = `http://localhost:3001/weather?city=${this.state.cityQuery}`
    let moviesURL = `https://weather-class-08.herokuapp.com/movies?api_key=${process.env.MOVIES_API_KEY}&query=${this.state.cityQuery}`


    let weatherData = await axios.get(weatherURL)
    let moviesData = await axios.get(moviesURL)

    this.setState({
      weatherDataArr: weatherData.data,
      moviesDataArr: moviesData.data,
      showData: true
    })
  }



  render() {

    return (
      <div>
        <h1 className='header'>Lab 08 </h1>
        <h3 className='text'>Type the city you would like to get information about</h3>

        <form onSubmit={this.getCityInfo} className='text'>
          <input type="text" placeholder="Enter the city name" name='cityQuery' />
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
            })
            }

            {this.state.moviesDataArr.map(element => {
              return (
                <>
                  <p className='text'>movie title: {element.title}</p>
                  <p className='text'>overview: {element.overview}</p>
                  <p className='text'>avarage votes: {element.vote_average}</p>
                  <p className='text'>vote count: {element.vote_count}</p>
                  <p className='text'>poster path:{element.poster_path}</p>
                  <p className='text'>popularity: {element.popularity}</p>
                  <p className='text'>release_date: {element.date}</p>
                  <p className='text'>---------------</p>
                </>
              )
            })
            }
          </>
        }
      </div>
    );
  }
}

export default App;