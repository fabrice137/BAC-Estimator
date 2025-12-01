// src/components/BacResultCard.jsx
import React from 'react';

function BacResultCard({ resultData, isActive, gender }) {
  // resultData is expected to be an object like:
  // { bacStr, message, timeToSober, className }
  
  if (!resultData) {
    // Handle cases where resultData might be initially undefined or null if needed
    return null; 
  }

  const isFemale = gender === 'female';
  const genderClass = isFemale ? 'female' : 'male';
  const genderSuffix = isFemale ? 'Female' : 'Male';

  return (
    <div className={`dual-result ${genderClass} ${isActive ? 'active-gender-result' : ''}`}>
      <div id={`bacResultDisplay${genderSuffix}`} className={resultData.className}>
        {resultData.bacStr}
      </div>
      <div id={`bacMessage${genderSuffix}`} className="bac-message-text">
        {resultData.message}
      </div>
      <p className="info-text">
        Est. time to sober: <span id={`timeToSober${genderSuffix}`}>{resultData.timeToSober}</span>
      </p>
    </div>
  );
}

export default BacResultCard;