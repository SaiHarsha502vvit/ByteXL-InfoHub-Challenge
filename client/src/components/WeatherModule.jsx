import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWeather } from "../lib/api";
import "./WeatherModule.css";

function WeatherModule() {
  const queryClient = useQueryClient();
  const [city, setCity] = useState("London");
  const [inputCity, setInputCity] = useState("");
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: Boolean(city),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const nextCity = inputCity.trim();

    if (!nextCity) {
      return;
    }

    if (nextCity.toLowerCase() === city.toLowerCase()) {
      refetch();
    } else {
      setCity(nextCity);
    }

    setInputCity("");
  };

  const handlePrefetch = () => {
    const previewCity = inputCity.trim();
    if (!previewCity || previewCity.toLowerCase() === city.toLowerCase()) {
      return;
    }

    queryClient.prefetchQuery({
      queryKey: ["weather", previewCity],
      queryFn: () => fetchWeather(previewCity),
      staleTime: 1000 * 60 * 10,
    });
  };

  const errorMessage = error instanceof Error ? error.message : "";
  const isBusy = isLoading || isFetching;
  const isRefreshing = isFetching && !isLoading;

  if (isLoading && !data) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="error">
        <div className="error-icon">⚠️</div>
        <h3>Error</h3>
        <p>{errorMessage}</p>
        <button onClick={() => refetch()} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="weather-module">
      <header className="module-header">
        <div>
          <h2>Weather Intelligence</h2>
          <p className="module-subtitle">
            Real-time conditions with instant caching for faster lookups
          </p>
        </div>
        {isRefreshing && (
          <span className="refresh-indicator" aria-live="polite">
            Refreshing…
          </span>
        )}
      </header>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name..."
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onBlur={handlePrefetch}
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={isBusy}>
          {isBusy ? "Searching..." : "Search"}
        </button>
      </form>

      {error && data && (
        <output className="inline-error">
          Unable to refresh city right now. Showing cached results.
        </output>
      )}

      {data && (
        <div className="weather-content">
          <div className="location-header">
            <h3>
              {data.city}, {data.country}
            </h3>
          </div>

          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
              alt={data.condition}
              className="weather-icon"
            />
            <div className="temperature">
              <span className="temp-value">{data.temperature}</span>
              <span className="temp-unit">°C</span>
            </div>
          </div>

          <div className="weather-condition">
            <p>
              {data.condition.charAt(0).toUpperCase() + data.condition.slice(1)}
            </p>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">Feels Like</span>
              <span className="detail-value">{data.feelsLike}°C</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{data.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{data.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherModule;
