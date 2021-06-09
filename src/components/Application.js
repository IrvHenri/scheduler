import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";

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

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });
  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));
  useEffect(() => {
    axios
      .get("/api/days")
      .then(function (response) {
        let responseDays = response.data;
        setDays(responseDays);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("/api/appointments")
  //     .then(function (response) {
  //       // let responseAppointments = Object.values(response.data);
  //       let responseAppointments = response.data;
  //       // setAppointments((prevAppointments) => [
  //       //   ...prevAppointments,
  //       //   ...responseAppointments,
  //       // ]);
  //       setState({ ...state, appointments: responseAppointments });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const renderAppointments = appointments.map((appointment) => (
    <Appointment key={appointment.id} {...appointment} />
  ));
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
