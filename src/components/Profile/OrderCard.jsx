import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OrderCard = ({ item, status }) => {
  const [expanded, setExpanded] = useState(false);

  const statusColorMap = {
    PENDING: 'primary',
    COMPLETED: 'success',
    OUT_FOR_DELIVERY: 'error',
    DELIVERED: 'warning',
  };

  const buttonColor = statusColorMap[status] || 'default';

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      elevation={0}
      style={{ width: '100%' }} // full width
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Food details */}
          <div className="flex items-center gap-4">
            <img
              className="h-16 w-16 rounded object-cover"
              src={item.food.images[0]}
              alt={item.food.name}
            />
            <div>
              <p className="font-semibold text-lg">{item.food.name}</p>
              <p className="text-gray-500 text-sm">₹{item.food.price}</p>
            </div>
          </div>

          {/* Quantity */}
          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
        </div>
      </AccordionSummary>

      <AccordionDetails className="px-4">
        {/* Status (Read-only) */}
        <div className="flex flex-col md:flex-row gap-2 items-center mb-3">
          <Button variant="contained" color={buttonColor} disabled>
            {status.replace(/_/g, ' ')}
          </Button>
        </div>

        {/* Ingredients */}
        <Typography variant="subtitle1" className="font-medium mb-2">
          Ingredients
        </Typography>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {item.food.ingredients.map((ingredient, index) => (
            <li key={ingredient.id || index}>
              {typeof ingredient === 'string' ? ingredient : ingredient.name}
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderCard;
