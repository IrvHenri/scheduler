export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
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
  return newDays;
}
