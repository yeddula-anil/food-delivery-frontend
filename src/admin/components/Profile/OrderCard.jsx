import React, { useState } from 'react';
import {
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../../../components/Redux/RestaurantOrders/Action';

const categorizeIngredients = (ingredients = []) => {
  const result = {};
  ingredients.forEach((ing) => {
    const category = ing.category || 'Uncategorized';
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(ing.name);
  });
  return result;
};

const OrderCard = ({item}) => {
 

  const statusOptions = ['PENDING', 'COMPLETED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const [expanded, setExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(item.orderStatus);
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt");

  const handleAccordionChange = () => {
    setExpanded((prev) => !prev);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    dispatch(updateOrderStatus({orderId:item.id,orderStatus:newStatus,jwt}))
    setSelectedStatus(newStatus);
    console.log('Status changed to:', newStatus);
  };

  

  return (
    <Card className="p-5 mb-4">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-5">
          <img className="h-16 w-16 object-cover" src={item.food.images[0]} alt="" />
          <div>
            <p className="font-semibold">{item.food.name}</p>
            <p className="text-gray-600">₹{item.totalPrice}</p>
          </div>
        </div>

        <p>Quantity: {item.quantity}</p>
        

        <div>
          <Select
            value={selectedStatus}
            onChange={handleStatusChange}
            size="small"
            className="w-40"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option.replaceAll('_', ' ')}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Accordion for Ingredients */}
      <Accordion expanded={expanded} onChange={handleAccordionChange} className="mt-4">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="font-medium">Ingredients</Typography>
          
        </AccordionSummary>

        <AccordionDetails>
          <div className="flex flex-wrap gap-4">
  {item.ingredients && item.ingredients.map((ingredient, index) => (
    <span
      key={index}
      className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-800 shadow"
    >
      {ingredient}
    </span>
  ))}
</div>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default OrderCard;
