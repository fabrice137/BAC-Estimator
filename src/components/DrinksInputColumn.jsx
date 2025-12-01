// src/components/DrinksInputColumn.jsx
import React, { useState } from 'react';
import StepperInput from './StepperInput';
import CollapseIcon from './CollapseIcon';

function DrinksInputColumn({ onAddManualDrink, presetDrinksData, onAddPreset, onCalculateBAC }) {
  const [numDrinks, setNumDrinks] = useState("1");
  const [glassSize, setGlassSize] = useState("330");
  const [abv, setAbv] = useState("5");

  // Preset state
  const [selectedPresetKey, setSelectedPresetKey] = useState("");
  const [presetQuantity, setPresetQuantity] = useState("1");

  // Collapse state
  const [isPresetsOpen, setIsPresetsOpen] = useState(true);
  const [isManualOpen, setIsManualOpen] = useState(false);

  // Handle mutual exclusivity of preset and manual sections
  const handlePresetsToggle = () => {
    setIsPresetsOpen(!isPresetsOpen);
    if (!isPresetsOpen) setIsManualOpen(false);
  };

  const handleManualToggle = () => {
    setIsManualOpen(!isManualOpen);
    if (!isManualOpen) setIsPresetsOpen(false);
  };

  const handleCalculate = () => {
    setIsPresetsOpen(false);
    setIsManualOpen(false);
    onCalculateBAC();
  };

  const handleStepperChange = (currentValStr, setter, change, min, max, stepVal) => {
    let currentValue = parseFloat(currentValStr);
    if (isNaN(currentValue)) {
      currentValue = (min !== null && min > 0) ? min : 0;
    }
    let newValue = currentValue + change;
    if (min !== null) newValue = Math.max(min, newValue);
    if (max !== null) newValue = Math.min(max, newValue);

    if (stepVal.toString().includes('.')) {
      newValue = parseFloat(newValue.toFixed(1));
    } else {
      newValue = Math.round(newValue / stepVal) * stepVal;
      if (min !== null) newValue = Math.max(min, newValue);
      if (max !== null) newValue = Math.min(max, newValue);
    }
    setter(newValue.toString());
  };

  const handleAddClick = () => {
    const num = parseInt(numDrinks);
    const size = parseFloat(glassSize);
    const alcoholByVolume = parseFloat(abv);

    if (isNaN(num) || num <= 0 || isNaN(size) || size <= 0 || isNaN(alcoholByVolume) || alcoholByVolume < 0) {
      alert("Please enter valid positive numbers for all manual drink fields (ABV can be 0 or more).");
      return;
    }
    
    onAddManualDrink({ num, size, abv: alcoholByVolume }); 
  };

  const handleAddPresetClick = () => {
    if (!selectedPresetKey) {
      alert("Please select a preset drink from the list.");
      return;
    }
    const quantityNum = parseInt(presetQuantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      alert("Please enter a valid quantity for the preset drink.");
      return;
    }

    const presetData = presetDrinksData[parseInt(selectedPresetKey)];
    if (!presetData) {
        alert("There was an error adding the preset drink.");
        return;
    }
    
    onAddPreset(presetData, quantityNum);
    
    setSelectedPresetKey(""); 
    setPresetQuantity("1"); 
  };

  return (
    <div className="column" id="drinksColumn">
      <h2>Manage Drinks</h2>

      {/* Quick Add Section */}
      <div className="collapsible-section">
        <h3 className="section-title" onClick={handlePresetsToggle} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
          Quick Add Common Drinks
          <CollapseIcon isOpen={isPresetsOpen} />
        </h3>
        {isPresetsOpen && (
          <div className="section-content">
            <div className="input-group">
              <label htmlFor="presetDrink">Select:</label>
              <select 
                id="presetDrink" 
                value={selectedPresetKey} 
                onChange={(e) => setSelectedPresetKey(e.target.value)}
              >
                <option value="">-- Choose a drink --</option>
                {presetDrinksData && presetDrinksData.map((drink, index) => (
                  <option key={index} value={index.toString()}>
                    {drink.name} {drink.details}
                  </option>
                ))}
              </select>
            </div>
            <StepperInput
              label="Quantity"
              id="presetQuantity"
              value={presetQuantity}
              onChange={(e) => setPresetQuantity(e.target.value)}
              onStep={(change) => handleStepperChange(presetQuantity, setPresetQuantity, change, 1, 50, 1)}
              min="1"
              max="50"
              step="1"
              stepAmount={1}
            />
            <button 
              type="button" 
              className="button add-preset-button" 
              onClick={handleAddPresetClick}
            >
              + Add Selected Preset(s)
            </button>
          </div>
        )}
      </div>

      {/* Manual Add Section */}
      <div className="collapsible-section">
        <h3 className="section-title" onClick={handleManualToggle} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
          Add Drink Manually
          <CollapseIcon isOpen={isManualOpen} />
        </h3>
        {isManualOpen && (
          <div className="section-content">
            <div className="manual-drink-inputs-row">
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label htmlFor="glassSize">Size (ml)</label>
                  <input
                    type="number"
                    id="glassSize"
                    value={glassSize}
                    onChange={(e) => setGlassSize(e.target.value)}
                    min="1"
                    placeholder="330"
                  />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label htmlFor="abv">ABV (%)</label>
                  <input
                    type="number"
                    id="abv"
                    value={abv}
                    onChange={(e) => setAbv(e.target.value)}
                    min="0"
                    step="0.1"
                    placeholder="5"
                  />
                </div>
              </div>
              <StepperInput
                label="Quantity"
                id="numDrinks"
                value={numDrinks}
                onChange={(e) => setNumDrinks(e.target.value)}
                onStep={(change) => handleStepperChange(numDrinks, setNumDrinks, change, 1, 50, 1)}
                min="1"
                max="50"
                step="1"
                stepAmount={1}
              />
              
            </div>
            <button 
              type="button" 
              className="button add-drink-button" 
              onClick={handleAddClick}
            >
              + Add Manual Drink(s)
            </button>
          </div>
        )}
      </div>

      <button 
        type="button" 
        className="button calculate-button" 
        onClick={handleCalculate}
        style={{ marginTop: '20px', width: '100%' }}
      >
        Calculate BAC
      </button>
    </div>
  );
}

export default DrinksInputColumn;