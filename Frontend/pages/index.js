import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/data', { data: JSON.parse(jsonInput) });
      setResponseData(response.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON or server error');
      setResponseData(null);
    }
  };

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions(
      checked
        ? [...selectedOptions, value]
        : selectedOptions.filter((option) => option !== value)
    );
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <input
        type="text"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON data"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {responseData && (
        <div>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_alphabet"
              onChange={handleOptionChange}
            />
            Highest Alphabet
          </label>
          <div>
            {selectedOptions.includes('alphabets') && (
              <p>Alphabets: {responseData.alphabets.join(', ')}</p>
            )}
            {selectedOptions.includes('numbers') && (
              <p>Numbers: {responseData.numbers.join(', ')}</p>
            )}
            {selectedOptions.includes('highest_alphabet') && (
              <p>Highest Alphabet: {responseData.highest_alphabet.join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
