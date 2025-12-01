// src/components/ResultsColumn.jsx
import React from 'react';
import BacResultCard from './BacResultCard'; // Import the BacResultCard component

function ResultsColumn({ bacResults, showResults, selectedGender }) {
  const resultToDisplay = selectedGender === 'female' ? bacResults.female : bacResults.male;

  return (
    <div className="column" id="resultsColumn">
      <h2>Estimated BAC</h2>
      {showResults && (
        <div className="result-section-content" style={{ marginTop: '15px' }}>
          <div className="dual-result-container" style={{ flexDirection: 'column' }}>
            <BacResultCard
              gender={selectedGender}
              resultData={resultToDisplay}
              isActive={true}
            />
          </div>
          <p className="info-text legal-limit-info">
            Legal BAC limit in Rwanda for driving: <strong>0.08%</strong>.
            <br />Any alcohol can impair driving.
          </p>
        </div>
      )}
      
      <div className="results-column-footer">
        <div className="footer-disclaimer">
          <p>
            <strong>Disclaimer:</strong> This is an estimate for informational
            purposes. Individual results vary.
            <strong>DO NOT use this to determine fitness to drive.</strong>
            Safe driving BAC is 0.00%. Never drink & drive.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultsColumn;