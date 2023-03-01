function formatMinutesAgo(dateTime) {
  if (!dateTime) return '';
  if (typeof dateTime === 'string') dateTime = new Date(dateTime);

  const minutesAgo = Math.floor((Date.now() - dateTime) / (60 * 1000));
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  if (daysAgo) {
    if (daysAgo === 1) return 'yesterday';
    return `${daysAgo} days ago`;
  }

  if (hoursAgo) {
    if (hoursAgo === 1) return '1 hour ago';
    return `${hoursAgo} hours ago`;
  }

  if (minutesAgo > 1) {
    return `${minutesAgo} minutes ago`;
  }
  if (minutesAgo === 1) {
    return '1 minute ago';
  }

  return 'less than a minute ago';
}

export { formatMinutesAgo };
