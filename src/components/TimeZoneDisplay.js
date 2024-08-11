import React from 'react';

import moment from 'moment-timezone';

const TimeZoneDisplay = ({ timeZone, currentTime, onDelete }) => {
  const timeInZone = currentTime.tz(timeZone).format('YYYY-MM-DD HH:mm:ss');

  return (
    <div className="time-zone-display">
      <div>{timeZone}</div>
      <div>{timeInZone}</div>
      <button onClick={onDelete}>Remove</button>
    </div>
  );
};

export default TimeZoneDisplay;
