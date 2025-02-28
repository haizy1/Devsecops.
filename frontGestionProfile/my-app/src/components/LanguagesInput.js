import React, { useState } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';

const languagesList = [
  "English",
  "French",
  "Spanish",
  "German",
  "Chinese",
  "Arabic",
  "Portuguese",
  "Russian",
  "Japanese",
  "Italian"
];

const LanguagesInput = ({ selectedLanguages, setSelectedLanguages }) => {
  return (
    <Autocomplete
      multiple
      options={languagesList} // Liste des options de langues
      value={selectedLanguages} // Langues sélectionnées
      onChange={(event, newValue) => setSelectedLanguages(newValue)} // Gestion des changements
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip 
            key={index} 
            label={option} 
            {...getTagProps({ index })} 
            color="primary"
          />
        ))
      }
      renderInput={(params) => (
        <TextField 
          {...params} 
          variant="outlined" 
          label="Select Languages" 
          placeholder="Type or select a language"
        />
      )}
    />
  );
};

export default LanguagesInput;
