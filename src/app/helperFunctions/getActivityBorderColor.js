import React from 'react';

const getActivityBorderColor = (activityType) => {
  switch (activityType) {
    case "Laufen":
      return "border-t border-orange";
    case "Schwimmen":
      return "border-t border-blue";
    case "Yoga":
      return "border-t border-green";
    case "Rad":
      return "border-t border-yellow";
    case "Sonstiges":
      return "border-t border-red";
    case "Faszienrolle":
      return "border-t border-purple";
    case "Stabi":
      return "border-t border-alert";
    default:
      return "border-t border-grey";
  }
};

export default getActivityBorderColor;
