import React, { useState } from 'react';
import '../Style/StepTwo.css';

const StepTwo = ({ formData, handleChange }) => {
  const [preview, setPreview] = useState(formData.photoUrl || '');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target.result;
        setPreview(url);
        handleChange('photoUrl', url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="step-two-container">
      <div className="description-field">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
        />
      </div>
      <div>
        <p>Upload Profile Picture</p>
        <input
          accept="image/*"
          type="file"
          id="upload-photo"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="upload-photo">
          <button className="upload-photo-button">Choose File</button>
        </label>
        {preview && (
          <div style={{ marginTop: '10px' }}>
            <p>Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="preview-image"
            />
          </div>
        )}
      </div>
      <div className="contact-preference-select">
        <label>Contact Preference</label>
        <select
          value={formData.contactPreference}
          onChange={(e) => handleChange('contactPreference', e.target.value)}
        >
          <option value="FEMMES">Femmes</option>
          <option value="HOMMES">Hommes</option>
          <option value="PEU_IMPORTE">Peu Importe</option>
        </select>
      </div>
    </div>
  );
};

export default StepTwo;