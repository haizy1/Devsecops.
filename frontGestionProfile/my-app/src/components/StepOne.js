import React from 'react';
import '../Style/StepOne.css';

const StepOne = ({ formData, handleChange }) => {
  const handleLanguagesChange = (event) => {
    const selectedLanguages = Array.from(event.target.selectedOptions, (option) => option.value);
    handleChange('langues', selectedLanguages);
  };

  const handleDeleteLanguage = (languageToDelete) => {
    const updatedLanguages = formData.langues.filter((language) => language !== languageToDelete);
    handleChange('langues', updatedLanguages);
  };

  return (
    <div className="step-one-container">
      <div className="text-field">
        <label>School Name</label>
        <input
          type="text"
          value={formData.ecole || ''}
          onChange={(e) => handleChange('ecole', e.target.value)}
        />
      </div>
      <div className="text-field">
        <label>Phone Number</label>
        <input
          type="text"
          value={formData.numeroTele || ''}
          onChange={(e) => handleChange('numeroTele', e.target.value)}
        />
      </div>
      <div className="text-field">
        <label>Country Code</label>
        <input
          type="text"
          value={formData.paysCode || ''}
          onChange={(e) => handleChange('paysCode', e.target.value)}
        />
      </div>
      <div className="text-field date-field">
        <label>Date of Birth</label>
        <input
          type="date"
          value={formData.dateNaissance || ''}
          onChange={(e) => handleChange('dateNaissance', e.target.value)}
        />
      </div>
      <div className="text-field select-languages">
        <label>Select Languages</label>
        <select
          multiple
          value={formData.langues || []}
          onChange={handleLanguagesChange}
        >
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="spanish">Spanish</option>
        </select>
        <div className="chip-container">
          {formData.langues &&
            formData.langues.map((language) => (
              <div key={language} className="chip">
                {language}
                <span className="delete-icon" onClick={() => handleDeleteLanguage(language)}>×</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StepOne;
