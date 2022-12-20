import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';
import './Order.scss'
import { useNavigate } from 'react-router-dom';

const Order = () => {

    const [orders, setOrders]= useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const stripePromise = loadStripe('pk_test_51MDQg5SJhHxJNEdqh3LUaR66qg1eHSTDU6gmdIFupu7g5znl4IYV0gxCvFin7oQJgQgOtmBgqCGpvuzgsMM9oWPU00yW6JUiUt');

    
    // console.log(currentUser)

    useEffect(()=>{
      getOrder();
    },[])

    async function getOrder(){
        try{
            let res = await fetch(`${import.meta.env.VITE_BASE_URL}/customer/orders/${currentUser?.user?._id}`)
    
            let data = await res.json()
    
            if(data.success){
              setOrders(data.data.reverse())
            }
        }
        catch(err){
            console.log(err)
        }
    }

    async function handlePayment(id){
      // console.log(id)
      try{
        const stripe = await stripePromise;
        let res = await fetch(`${import.meta.env.VITE_BASE_URL}/create-checkout-session`,{
          method : 'POST',
          headers : {
            'content-type' : 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // "Access-Control-Allow-Methods": "POST, OPTIONS",
          },
          body : JSON.stringify({id:id})
        })

        let data = await res.json();
        // console.log(data)

        // navigate(`/${data.url}`)

        // console.log(data)

        await stripe.redirectToCheckout({
          sessionId: data.stripeSession.id
        })
        
        
  
      }
      catch(err){
        console.log(err)
      }
    }

    function setBtn(status, id){
      if(status===0){
        return(
        <>
          <button>Waiting For Acceptance</button><br />
          <p>Please Check After 5 min...</p>
        </>
        )
      }
      if(status===1){
        return(<button onClick={()=>{
          handlePayment(id)
        }}>Proceed To Checkout</button>)
      }
      if(status===3){
        return(
          <>
            <button>Out For Delivery</button>
            <small>
              <strong>Payment : Done</strong>
            </small><br />
            <p>Will Be Delivered Within 30 min...</p>
          </>
          )
      }
    }
    // console.log(orders)

  return (
    <div className='orders'>
      <h2>Orders</h2>
      <div className='orders_container'>
        {orders?.map((order, index)=>{
          let totalPrice=0;
          return(
            <div className='card' key={index}>
              <div className='title'>
                <strong>OrderID :</strong>
                <p>{order._id}</p>
              </div>
              <div className='list'>
                {order?.products.map((product,index)=>{
                  totalPrice+= product.orderedQuantity * product.product.price;
                  return(
                      <details key={index}>
                        <summary>
      
                            <div>
                              <h4>Item : {product?.product.name}</h4>
                            </div>
                            <div>
                              <p><strong>SubTotal : {product?.orderedQuantity * product?.product?.price}</strong></p>
                            </div>
                          
                        </summary>
                          <p><strong>Quantity : {product?.orderedQuantity}</strong></p>
                          <p><strong>Price : {product?.product.price}</strong></p>
          
                      </details> 
                  )
              })}
              </div>
              <div className='btn'>
                {
                  setBtn(order?.status, order?._id)
                }
                </div>
              <div className='total'>
                <strong><p>TOTAL : {(totalPrice).toFixed(2)} </p></strong>
              </div>
            </div>    
          )
        })}
        {currentUser===null?<>No orders</>:null}
      </div>
    </div>
  )
}

export default Order