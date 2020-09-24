import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherWidget from './weather_app_component/weatheWidget.js';
import DayCard from './weather_app_component/DayCardComponent.js';

const key = '7c16ffeea2411e0f96e0d6420116db57';
class App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius:undefined,
      maxtemp:undefined,
      mintemp:undefined,
      desc:undefined,
      weathericon:undefined,
      feels:undefined,
      humidity:undefined,
      fullData: [],
      dailyData: []
    };

    this.getWeather();  
    this.refreshDispTemp(); // to refresh and display the temperature
    this.getWeatherForecast();
    
    this.weathericon = {
      "Thunderstorm": "wi-thunderstorm",
      "Drizzle": "wi-sleet",
      "Rain":"wi-storm-showers",
      "Snow":"wi-snow",
      "Atmosphere":"wi-fog",
      "Clear":"wi-day-sunny",
      "Clouds":"wi-day-fog"

    };
 }


getWeatherIcon(icon,range){
  switch(true){
    case range>=200 && range <= 232:
        this.setState({icon:this.weathericon.Thunderstorm})
        break;
    case range>=300 && range <= 321:
      this.setState({icon:this.weathericon.Drizzle})
      break;
    case range>=500 && range <= 531:
      this.setState({icon:this.weathericon.Rain})
      break;
    case range>=600 && range <= 622:
      this.setState({icon:this.weathericon.Snow})
      break;
    case range>=701 && range <= 781:
      this.setState({icon:this.weathericon.Atmosphere})
    break;
    case range === 800:
      this.setState({icon:this.weathericon.Clear})
    break;
    case range>=801 && range <= 804:
      this.setState({icon:this.weathericon.Clear})
    break;
  }

}

refreshDispTemp(){
 // this.timer = setInterval(()=> this.getWeather(), 300000)  //Refresh temperature in every 5 min
 }


/**Function to get the temperature from API */
  getWeather = async() =>{
    const weatherapi = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad,in&APPID=' +key+ '&units=metric')
    const response = await weatherapi.json();
    

    this.setState({
      city : response.name,
      country : response.sys.country,
      main: response.main,
      celsius:response.main.temp,
      maxtemp:response.main.temp_max,
      mintemp:response.main.temp_min,
      desc:response.weather[0].main,
      feels:response.main.feels_like,
      humidity:response.main.humidity
    })

     this.getWeatherIcon(this.weathericon,response.weather[0].id);
  }

  getWeatherForecast(){
    const weatherURL =
    `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=metric&APPID=`+key

    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    })
  }

  render(){
    return(
      <div className="App">
      <header className="App-header">
        <h1>React Weather Widget</h1>
        
      </header>
       <main>
       <WeatherWidget
         city={this.state.city} 
         country={this.state.country}
         temp_celsius={this.state.celsius}
         maxtemp = {this.state.maxtemp}
         mintemp = {this.state.mintemp}
         desc= {this.state.desc}
         weathericon = {this.state.icon}
         feels={this.state.feels}
         humidity ={this.state.humidity}
         ></WeatherWidget>
       <div className="row">
        {
                this.state.dailyData.map(function (daily, i) {
                  return <DayCard reading={daily}></DayCard>
                })
        }
        </div>
       </main>
      
     
     
    </div>
    );
  }
}




export default App;
