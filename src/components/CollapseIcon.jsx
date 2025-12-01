// src/components/CollapseIcon.jsx
import React from 'react';

function CollapseIcon({ isOpen }) {
  // When isOpen is true, show down arrow ▼ (content is visible)
  // When isOpen is false, show right arrow ▶ (content is hidden)
  return (
    <span className="collapse-icon">
      {isOpen ? '▼' : '▶'}
    </span>
  );
}

export default CollapseIcon;
