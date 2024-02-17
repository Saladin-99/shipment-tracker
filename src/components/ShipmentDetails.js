// ShippingDetails.js
import React from 'react';
import ProgressBar from './ProgressBar';

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
  // Group transit events by day
  const eventsByDay = {};
  TransitEvents.forEach(event => {
    const date = new Date(event.timestamp).toLocaleDateString();
    if (!eventsByDay[date]) {
      eventsByDay[date] = [];
    }
    eventsByDay[date].push(event);
  });
  // Find the current stage based on the transit events
  const currentStage = TransitEvents.reduce((acc, event) => {
    const stageIndex = stages.findIndex(stage => stage.state === event.state);
    if (stageIndex !== -1) {
      return stageIndex;
    }
    return acc;
  }, -1);

  
 // Function to map states to text messages
  const mapStateToMessage = event => {
    switch (event.state) {
      case 'TICKET_CREATED':
        return 'We have received your order';
      case 'PACKAGE_RECEIVED':
        return event.hub ? `Package Received at ${event.hub}` : 'Package Received from Seller';
      case 'IN_TRANSIT':
        return 'Your package is on the move';
      case 'OUT_FOR_DELIVERY':
        return 'Your package is out for delivery';
      case 'CANCELLED':
        return 'Your order has been cancelled';
      case 'DELIVERED':
        return 'Your order has been delivered';
      case 'NOT_YET_SHIPPED':
        return 'Your order will be shipped soon';
      case 'WAITING_FOR_CUSTOMER_ACTION':
        return event.reason ? `Order not delivered: ${event.reason}` : "Order not delivered";
      default:
        return event.state;
    }
  };

  return (
    <div className="ShippingDetails">
      {/* Order # */}
      <div className="OrderNumber section">
        <p>Order #{TrackingNumber}</p>
      </div>
  
      {/* Important details */}
      <div className="ImportantDetails section">
        <p>{mapStateToMessage(CurrentStatus)}</p>
        <p>Merchant Name: {provider}</p>
        <p>Expected Arrival Date: {new Date(PromisedDate).toLocaleDateString()}</p>
        <p>Got a problem with your shipment? <span onClick={handleSupportPhoneNumberClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Support Phone Numbers</span></p>
      </div>
  
      {/* Progress bar */}
      <div className="ProgressBar section">
        <ProgressBar stages={stages} currentStage={currentStage} transitEvents={TransitEvents} currentStatus={CurrentStatus}/>
      </div>
  
      {/* Shipment Details */}
      <div className="ShipmentDetails section">
        <h2>Shipment Details</h2>
        {Object.entries(eventsByDay).reverse().map(([date, events]) => (
          <div key={date} className="DayEvents">
            <h3>{date}</h3>
            <ul>
              {events.reverse().map((event, index) => (
                <li key={index}>
                  <span>{mapStateToMessage(event)}</span>
                  <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default ShippingDetails;
