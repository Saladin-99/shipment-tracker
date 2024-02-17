import React from 'react';
import ProgressBar from './ProgressBar';
import { useLanguage } from './LanguageContext';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function ShippingDetails({ shippingData }) {
  const { translate } = useLanguage();

  if (!shippingData) {
    return null; // Return null if shippingData is not available yet
  }
    
  // Make a copy of shippingData to avoid modifying the original object directly
  const updatedShippingData = { ...shippingData };

  // Check and update events in CurrentStatus
  if (updatedShippingData.CurrentStatus) {
    if (updatedShippingData.CurrentStatus.state === 'DELIVERED_TO_SENDER') {
      updatedShippingData.CurrentStatus.state = 'DELIVERED';
    }
  }

  // Check and update events in TransitEvents
  if (updatedShippingData.TransitEvents) {
    updatedShippingData.TransitEvents.forEach(event => {
      if (event.state === 'DELIVERED_TO_SENDER') {
        event.state = 'DELIVERED';
      }
    });
  }
  const { TrackingNumber, CurrentStatus, provider, PromisedDate, SupportPhoneNumbers, TransitEvents } = updatedShippingData;

  const handleSupportPhoneNumberClick = () => {
    const supportPhoneNumbersText = translate('Support Phone Numbers') + ': ' + SupportPhoneNumbers.join(', ');
    alert(supportPhoneNumbersText);
  };

  // Define the stages and their associated states
  const stages = [
    { state: 'TICKET_CREATED', label: translate('Ticket Created') },
    { state: 'PACKAGE_RECEIVED', label: translate('Package Received') },
    { state: 'OUT_FOR_DELIVERY', label: translate('Out for Delivery') },
    { state: 'DELIVERED', label: translate('Delivered') }
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
        return translate('We have received your order');
      case 'PACKAGE_RECEIVED':
        const packageReceivedText = translate('Package Received');
        return event.hub ?`${packageReceivedText} at ${event.hub}` : translate('Package Received from Seller');
      case 'IN_TRANSIT':
        return translate('Your package is on the move');
      case 'OUT_FOR_DELIVERY':
        return translate('Your package is out for delivery');
      case 'CANCELLED':
        return translate('Your order has been cancelled');
      case 'DELIVERED':
        return translate('Your order has been delivered successfully');
      case 'NOT_YET_SHIPPED':
        return translate('Your order will be shipped soon');
      case 'WAITING_FOR_CUSTOMER_ACTION':
        const ndReceivedText= translate('Order not delivered')
        return event.reason ? `${ndReceivedText}: ${event.reason}` : `${ndReceivedText}`;
      default:
        return event.state;
    }
  };

  return (
    <Box className="ShippingDetails" sx={{ p: 2 }}>
      {/* Order # */}
      <Box className="OrderNumber section" sx={{ mb: 2 }}>
        <Typography variant="h6">{translate('Order')} #{TrackingNumber}</Typography>
        <Typography variant="h6">{mapStateToMessage(CurrentStatus)}</Typography>
      </Box>
  
      {/* Important details */}
      <Box className="ImportantDetails section" sx={{ mb: 2 }}>
      <div>
      
    </div>
        <Typography variant="body1">{translate('Merchant Name')}: {provider}</Typography>
        {CurrentStatus.state !== 'CANCELLED' && (
        <Typography variant="body1">{translate('Expected Arrival Date')}: {new Date(PromisedDate).toLocaleDateString()}</Typography>
        )}

        <Typography variant="body1">
          {translate('Got a problem with your shipment?')} 
          <Button onClick={handleSupportPhoneNumberClick} sx={{ ml: 1 }} color="primary">{translate('Get Support')}</Button>
        </Typography>
      </Box>
  
      {/* Progress bar */}
      <Box className="ProgressBar section" sx={{ mb: 2 }}>
        <ProgressBar stages={stages} currentStage={currentStage} transitEvents={TransitEvents} currentStatus={CurrentStatus}/>
      </Box>
  
      {/* Shipment Details */}
      <Box className="ShipmentDetails section">
        <Typography variant="h6">{translate('Shipment Details')}</Typography>
        {Object.entries(eventsByDay).reverse().map(([date, events]) => (
          <Box key={date} className="DayEvents" sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{date}</Typography>
            <ul>
              {events.reverse().map((event, index) => (
                <li key={index}>
                  <Typography variant="body2">{mapStateToMessage(event)}</Typography>
                  <Typography variant="body2">{new Date(event.timestamp).toLocaleTimeString()}</Typography>
                </li>
              ))}
            </ul>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ShippingDetails;
