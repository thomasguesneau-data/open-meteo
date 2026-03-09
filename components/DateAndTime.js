import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData }) => {
  const time = weatherData.time.slice(11, 16);
  return <span>{time}</span>;
};