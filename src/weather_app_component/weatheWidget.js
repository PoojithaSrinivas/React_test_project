import React from "react";
import '../weather-icons-master/css/weather-icons.css';
import "../App.css";


const WeatherWidget = (props) =>{
    return(
        <div className="container">
            <div className="cards">
            <h2>{props.city}, {props.country}</h2>
              <h5 className='py-4'>
                <i class={`wi ${props.weathericon}`}></i>
              </h5>
              <h2 className='py-2'>
                Temp : {props.temp_celsius}&deg;
              </h2>
              <h4 className="py-2">
                 Feels like : {props.feels}&deg;
                 Humdity : {props.humidity}&#37;
              </h4>
              {temprange(props.mintemp,props.maxtemp)}
              <h4 className='py-2'>{props.desc}</h4>
            </div>
            
        </div>
    );
}

function temprange(minimum,maximum){
    return(
        <h3>
           <span className='px-4'>{minimum}&deg; / </span> 
           <span className='px-4'>{maximum}&deg;</span> 
        </h3>
    );
}


export default WeatherWidget;
