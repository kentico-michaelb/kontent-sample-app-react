import React from 'react';
import '../switch.css';

// credit to: https://upmostly.com/tutorials/build-a-react-switch-toggle-component
const Switch = ({ isOn, handleToggle }) => {
  return (
    <div className="toggle-wrapper">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
        style={{ background: isOn && '#2C9E7E' }}
      >
        <span className={`react-switch-button`} />
      </label>
      <label>Edit Mode</label>
    </div>
  );
};

export default Switch;