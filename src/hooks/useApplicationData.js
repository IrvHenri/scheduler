import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducers/application";

const useApplicationData = () => {
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

    // *STRETCH : Web Socket feature - fix bug
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
