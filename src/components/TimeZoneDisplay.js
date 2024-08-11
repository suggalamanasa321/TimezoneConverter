import React from 'react';
import {Component} from 'react'

// import moment from 'moment-timezone';

class TimeZoneDisplay extends Component {
  render() {
    const { timeZone, currentTime, onDelete } = this.props;
    const formattedTime = currentTime.tz(timeZone).format('MMMM Do YYYY, h:mm:ss a');

    return (
      <div className="time-zone-display">
        <p>{timeZone}: {formattedTime}</p>
        <button onClick={onDelete}>Remove</button>
      </div>
    );
  }
}

export default TimeZoneDisplay;
