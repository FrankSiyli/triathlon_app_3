import React from 'react';

const getActivityBorderColor = (activityType) => {
  switch (activityType) {
    case "Laufen":
      return "border-t border-t-orange";
    case "Schwimmen":
      return "border-t border-t-blue";
    case "Yoga":
      return "border-t border-t-green";
    case "Rad":
      return "border-t border-t-yellow";
    case "Sonstiges":
      return "border-t border-t-red";
    case "Faszienrolle":
      return "border-t border-t-purple";
    case "Stabi":
      return "border-t border-t-alert";
    default:
      return "border-t border-t-grey";
  }
};

export default getActivityBorderColor;
