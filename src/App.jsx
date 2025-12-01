// src/App.jsx
import React, { useState, useEffect } from 'react';
import PersonalInfoColumn from './components/PersonalInfoColumn';
import DrinksInputColumn from './components/DrinksInputColumn';
import ResultsColumn from './components/ResultsColumn';
import { PRESET_DRINKS_DATA } from './constants/drinks';
import {
  calculateTotalAlcoholGrams,
  calculateBacForGender,
  getBacStatus,
  formatTimeToSober
} from './utils/bacUtils';


function App() {
  const [drinks, setDrinks] = useState([]);
  const [weight, setWeight] = useState("70");
  const [gender, setGender] = useState("male");
  const [time, setTime] = useState("1");
  const [detailsCollapsed, setDetailsCollapsed] = useState(false);

  const [showResults, setShowResults] = useState(false);
  const [bacResults, setBacResults] = useState({
    male: { bacStr: "0.000%", message: "", timeToSober: "N/A", className: "bac-safe" },
    female: { bacStr: "0.000%", message: "", timeToSober: "N/A", className: "bac-safe" },
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedWeight = localStorage.getItem('bac_weight');
    const savedGender = localStorage.getItem('bac_gender');
    const hasVisited = localStorage.getItem('bac_has_visited');

    if (savedWeight) setWeight(savedWeight);
    if (savedGender) setGender(savedGender);
    
    if (hasVisited) {
      setDetailsCollapsed(true);
    } else {
      localStorage.setItem('bac_has_visited', 'true');
    }
  }, []);

  // Save weight and gender to localStorage when they change
  useEffect(() => {
    localStorage.setItem('bac_weight', weight);
  }, [weight]);

  useEffect(() => {
    localStorage.setItem('bac_gender', gender);
  }, [gender]);

  const handleAddPresetDrink = (presetData, quantity) => {
    const totalSize = presetData.size * quantity;
    setDrinks(prevDrinks => [...prevDrinks, {
        size: totalSize,
        abv: presetData.abv,
        description: `${quantity} x ${presetData.name} ${presetData.details}`
    }]);
    setShowResults(false);
    setDetailsCollapsed(true);
  };

  const handleAddManualDrink = (drinkDetails) => {
    const totalVolumeForThisEntry = drinkDetails.num * drinkDetails.size;
    setDrinks(prevDrinks => [...prevDrinks, {
        size: totalVolumeForThisEntry,
        abv: drinkDetails.abv,
        description: `${drinkDetails.num} x ${drinkDetails.size}ml @ ${drinkDetails.abv}% ABV (Manual)`
    }]);
    setShowResults(false);
    setDetailsCollapsed(true);
  };

  const handleRemoveDrink = (indexToRemove) => {
    setDrinks(prevDrinks => prevDrinks.filter((_, index) => index !== indexToRemove));
    setShowResults(false);
  };

  const handleCalculateBAC = () => {
    const weightKgNum = parseFloat(weight);
    const timeHoursNum = parseFloat(time);

    if (isNaN(weightKgNum) || weightKgNum <= 0) {
      alert("Please enter a valid weight.");
      setShowResults(false);
      return;
    }
    if (drinks.length === 0) {
      alert("Please add at least one drink.");
      setShowResults(false);
      return;
    }

    const weightGrams = weightKgNum * 1000;
    const totalAlcoholGrams = calculateTotalAlcoholGrams(drinks);

    const bacMaleCalc = calculateBacForGender(totalAlcoholGrams, weightGrams, timeHoursNum, 'male');
    const bacFemaleCalc = calculateBacForGender(totalAlcoholGrams, weightGrams, timeHoursNum, 'female');

    const maleStatus = getBacStatus(bacMaleCalc);
    const femaleStatus = getBacStatus(bacFemaleCalc);

    setBacResults({
        male: {
            bacStr: `${bacMaleCalc.toFixed(3)}%`,
            message: maleStatus.message,
            timeToSober: formatTimeToSober(bacMaleCalc),
            className: maleStatus.className
        },
        female: {
            bacStr: `${bacFemaleCalc.toFixed(3)}%`,
            message: femaleStatus.message,
            timeToSober: formatTimeToSober(bacFemaleCalc),
            className: femaleStatus.className
        },
    });
    setShowResults(true);
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setShowResults(false); 
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
    setShowResults(false);
  };


  return (
    <div className="app-container">
      <PersonalInfoColumn
        weight={weight}
        gender={gender}
        time={time}
        drinks={drinks}
        onRemoveDrink={handleRemoveDrink}
        isCollapsed={detailsCollapsed}
        onToggleCollapse={() => setDetailsCollapsed(!detailsCollapsed)}
        onWeightChange={handleInputChange(setWeight)}
        onGenderChange={handleInputChange(setGender)}
        onTimeChange={handleInputChange(setTime)}
        onWeightStep={(change) => handleStepperChange(weight, setWeight, change, 30, 250, 5)}
        onTimeStep={(change) => handleStepperChange(time, setTime, change, 0, 24, 0.5)}
      />
      <DrinksInputColumn
        onAddManualDrink={handleAddManualDrink}
        presetDrinksData={PRESET_DRINKS_DATA}
        onAddPreset={handleAddPresetDrink}
        onCalculateBAC={handleCalculateBAC}
      />
      <ResultsColumn
        bacResults={bacResults}
        showResults={showResults}
        selectedGender={gender}
      />
    </div>
  );
}

export default App;