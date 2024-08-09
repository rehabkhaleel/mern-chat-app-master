//import React from 'react';
import { FormControl, FormControlLabel, Checkbox, Typography } from '@mui/material';

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <FormControl component="fieldset">
      <Typography variant="body1" gutterBottom style={{ color: 'black' }}>
  Gender
</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGender === 'male'}
            onChange={() => onCheckboxChange('male')}
            color="primary"
          />
        }
        label="Male"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGender === 'female'}
            onChange={() => onCheckboxChange('female')}
            color="primary"
          />
        }
        label="Female"
      />
    </FormControl>
  );
};

export default GenderCheckbox;