import React, { useState } from 'react';
import axios from 'axios';

const JsonInput = ({ setData, setError, setOptionsVisible }) => {
  const [jsonInput, setJsonInput] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const response = await axios.post('http://localhost:3000/api/data', { data: parsedJson });
      setData(response.data);
      setOptionsVisible(true);
      setError('');
    } catch (error) {
      setError('Invalid JSON or API call failed');
    }
  };

  return (
    <div>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
        rows={10}
        cols={50}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default JsonInput;
