import React from "react";
import "./styles.scss";
// import classnames from "classnames";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const { time, interview } = props;
  // const appointmentClass = classnames("appointment", {
  //   ":last-of-type": id === "last",
  // });  Not sure if this was needed?
  return (
    <article className="appointment">
      <Header time={time} />

      {interview ? (
        <Show student={interview.student} interviewer={interview.interviewer} />
      ) : (
        <Empty />
      )}
    </article>
  );
}
