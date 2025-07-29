import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../Redux/Orders/Action'

const Orders = () => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const orders = useSelector(store => store.order.orders)

  useEffect(() => {
    dispatch(getUserOrders(jwt))
  }, [dispatch, jwt])

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="text-xl sm:text-2xl font-semibold text-center mt-0 sm:mt-6">
        My Orders
      </h1>

      {/* Orders list */}
      <div className="space-y-5 w-full mt-4 sm:mt-6">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard 
              key={order.id} 
              item={order} 
              status={order.orderStatus} 
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No orders found</p>
        )}
      </div>
    </div>
  )
}

export default Orders
