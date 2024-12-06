import { format } from 'date-fns';

// Function that takes a date string and returns a string that represents the time difference between the current date and the date given as a parameter.
export const calculateTimeDifference = (date: string): string => {
  const commentDate = new Date(parseInt(date));
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - commentDate.getTime();
  const seconds = timeDifference / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = months / 12;

  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  } else if (days < 30) {
    return `${Math.floor(days)} days ago`;
  } else if (months < 12) {
    return `${Math.floor(months)} months ago`;
  } else {
    if (years < 2) {
      return '1 year ago';
    }
    return `${Math.floor(years)} years ago`;
  }
};

export const formatDate = (date: string): string => {
  const dateObj = new Date(parseInt(date));

  // handle invalid date
  if (isNaN(dateObj.getTime())) {
    console.log('Invalid Date', date);
    return 'Invalid Date';
  }

  return format(dateObj, 'dd.MM.yyyy');
};
