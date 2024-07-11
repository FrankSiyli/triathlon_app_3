import React from "react";
import { formatTime } from "@/app/helperFunctions/formatTime";

const getZones = (
  exercise,
  savedSwimTime,
  savedHrMax,
  savedWattValue,
  wattIsActive
) => {
  // Swim pace zones
  const swimCalc = savedSwimTime / 10;
  const swimZ1 = `${formatTime(Math.round(swimCalc + 20))} /100m`; // warm up / cool down
  const swimZ2 = `${formatTime(Math.round(swimCalc + 10))} /100m`; // endurance
  const swimZ3 = `${formatTime(Math.round(swimCalc + 5))} /100m`; // tempo
  const swimZ4 = `${formatTime(Math.round(swimCalc))} /100m`; // threshold
  const swimZ5 = `${formatTime(Math.round(swimCalc - 5))} /100m`; // anaerobic
  const swimZ6 = `${formatTime(Math.round(swimCalc - 10))} /100m`; // max effort
  // Run heart rate zones
  const a = parseFloat(savedHrMax);
  const hrCalc = a / 100;
  const runZ1 = `${Math.round(hrCalc * 50)} - ${Math.round(hrCalc * 60)} bpm`;
  const runZ2 = `${Math.round(hrCalc * 60)} - ${Math.round(hrCalc * 75)} bpm`;
  const runZ3 = `${Math.round(hrCalc * 75)} - ${Math.round(hrCalc * 85)} bpm`;
  const runZ4 = `${Math.round(hrCalc * 85)} - ${Math.round(hrCalc * 95)} bpm`;
  const runZ5 = `${Math.round(hrCalc * 95)} - ${Math.round(hrCalc * 100)} bpm`;

  // Bike heart rate zones
  const bikeHrZ1 = `${Math.round(hrCalc * 50)} - ${Math.round(
    hrCalc * 60
  )} bpm`;
  const bikeHrZ2 = `${Math.round(hrCalc * 60)} - ${Math.round(
    hrCalc * 65
  )} bpm`;
  const bikeHrZ3 = `${Math.round(hrCalc * 65)} - ${Math.round(
    hrCalc * 75
  )} bpm`;
  const bikeHrZ4 = `${Math.round(hrCalc * 75)} - ${Math.round(
    hrCalc * 85
  )} bpm`;
  const bikeHrZ5 = `${Math.round(hrCalc * 85)} - ${Math.round(
    hrCalc * 95
  )} bpm`;

  // Bike watt zones
  const w = parseFloat(savedWattValue);
  const wattCalc = w / 100;
  const bikeWattZ1 = `${Math.round(wattCalc * 55)} - ${Math.round(
    wattCalc * 75
  )} W`;
  const bikeWattZ2 = `${Math.round(wattCalc * 75)} - ${Math.round(
    wattCalc * 90
  )} W`;
  const bikeWattZ3 = `${Math.round(wattCalc * 90)} - ${Math.round(
    wattCalc * 105
  )} W`;
  const bikeWattZ4 = `${Math.round(wattCalc * 105)} - ${Math.round(
    wattCalc * 120
  )} W`;
  const bikeWattZ5 = `${Math.round(wattCalc * 120)} - ${Math.round(
    wattCalc * 130
  )} W`;

  if (exercise.zone === "swimZ1") {
    return swimZ1;
  } else if (exercise.zone === "swimZ2") {
    return swimZ2;
  } else if (exercise.zone === "swimZ3") {
    return swimZ3;
  } else if (exercise.zone === "swimZ4") {
    return swimZ4;
  } else if (exercise.zone === "swimZ5") {
    return swimZ5;
  } else if (exercise.zone === "swimZ6") {
    return swimZ6;
  } else if (exercise.zone === "runZ1") {
    return runZ1;
  } else if (exercise.zone === "runZ2") {
    return runZ2;
  } else if (exercise.zone === "runZ3") {
    return runZ3;
  } else if (exercise.zone === "runZ4") {
    return runZ4;
  } else if (exercise.zone === "runZ5") {
    return runZ5;
  } else if (exercise.zone === "bikeHrZ1" && !wattIsActive) {
    return bikeHrZ1;
  } else if (exercise.zone === "bikeHrZ2" && !wattIsActive) {
    return bikeHrZ2;
  } else if (exercise.zone === "bikeHrZ3" && !wattIsActive) {
    return bikeHrZ3;
  } else if (exercise.zone === "bikeHrZ4" && !wattIsActive) {
    return bikeHrZ4;
  } else if (exercise.zone === "bikeHrZ5" && !wattIsActive) {
    return bikeHrZ5;
  } else if (exercise.zone === "bikeHrZ1" && wattIsActive) {
    return bikeWattZ1;
  } else if (exercise.zone === "bikeHrZ2" && wattIsActive) {
    return bikeWattZ2;
  } else if (exercise.zone === "bikeHrZ3" && wattIsActive) {
    return bikeWattZ3;
  } else if (exercise.zone === "bikeHrZ4" && wattIsActive) {
    return bikeWattZ4;
  } else if (exercise.zone === "bikeHrZ5" && wattIsActive) {
    return bikeWattZ5;
  } else {
    return exercise.zone;
  }
};

export default getZones;
