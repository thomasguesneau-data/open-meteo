import styles from "./MainCard.module.css";

import Image from "next/image";

const getWeatherIcon = (code) => {
  if (code === 0) return "01d.svg";
  if ([1, 2].includes(code)) return "02d.svg";
  if (code === 3) return "03d.svg";
  if ([45, 48].includes(code)) return "50d.svg";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "09d.svg";
  if ([71, 73, 75].includes(code)) return "13d.svg";
  if ([95, 96, 99].includes(code)) return "11d.svg";
  return "01d.svg";
};

const getBackgroundClass = (timeString) => {
  const hour = parseInt(timeString.slice(11, 13));

  if (hour >= 6 && hour < 18) {
    return styles.day;
  } else {
    return styles.night;
  }
};

const ctoF = (celsius) => (celsius * 9) / 5 + 32;

export const MainCard = ({ city, country, description, iconName, unitSystem, weatherData }) => {
  return (
    <div className={`${styles.mainCard} ${getBackgroundClass(weatherData.time)}`}>
      <h2 className={styles.location}>
        {city}, {country}
      </h2>

      <h1 className={styles.temperature}>
        {unitSystem === "metric"
          ? Math.round(weatherData.temperature)
          : Math.round(ctoF(weatherData.temperature))}
        °{unitSystem === "metric" ? "C" : "F"}
      </h1>

      <div className={styles.icon}>
        <image src={`/icons/${getWeatherIcon(weatherData.weathercode)}`} alt="weather icon" width={80} height={80} />
      </div>

   <p className={styles.time}>
  {new Date(weatherData.time).toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).replace(/^./, (c) => c.toUpperCase())}
</p>
    </div>
  );
};


export default MainCard;