export const FormatDate = (time_interval) => {
  const date_interval = formattedDate(time_interval.from_date.split(' ')[0]);
  const from_interval = formattedTimeWithoutSeconds(
    time_interval.from_date.split(' ')[1]
  );
  const to_interval = formattedTimeWithoutSeconds(
    time_interval.to_date.split(' ')[1]
  );

  return date_interval + '\n' + from_interval + ' ' + to_interval;
};

const formattedTimeWithoutSeconds = (aTime) => {
  return aTime.substring(0, 5);
};

const formattedDate = (aDate) => {
  return new Date(aDate).toLocaleDateString('es-es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default FormatDate;
