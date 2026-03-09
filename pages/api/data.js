import config from '../../config.json';

export default async function handler(req, res) {
  const city = config.city;
  const latitude = config.latitude;
  const longitude = config.longitude;

  try {
   const response = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation,weather_code&timezone=Europe/Paris`
);
    const data = await response.json();

    const weatherData = {
  city: city,
  temperature: data.current.temperature_2m,
  windspeed: data.current.wind_speed_10m,
  winddirection: data.current.wind_direction_10m,
  precipitation: data.current.precipitation,
  weathercode: data.current.weather_code,
  time: data.current.time
};

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
}