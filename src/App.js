import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header from "./components/Header/Header";
import ModalData from "./components/Modal/Modal";

function App() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=6f75916276917b8d5e9528c491151b75`

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                setLat(response.data.coord.lat)
                setLon(response.data.coord.lon)
                console.log(response.data)
            }).catch(()=> {
                setData({cod: 'error',message:'City do not found'})
            })
            setLocation('');

        }
    }

    const clickHandlerOfCityName = () => {
        setModalOpen(true);
    }

    return (
        <div className="app">
            <Header/>
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Enter Location'
                    type="text" />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <div style={{cursor: 'pointer'}} onClick={clickHandlerOfCityName}>{data.cod === 'error' ? data.message :data.name}</div>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>

                {data.name !== undefined &&
                <div className="bottom">
                    <div className="feels">
                        {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                        <p>Wind Speed</p>
                    </div>
                </div>
                }
                {modalOpen ? <ModalData name={data.name} lat={lat} setModalOpen={setModalOpen} modalOpen={modalOpen} lon={lon}/> : null}


            </div>
        </div>
    );
}

export default App;