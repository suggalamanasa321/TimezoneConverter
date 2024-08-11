import React, { useState } from 'react';

const AddTimeZone = ({ onAdd }) => {
  const [newTimeZone, setNewTimeZone] = useState('');

  const handleAdd = () => {
    if (newTimeZone) {
      onAdd(newTimeZone);
      setNewTimeZone('');
    }
  };

  return (
    <div className="add-time-zone">
      <input
        type="text"
        value={newTimeZone}
        onChange={(e) => setNewTimeZone(e.target.value)}
        placeholder="Enter Time Zone"
      />
      <button onClick={handleAdd}>Add Time Zone</button>
    </div>
  );
};

export default AddTimeZone;
