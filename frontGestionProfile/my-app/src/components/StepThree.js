import React from 'react';
import '../Style/StepThree.css';

const StepThree = ({ formData, handleChange }) => {
  const handleTagClick = (tagType, tagValue) => {
    const updatedTags = formData[tagType].includes(tagValue)
      ? formData[tagType].filter(item => item !== tagValue)
      : [...formData[tagType], tagValue];
    handleChange(tagType, updatedTags);
  };

  const renderTags = (tags, tagType) => {
    return tags.map((tag) => {
      const isSelected = formData[tagType].includes(tag);
      return (
        <div
          key={tag}
          onClick={() => handleTagClick(tagType, tag)}
          className={`tag-chip ${isSelected ? 'selected' : 'unselected'}`}
        >
          {tag}
        </div>
      );
    });
  };

  const passions = ['MUSIC', 'SPORTS'];
  const dietaryHabits = ['VEGAN', 'HEALTHY', 'GLUTEN_FREE'];
  const lifestyles = ['VEGETARIAN', 'ACTIVE'];
  const personalities = [
    'SERIOUS', 'ORGANISED', 'TEAM_PLAYER', 'LAZY', 'GENEROUS', 'EARLY_RISER', 'CASUAL', 'RESPONSIBLE', 'SOFT', 'IRRESPONSIBLE',
    'LEADER', 'HYPERACTIVE', 'SOLITARY', 'INDIFFERENT', 'SELFISH', 'CALM', 'PERFECTIONIST', 'ENTHUSIASTIC', 'OUTGOING', 'CAUTIOUS',
    'EXTROVERT', 'INTROVERT', 'NIGHT_OWL', 'SPONTANEOUS', 'SOCIAL', 'SOBER'
  ];

  return (
    <div className="step-three-container">
      <h3>Select your Passions</h3>
      <div className="tags-container">
        {renderTags(passions, 'passions')}
      </div>

      <h3>Select your Dietary Habits</h3>
      <div className="tags-container">
        {renderTags(dietaryHabits, 'dietaryHabits')}
      </div>

      <h3>Select your Lifestyle Preferences</h3>
      <div className="tags-container">
        {renderTags(lifestyles, 'lifestylePreferences')}
      </div>

      <h3>Select your Personality Traits</h3>
      <div className="tags-container">
        {renderTags(personalities, 'personalityTraits')}
      </div>
    </div>
  );
};

export default StepThree;