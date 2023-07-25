const convertToMs = (unitTime: number) => {
  return Math.floor(unitTime / 1000);
};

export const time2TimeAgo = (time: number) => {
  const currentTime = convertToMs(new Date().getTime());
  const prevTime = time;
  const seconds = currentTime - prevTime;
  // more that two days
  if (seconds > 2 * 24 * 3600) {
    return 'a few days ago';
  }
  // a day
  if (seconds > 24 * 3600) {
    return 'yesterday';
  }

  if (seconds > 3600) {
    return 'a few hours ago';
  }
  if (seconds > 1800) {
    return 'Half an hour ago';
  }
  if (seconds > 60) {
    return Math.floor(seconds / 60) + ' minutes ago';
  }
};
