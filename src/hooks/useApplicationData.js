import { useState, useEffect } from "react";
import axios from "axios";
const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  const updateSpots = (state, id, increment) => {
    const newDays = state.days.map((day) => {
      const appointmentID = state.appointments[id].id;
      // If interview is truthy and being updated, prevent spots from decreasing after saving.
      const isInterviewActive = state.appointments[appointmentID].interview;
      if (day.appointments.includes(appointmentID)) {
        return {
          ...day,
          spots: increment
            ? isInterviewActive
              ? day.spots
              : day.spots - 1
            : day.spots + 1,
        };
      }
      return day;
    });
    return newDays;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        let newDays = updateSpots(state, id, !!interview);
        setState({
          ...state,
          appointments,
          days: newDays,
        });
      });
  };
  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      let newDays = updateSpots(state, id, false);
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
