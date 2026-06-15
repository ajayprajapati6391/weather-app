import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaWind } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import { data } from "react-router-dom";

const WeatherApp = () => {
    const [search, setSearch] = useState("")
    const [wdata, setWdata] = useState("")
    const apiKey = "1783fe2b4518b05d648df7e717a26cdd";

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude.toFixed(2);
                    const lon = position.coords.longitude.toFixed(2);
                    try {
                        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                        if (response) {
                            setWdata(response.data)            
                        }
                    } catch (err) {
                        console.log(err)
                    }


                })
        }
    }, [])
    const fetchApi = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`)
            if (response) {
                setWdata(response.data)
                console.log(response.data);
                
            }
        } catch (err) {
            console.log(err);


        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl p-5 text-white">

                {/* Search Bar */}
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Search city..."
                        className="flex-1 px-4 py-3 rounded-xl bg-white/20 placeholder-white outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="bg-white/20 p-3 rounded-xl hover:bg-white/30" onClick={fetchApi}>
                        <FaSearch size={18} />
                    </button>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <FaMapMarkerAlt />
                    <h2 className="text-2xl font-bold">{wdata.name}</h2>
                </div>

                {/* Weather Icon */}
                <div className="flex justify-center">
                    <WiDaySunny size={120} />
                </div>

                {/* Temperature */}
                <h1 className="text-center text-6xl font-bold">{wdata?(wdata.main?.temp - 273.15).toFixed(2):''} &deg;C</h1>
                <p className="text-center text-lg mt-2">{wdata?.weather?.[0]?.description || ""}</p>

                {/* Weather Details */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                        <FaWind className="mx-auto mb-2" size={20} />
                        <p className="text-sm">Wind</p>
                        <p className="font-semibold">{wdata?(wdata.wind?.speed * 3.6).toFixed(2):''} km/h</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 text-center">
                        <span className="text-2xl">💧</span>
                        <p className="text-sm">Humidity</p>
                        <p className="font-semibold">{ wdata?.main?.humidity}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;