import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OrderCard = ({ item, status }) => {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [expanded, setExpanded] = useState(false);

  const statusColorMap = {
    PENDING: 'primary',
    COMPLETED: 'success',
    OUT_FOR_DELIVERY: 'error',
    DELIVERED: 'warning',
  };

  const buttonColor = statusColorMap[selectedStatus] || 'default';

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    // optional: trigger status update API call here
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      elevation={0}
      style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Image and food details */}
          <div className="flex items-center gap-4">
            <img className="h-16 w-16 rounded object-cover" src={item.food.images[0]} alt={item.food.name} />
            <div>
              <p className="font-semibold text-lg">{item.food.name}</p>
              <p className="text-gray-500 text-sm">₹{item.food.price}</p>
            </div>
          </div>

          {/* Quantity */}
          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>

          {/* Status controls */}
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              size="small"
              className="min-w-[150px]"
            >
              {Object.keys(statusColorMap).map((statusKey) => (
                <MenuItem key={statusKey} value={statusKey}>
                  {statusKey.replace(/_/g, ' ')}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color={buttonColor}>
              {selectedStatus.replace(/_/g, ' ')}
            </Button>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails className="px-4">
        <div>
          <Typography variant="subtitle1" className="font-medium mb-2">Ingredients</Typography>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {item.food.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderCard;
