'use strict';

import moment from "moment";
const padZeros = (num, numDigits) => {
  let string = `${num}`;
  while(string.length < numDigits) { string = `0${string}` }
  return string;
};

export default function countdown(dateString, callback) {
  if(!dateString) return;

  const endDate = moment(dateString, "M/D/YYYY H:m:s");

  const timeLeft = () => {
    const now = moment();
    const duration = moment.duration(endDate.diff(now));

    if(duration.toISOString() == moment.duration().toISOString()) {
      callback(null);
      return;
    }

    const timeSegments = [
      padZeros(duration.days(), 2),
      padZeros(duration.hours(), 2),
      padZeros(duration.minutes(), 2),
      padZeros(duration.seconds(), 2)
    ];

    callback(timeSegments);
    setTimeout(timeLeft, 1000);
  };

  timeLeft();
};
