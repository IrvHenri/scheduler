import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;
  let renderedDayListItems = days.map((dayItem) => (
    <DayListItem
      key={dayItem.id}
      name={dayItem.name}
      spots={dayItem.spots}
      selected={dayItem.name === day}
      setDay={() => setDay(dayItem.name)}
    />
  ));
  return <ul>{renderedDayListItems}</ul>;
}
