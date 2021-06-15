import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem({ selected, spots, name, setDay }) {
  const formatSpots = (spots) => {
    if (spots === 1) {
      return `${spots} spot remaining`;
    }
    return spots > 0 ? `${spots} spots remaining` : `no spots remaining`;
  };
  const dayClass = classnames("day-list__item ", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  return (
    <li data-testid="day" className={dayClass} onClick={setDay}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
