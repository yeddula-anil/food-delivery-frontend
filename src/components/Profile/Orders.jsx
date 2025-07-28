import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../Redux/Orders/Action'

const Orders = () => {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  const orders=useSelector(store=>store.order.orders)
  console.log("orders fetched successfuly",orders)
  useEffect(()=>{
    dispatch(getUserOrders(jwt))
  },[dispatch,jwt])
  return (
    <div className='flex items-center flex-col'>
        <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
        <div className='space-y-5 w-full lg:w-1/2'>
         {
          orders?.flatMap((order) =>
            order.items.map((item, index) => (
              <OrderCard key={`${order.id}-${index}`} item={item} status={order.orderStatus}/>
            ))
          )
        }


        </div>
     
    </div>
  )
}

export default Orders
