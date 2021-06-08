import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// onChange state not created yet in parent component
export default function InterviewerList({ interviewers, value, onChange }) {
  let renderInterviewers = interviewers.map((interviewerItem) => (
    <InterviewerListItem
      key={interviewerItem.id}
      setInterviewer={() => onChange(interviewerItem.id)}
      name={interviewerItem.name}
      avatar={interviewerItem.avatar}
      selected={interviewerItem.id === value}
    />
  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{renderInterviewers}</ul>
    </section>
  );
}
