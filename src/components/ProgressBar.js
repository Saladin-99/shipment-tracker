
import React from 'react';

function ProgressBar({ stages, currentStage, transitEvents, currentStatus }) {
  // Helper function to get the timestamp for a specific state
  const getTimestamp = (state) => {
    const event = transitEvents.find(event => event.state === state);
    return event ? new Date(event.timestamp).toLocaleString() : '';
  };

  // Determine the color class for the current stage
  const stageColorClass = currentStatus.state === 'CANCELLED' ? 'Cancelled' : 'NotStage';
  return (
    <div className="ProgressBar">
      {stages.map((stage, index) => (
        <div key={index} className={`ProgressStage ${index <= currentStage ? 'Achieved' : ''} ${index === currentStage && stage.state !== currentStatus.state ? stageColorClass : ''}`}>
          <span className="StageLabel">{stage.label}</span>
          {index <= currentStage && <span className="Timestamp">{getTimestamp(stage.state)}</span>}
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;
