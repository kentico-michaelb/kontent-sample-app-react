import React from 'react';
import '../switch.css';

// credit to: https://upmostly.com/tutorials/build-a-react-switch-toggle-component
const Switch = ({ isOn, handleToggle }) => {
    console.log(isOn)
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
        style={{ background: isOn && '#06D6A0' }}
      >
        <span className={`react-switch-button`} />
      </label>
      <label>Edit Mode</label>
    </div>
  );
};

export default Switch;