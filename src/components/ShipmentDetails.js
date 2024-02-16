// ShippingDetails.js
import React from 'react';

function ShippingDetails({ shippingData }) {
  if (!shippingData) {
    return null; // Return null if shippingData is not available yet
  }

  const { TrackingNumber, CurrentStatus, provider, PromisedDate, SupportPhoneNumbers, TransitEvents } = shippingData;

  const handleSupportPhoneNumberClick = () => {
    // Handle clicking support phone number (e.g., show a tooltip)
    alert(`Support Phone Numbers: ${SupportPhoneNumbers.join(', ')}`);
  };

  // Define the stages and their associated states
  const stages = [
    { state: 'TICKET_CREATED', label: 'Ticket Created' },
    { state: 'PACKAGE_RECEIVED', label: 'Package Received' },
    { state: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { state: 'DELIVERED', label: 'Delivered' }
  ];

  // Find the current stage based on the transit events
  const currentStage = TransitEvents.reduce((acc, event) => {
    const stageIndex = stages.findIndex(stage => stage.state === event.state);
    if (stageIndex !== -1) {
      return stageIndex;
    }
    return acc;
  }, -1);

  // Helper function to get the timestamp for a specific state
  const getTimestamp = (state) => {
    const event = TransitEvents.find(event => event.state === state);
    return event ? new Date(event.timestamp).toLocaleString() : '';
  };

  return (
    <div className="ShippingDetails">
      {/* Important details */}
      <div className="ImportantDetails">
        <p>Order Tracking Number: {TrackingNumber}</p>
        <p>Current Status: {CurrentStatus.state}</p>
        <p>Merchant Name: {provider}</p>
        <p>Expected Arrival Date: {new Date(PromisedDate).toLocaleDateString()}</p>
        <p>Got a problem with your shipment? <span onClick={handleSupportPhoneNumberClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Support Phone Numbers</span></p>
      </div>

      {/* Progress bar */}
      <div className="ProgressBar">
        {stages.map((stage, index) => (
          <div key={index} className={`ProgressStage ${index <= currentStage ? 'Achieved' : ''}`}>
            <span className="StageLabel">{stage.label}</span>
            {index <= currentStage && <span className="Timestamp">{getTimestamp(stage.state)}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShippingDetails;
