import React from "react";
import "./styles.scss";

export default function Appointment(props) {
  const { time } = props;
  return <article className="appointment">{time}</article>;
}
