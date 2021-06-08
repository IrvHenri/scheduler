import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList({
  interviewers,
  interviewer,
  setInterviewer,
}) {
  let renderInterviewers = interviewers.map((interviewerItem) => (
    <InterviewerListItem
      key={interviewerItem.id}
      setInterviewer={() => setInterviewer(interviewerItem.id)}
      name={interviewerItem.name}
      avatar={interviewerItem.avatar}
      selected={interviewer === interviewerItem.id}
    />
  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{renderInterviewers}</ul>
    </section>
  );
}
