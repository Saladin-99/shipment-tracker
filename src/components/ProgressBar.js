// ProgressBar.js
import React from 'react';

function ProgressBar({ stages, currentStage, transitEvents }) {
  // Helper function to get the timestamp for a specific state
  const getTimestamp = (state) => {
    const event = transitEvents.find(event => event.state === state);
    return event ? new Date(event.timestamp).toLocaleString() : '';
  };

  return (
    <div className="ProgressBar">
      {stages.map((stage, index) => (
        <div key={index} className={`ProgressStage ${index <= currentStage ? 'Achieved' : ''}`}>
          <span className="StageLabel">{stage.label}</span>
          {index <= currentStage && <span className="Timestamp">{getTimestamp(stage.state)}</span>}
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;
