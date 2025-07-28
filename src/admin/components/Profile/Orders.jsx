import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import {useDispatch, useSelector} from 'react-redux'
import { fetchRestaurantsOrder } from '../../../components/Redux/RestaurantOrders/Action';



const Orders = () => {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")
  const orders=useSelector(state=>state.restaurantOrders?.orders ||  [])
  console.log("order object",orders)
  
  useEffect(()=>{
    dispatch(fetchRestaurantsOrder(jwt))
    
  },[dispatch,jwt])
  const filteredOrders =
    filterStatus === 'ALL'
      ? orders
      : orders.filter(order => order.orderStatus === filterStatus);

 

  const statuses = ['ALL', 'PENDING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED'];

  return (
    <div className="p-4 flex flex-col gap-6 max-w-3xl mx-auto">
      <h3 className="text-center text-2xl font-bold mb-4">Restaurant Orders</h3>

      {/* Radio buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {statuses.map(status => (
          <label key={status} className="flex items-center gap-2">
            <input
              type="radio"
              name="orderStatus"
              value={status}
              checked={filterStatus === status}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="accent-blue-600"
            />
            <span className="capitalize">{status.toLowerCase().replace(/_/g, ' ')}</span>
          </label>
        ))}
      </div>

      {/* Filtered Order Cards */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderCard key={order.id} item={order} />
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found for selected status.</p>
      )}
    </div>
  );
};

export default Orders;
