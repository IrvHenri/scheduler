import React, { useState } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Irving Henriquez",
      interviewer: {
        id: 6,
        name: "Brad Smith",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      },
    },
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 7,
        name: "Bianca Palmer",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
    },
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Floyd Mayweather",
      interviewer: {
        id: 8,
        name: "Patrick Mahomes",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      },
    },
  },
];

const renderAppointments = appointments.map((appointment) => (
  <Appointment key={appointment.id} {...appointment} />
));

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {[...renderAppointments, <Appointment key="last" time="5pm" />]}
      </section>
    </main>
  );
}
