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
        let newDays = updateSpots(state, id, interview); // !!interview
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
      console.log(
        "UseEffect - SET_APPLICATION_DATA : Monday spots",
        all[0].data[0].spots
      );
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
    // try {
    //   const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    //   socket.onopen = () => {
    //     socket.send("ping");
    //     socket.onmessage = function (event) {
    //       const data = JSON.parse(event.data);
    //       const { type, id, interview } = data;
    //       if (data.type === "SET_INTERVIEW") {
    //         console.log("Web socket: SET_INTERVIEW");
    //         dispatch({ type: type, id: id, interview: interview });
    //       }
    //     };
    //   };

    //   socket.onclose = () => console.log("socket closed");
    // } catch (err) {
    //   console.log(err);
    // }
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  function updateSpots(state, id, interview) {
    const newDays = state.days.map((day) => {
      // If interview is truthy and being updated, prevent spots from increasing after saving.
      const isInterviewActive = state.appointments[id].interview;
      if (day.appointments.includes(id)) {
        let daySpots = day.spots;
        if (interview && !isInterviewActive) {
          daySpots -= 1;
        } else if (!interview) {
          daySpots += 1;
        }
        return {
          ...day,
          spots: daySpots,
        };
      }
      return day;
    });
    console.log("PrevDays Monday spots:", state.days[0].spots);
    console.log("NewDays Monday spots:", newDays[0].spots);
    return newDays;
  }

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: interview,
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

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
