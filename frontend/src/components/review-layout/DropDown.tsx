import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const DropDown: React.FC = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    // Make API call to fetch options from the database
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/unis');
        setOptions(response.data); // Assuming the API returns an array of strings
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };



  return (
    <div>
      
      <select id="dropdown" value={selectedOption || ''} onChange={handleSelectChange}>
        <option value="" disabled>
          Select your school:
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        </select>
        <Button variant="contained" color="primary">
        Submit
      </Button>
    </div>
    
  );
};

export default DropDown;
