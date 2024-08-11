import React, {Component} from 'react';

class AddTimeZone extends Component {
    constructor(props) {
      super(props);
      this.state = { newTimeZone: '' };
    }
  
    handleInputChange = (event) => {
      this.setState({ newTimeZone: event.target.value });
    };
  
    handleAddTimeZone = () => {
      this.props.onAdd(this.state.newTimeZone);
      this.setState({ newTimeZone: '' });
    };
    render() {
        return (
          <div className="add-time-zone">
            <input
              type="text"
              value={this.state.newTimeZone}
              onChange={this.handleInputChange}
              placeholder="Enter time zone (e.g., Asia/Kolkata)"
            />
            <button onClick={this.handleAddTimeZone}>Add Time Zone</button>
          </div>
        );
      }
    }

export default AddTimeZone;
