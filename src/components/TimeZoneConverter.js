import React, { Component } from 'react';
import moment from 'moment-timezone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimeZoneDisplay from './TimeZoneDisplay';
import AddTimeZone from './AddTimeZone';
// import ReactSlider from 'react-slider';

class TimeZoneConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZones: ['UTC', 'Asia/Kolkata'], // Default time zones
      currentTime: moment(),
      darkMode: false,
    };
  }

  handleTimeChange = (date) => {
    this.setState({ currentTime: moment(date) });
  };

  // handleTimeZoneAddition = (timeZone) => {
  //   this.setState(prevState => ({
  //     timeZones: [...prevState.timeZones, timeZone]
  //   }));
  // };
  handleTimeZoneAddition = (timeZone) => {
    if (timeZone && moment.tz.zone(timeZone)) {
      this.setState(prevState => ({
        timeZones: [...prevState.timeZones, timeZone]
      }));
    } else {
      alert('Invalid Time Zone');
    }
  };

  handleTimeZoneDeletion = (index) => {
    this.setState(prevState => ({
      timeZones: prevState.timeZones.filter((_, i) => i !== index)
    }));
  };

  onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(this.state.timeZones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ timeZones: items });
  };

  // handleReverseOrder = () => {
  //   this.setState(prevState => ({
  //     timeZones: prevState.timeZones.reverse()
  //   }));
  // };

  toggleDarkMode = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }));
  };

  generateShareableLink = () => {
    const baseUrl = window.location.href.split('?')[0];
    const timeZoneParams = this.state.timeZones.join(',');
    const shareableUrl = `${baseUrl}?timezones=${timeZoneParams}`;
    return shareableUrl;
  };

  handleScheduleMeet = () => {
    const startTime = this.state.currentTime.format('YYYYMMDDTHHmmss');
    const endTime = this.state.currentTime.add(1, 'hour').format('YYYYMMDDTHHmmss');
    const timeZone = moment.tz.guess();
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&dates=${startTime}/${endTime}&ctz=${timeZone}&text=Scheduled%20Meeting`;
    window.open(googleCalendarUrl, '_blank');
  };

  reverseTimeZones = () => {
    this.setState(prevState => ({
      timeZones: prevState.timeZones.slice().reverse()
    }));
  };

  render() {
    const { timeZones, currentTime, darkMode } = this.state;
    // const totalMinutesInDay = 24 * 60;
    const shareableLink = this.generateShareableLink();

    return (
    
      <div className={darkMode ? 'timezone-converter dark-mode' : 'timezone-converter'}>
        <h1>Time Zone Converter</h1>
        
        

        <DatePicker
          selected={currentTime.toDate()}
          onChange={this.handleTimeChange}
          showTimeSelect
          dateFormat="Pp"
        />

        <button onClick={this.reverseTimeZones}>Reverse Order</button>
        <button onClick={this.toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {timeZones.map((zone, index) => (
                  <Draggable key={zone} draggableId={zone} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TimeZoneDisplay
                          timeZone={zone}
                          currentTime={currentTime}
                          onDelete={() => this.handleTimeZoneDeletion(index)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <AddTimeZone onAdd={this.handleTimeZoneAddition} />
        

        <p className='link-para'>Shareable Link: <a href={shareableLink} target="_blank" rel="noopener noreferrer">{shareableLink}</a></p>
        <button onClick={this.handleScheduleMeet}>Schedule Meet</button>
      </div>
    );
  }
}

export default TimeZoneConverter;
