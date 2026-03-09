import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [error, setError] = useState(false);

  const changeSystem = () =>
    setUnitSystem(unitSystem === "metric" ? "imperial" : "metric");

  useEffect(() => {
    const getData = async () => {
      console.log("Récupération des nouvelles données météo");
      try {
        const res = await fetch("/api/data");
        const data = await res.json();
        setWeatherData(data);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    getData();

    const interval = setInterval(getData, 3600000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <ErrorScreen errorMessage="Impossible de récupérer la météo !" />;
  }

  if (!weatherData) {
    return <LoadingScreen loadingMessage="Chargement de la météo..." />;
  }

  return (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country={"FR"}
        description={`Température: ${weatherData.temperature}°C, Vent: ${weatherData.windspeed} km/h`}
        iconName={"sun"}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  );
};

export default App;