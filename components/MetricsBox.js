import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  if (!weatherData) return null;

  const windSpeed =
    unitSystem === "metric"
      ? weatherData.windspeed
      : Math.round(weatherData.windspeed * 2.237);

  return (
    <div className={styles.wrapper}>

      <MetricsCard
  title={"Wind speed"}
  iconSrc={"/icons/wind.png"}
  metric={
    unitSystem === "metric"
      ? Math.round(weatherData.windspeed)
      : Math.round(weatherData.windspeed * 0.621371)
  }
  unit={unitSystem === "metric" ? "km/h" : "mph"}
/>

      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(weatherData.winddirection)}
      />
      <MetricsCard
  title={"Precipitation"}
  iconSrc={"/icons/09d.svg"}
  metric={weatherData.precipitation}
  unit={"mm"}
/>
    </div>
  );
};