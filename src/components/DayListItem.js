import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const formatSpots = (spots) => {
    if (spots === 1) {
      return `${spots} spot remaining`;
    }
    return spots > 0 ? `${spots} spots remaining` : `no spots remaining`;
  };
  const dayClass = classnames("day-list__item ", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
