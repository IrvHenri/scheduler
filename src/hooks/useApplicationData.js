import { useReducer, useEffect } from "react";
import axios from "axios";
const useApplicationData = () => {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      case SET_INTERVIEW: {
        const { id, interview } = action;
        const appointment = {
          ...state.appointments[id],
          interview: interview ? { ...interview } : null,
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        ///FIX BUG
        let newDays = updateSpots(state, id, interview);
        return {
          ...state,
          appointments: appointments,
          days: newDays,
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  function updateSpots(state, id, increment) {
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
  }

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview,
      });
    });
  };
  const cancelInterview = (id, interview) => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null,
      });
    });
  };

  //Web Socket connection
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onopen = () => {
      socket.send("ping");
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        const { type, id, interview } = data;
        if (data.type === "SET_INTERVIEW") {
          dispatch({ type: type, id: id, interview: interview });
        }
      };
    };

    socket.onclose = () => console.log("socket closed");
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
