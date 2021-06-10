export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const filteredDay = state.days.filter((dayItem) => dayItem.name === day);

  if (filteredDay.length === 0) {
    return [];
  }

  const appointmentsForDay = filteredDay[0].appointments;
  const appointmentsArray = Object.values(state.appointments);
  let result = appointmentsArray.filter((appointment) =>
    appointmentsForDay.includes(appointment.id)
  );
  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewer = state.interviewers[interview.interviewer];
  let student = interview.student;
  return { student, interviewer };
}
