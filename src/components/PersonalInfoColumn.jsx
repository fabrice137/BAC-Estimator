// src/components/PersonalInfoColumn.jsx
import React, { useState } from 'react';
import StepperInput from './StepperInput';
import DrinkList from './DrinkList';
import CollapseIcon from './CollapseIcon';

function PersonalInfoColumn({
  weight,
  gender,
  time,
  drinks,
  onRemoveDrink,
  isCollapsed,
  onToggleCollapse,
  onWeightChange,
  onGenderChange,
  onTimeChange,
  onWeightStep,
  onTimeStep
}) {
  const [isListOpen, setIsListOpen] = useState(true);

  return (
    <div className="column" id="personalInfoColumn">
      {/* Collapsible Personal Details Section */}
      <div className="collapsible-section">
        <div className="column-header" onClick={onToggleCollapse} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Your Details</h2>
          <CollapseIcon isOpen={!isCollapsed} />
        </div>
        
        {!isCollapsed && (
          <div className="section-content">
            <div className="input-group">
              <label>Gender</label>
              <div className="gender-selector" style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <label style={{ cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    checked={gender === 'male'} 
                    onChange={onGenderChange} 
                  /> Male
                </label>
                <label style={{ cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    checked={gender === 'female'} 
                    onChange={onGenderChange} 
                  /> Female
                </label>
              </div>
            </div>

            <StepperInput
              label="Your Weight (kg)"
              id="weight"
              value={weight}
              onChange={onWeightChange}
              onStep={onWeightStep}
              min="30"
              max="250"
              step="5"
              stepAmount={5}
            />
          </div>
        )}
      </div>

      {/* Always Visible Time Section */}
      <div className="time-section" style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
        <StepperInput
          label="Time Since First Drink (Hours)"
          id="time"
          value={time}
          onChange={onTimeChange}
          onStep={onTimeStep}
          min="0"
          max="24"
          step="0.5"
          stepAmount={0.5}
        />
      </div>

      {/* Consumed Drinks Section - Only visible if there are drinks */}
      {drinks && drinks.length > 0 && (
        <div className="collapsible-section" style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
          <h3 className="section-title" onClick={() => setIsListOpen(!isListOpen)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            Consumed Drinks
            <CollapseIcon isOpen={isListOpen} />
          </h3>
          {isListOpen && (
            <div id="drinkListContainer" className="section-content">
              <DrinkList drinks={drinks} onRemoveDrink={onRemoveDrink} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PersonalInfoColumn;