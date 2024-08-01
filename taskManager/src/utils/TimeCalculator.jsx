import React from 'react'

const TimeCalculator = ({time}) => {
   function timeAgo(time) {
  const now = new Date();
  const createdDate = new Date(time);
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  let interval = Math.floor(diffInSeconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval === 1 ? '' : 's'} ago`;
  }
  interval = Math.floor(diffInSeconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval === 1 ? '' : 's'} ago`;
  }
  interval = Math.floor(diffInSeconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval === 1 ? '' : 's'} ago`;
  }
  interval = Math.floor(diffInSeconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval === 1 ? '' : 's'} ago`;
  }
  interval = Math.floor(diffInSeconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval === 1 ? '' : 's'} ago`;
  }
  return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
}
  const timeStr=timeAgo(time)
  return (
    <span>{timeStr} ago</span>
  )
}

export default TimeCalculator
