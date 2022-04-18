export const FormatDate = (time_interval) => {

  const date_interval_from = formattedDate(time_interval.from_date.split(' ')[0]);
  const date_interval_to = formattedDate(time_interval.to_date.split(' ')[0]);

  const from_interval = formattedTimeWithoutSeconds(
    time_interval.from_date.split(' ')
  );
  const to_interval = formattedTimeWithoutSeconds(
    time_interval.to_date.split(' ')
  );

  if (date_interval_from === date_interval_to) {
    return date_interval_from + '\n' + from_interval + ' a ' + to_interval;
  } else {
    return date_interval_from.slice(0, -8) + ' al ' + date_interval_to + '\n' + from_interval + ' a ' + to_interval;
  }
  
};

const formattedTimeWithoutSeconds = (aTime) => {
  try {
    return aTime[1].substring(0, 5);
  } catch {
    return aTime[0]?.substring(11, 16);
  }
};

const formattedDate = (aDate) => {
  return new Date(aDate).toLocaleDateString('es-es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default FormatDate;
