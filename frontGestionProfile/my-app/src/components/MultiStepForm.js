import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // UUID Import
import '../Style/MultiStepForm.css';

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    ecole: '',
    numeroTele: '',
    paysCode: '',
    dateNaissance: '',
    langues: [],
    description: '',
    photoUrl: '',
    contactPreference: '',
    personalityTraits: [],
    lifestylePreferences: [],
    dietaryHabits: [],
    passions: [],
  });

  const [step, setStep] = useState(0); // Step tracker (zero-indexed)

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.dateNaissance) {
      alert('Please enter your date of birth.');
      return;
    }

    const formattedDate = new Date(formData.dateNaissance)
      .toISOString()
      .split('T')[0]; // Format the date to YYYY-MM-DD

    const etudiantData = {
      ...formData,
      id: uuidv4(),
      dateNaissance: formattedDate,
      langues: formData.langues.join(', '), // Convert array to string
    };

    // Submit form data to the backend
    axios
      .post('http://localhost:1016/etudiant/creation-profile/save', etudiantData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log('Form submitted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <StepOne formData={formData} handleChange={handleChange} />;
      case 1:
        return <StepTwo formData={formData} handleChange={handleChange} />;
      case 2:
        return <StepThree formData={formData} handleChange={handleChange} />;
      default:
        return <StepOne formData={formData} handleChange={handleChange} />;
    }
  };

  return (
    <div className="multi-step-form-container">
      <h1 className="form-title">Complete your profile</h1>

      <div className="stepper">
        <div className={`step ${step === 0 ? 'active' : ''}`}>Step 1</div>
        <div className={`step ${step === 1 ? 'active' : ''}`}>Step 2</div>
        <div className={`step ${step === 2 ? 'active' : ''}`}>Step 3</div>
      </div>

      <div className="step-content">{renderStepContent()}</div>

      <div className="button-container">
        {step > 0 && (
          <button
            onClick={prevStep}
            className="button previous"
          >
            Previous
          </button>
        )}
        {step < 2 ? (
          <button
            onClick={nextStep}
            className="button next"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="button submit"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;