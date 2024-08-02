import React from 'react';

const Dropdown = ({ setSelectedOptions }) => {
  const options = ['Alphabets', 'Numbers', 'Highest alphabet'];

  const handleChange = (event) => {
    const selected = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(selected);
  };

  return (
    <select multiple onChange={handleChange}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default Dropdown;
