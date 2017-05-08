import moment from 'moment';

const padZeros = (num, numDigits) => {
  let string = `${num}`;
  while (string.length < numDigits) { string = `0${string}`; }
  return string;
};

export default function countdown(dateString, callback) {
  if (!dateString) return;

  const endDate = moment(dateString, 'M/D/YYYY H:m:s:S');

  const timeLeft = () => {
    const now = moment();
    const duration = moment.duration(endDate.diff(now));

    if (duration.asSeconds() < 1) {
      callback(null);
      return;
    }

    const timeSegments = [
      'days', 'hours', 'minutes', 'seconds',
    ].map(timePart => padZeros(duration[timePart](), 2));

    callback(timeSegments);
    setTimeout(timeLeft, 1000);
  };

  timeLeft();
}
