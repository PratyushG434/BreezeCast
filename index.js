import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { getCountry, getIconForUtc, getNextFiveDates, separate} from './utilities.js'
const port = 3000;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ['Sunday','Monday','Tuesday','Thursday','Friday','Saturday'];
const geoUrl = "http://api.openweathermap.org/geo/1.0/direct";
const weatherUrl ="https://api.openweathermap.org/data/2.5/";
const app = express();
const api_key = process.env.API_KEY;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));



app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.post('/submit', getCordinates)



async function getCordinates(req,res) 
{
    try{
   
    const [city,state,countryCode]= separate(req.body.prompt);
    // Requesting coordinates of the specified location
    const {data} = await axios.get( geoUrl+`?q=${city},${state},${countryCode}&limit=1&appid=${api_key}`);
    if(data.length ==0) 
    { 
        res.render('index.ejs',{ message : "Please enter a valid location."});
    }
    const name = data[0].name;
    const latitude = data[0].lat;
    const longitude = data[0].lon;
    console.log(name);
    console.log(longitude);
    console.log(latitude);
    // Requesting today's weather updates
    const responseCurrent = await axios.get(weatherUrl+`weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`);
    const result = responseCurrent.data;
    console.log(result);
    var country = getCountry(result.sys.country);
    
    const currentWeather = new CurrentWeatherUpdates(result,name,country,state);
    console.log(currentWeather);
    // Requesting forecast updates
    const responseForecast = await axios.get(weatherUrl+`forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`);
    const resultForecast = responseForecast.data;
    const forecast = ForecastWeatherUpdates(resultForecast,name,country,state);
    
    //Showing data to the user
    res.render('weather.ejs', { 
        current : currentWeather,
        forecast : forecast
    } );
    }
    catch(err)
    {
        console.log(err.message);
    }
}

app.listen(port, (req,res)=>
{
    console.log(`Server listening on port ${port}`);
})

function CurrentWeatherUpdates(result,name,country,state='',date_= new Date())
{
    this.location= name;
    this.country= country;
    this.state = state;
    this.weather = result.weather[0].main;
    this.description = result.weather[0].description;
    this.temp = parseInt(result.main.temp- 273);
    this.humidity = result.main.humidity;
    this.windSpeed = parseInt((result.wind.speed * 18)/5.0);  //Changing the wind speed in km/h
    this.pressure = result.main.pressure;
    const date = new Date(date_);
    this.icon = getIconForUtc(result.weather[0].main,result.weather[0].icon);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    this.date = formattedDate;
    this.feels_like = parseInt(result.main.feels_like -273);
    this.temp_max = parseInt(result.main.temp_max-273);
    this.temp_min = parseInt(result.main.temp_min-273);
}

function ForecastWeatherUpdates(resultForecast,name,country,state)
{
    const dates = getNextFiveDates();
    
    var forecast =[];
    var i=0;
    resultForecast.list.forEach( function(value)
    {
        if(value.dt_txt== (`${dates[i]} 03:00:00`))
        {
            forecast.push(new CurrentWeatherUpdates(value,name,country,state,dates[i++]));
            
        }
    })
    console.log(forecast);
    return forecast;
}
    

    

