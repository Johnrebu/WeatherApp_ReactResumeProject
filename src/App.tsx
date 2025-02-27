import React, { useState } from 'react';
import { Search, Droplets, Wind } from 'lucide-react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<{
    temp: number;
    cityName: string;
    humidity: number;
    windSpeed: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '1435318a93eafa883b901165632116e5';

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather({
          temp: Math.round(data.main.temp),
          cityName: data.name,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
      } else {
        setError('City not found. Please try again.');
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4 animate-gradient-xy">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] border border-white/20">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border-2 border-white/30 focus:outline-none focus:border-white/60 transition-all shadow-inner"
            />
            <button
              type="submit"
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-400/30"
              disabled={loading}
            >
              <Search className="w-6 h-6 text-white" />
            </button>
          </form>

          {loading && (
            <div className="text-center text-white">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="text-center text-white bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-xl p-4 backdrop-blur-sm">
              <p>{error}</p>
            </div>
          )}

          {weather && (
            <div className="text-white">
              <div className="text-center mb-8">
                <h1 className="text-7xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 text-transparent bg-clip-text">
                  {weather.temp}°C
                </h1>
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-green-300 to-blue-300 text-transparent bg-clip-text">
                  {weather.cityName}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group flex items-center justify-center gap-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300">
                  <Droplets className="w-6 h-6 text-blue-300 group-hover:text-blue-200 transition-colors" />
                  <div>
                    <p className="text-sm text-blue-200">Humidity</p>
                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                      {weather.humidity}%
                    </p>
                  </div>
                </div>

                <div className="group flex items-center justify-center gap-3 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-4 hover:from-green-500/30 hover:to-teal-500/30 transition-all duration-300">
                  <Wind className="w-6 h-6 text-green-300 group-hover:text-green-200 transition-colors" />
                  <div>
                    <p className="text-sm text-green-200">Wind Speed</p>
                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-300">
                      {weather.windSpeed} km/h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;