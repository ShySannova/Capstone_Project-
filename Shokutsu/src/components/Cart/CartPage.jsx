import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct, resetCart } from '../../redux/cartRedux';
import './Cart.scss'

const CartPage = () => {

    const dispatch = useDispatch();
    const { products, quantity, total } = useSelector((state) => state.cart);
    const { currentUser } = useSelector((state) => state.user);

    const id = currentUser?.user?._id || null;

    const [resName, setResName] = useState(null);
    const navigate = useNavigate();



    const cartData = {
        user:currentUser?.user?._id,
        restaurant: products[0]?.restaurant,
        products: products.map((pro)=>{
          return {product:pro._id, orderedQuantity:pro.orderedQuantity}
        }),
    }
    // console.log(cartData)
  
    async function handleOrder(){
        try{
            let res = await fetch(`${import.meta.env.VITE_BASE_URL}/customer/order`,{
                method: 'POST',
                headers: {
                    'Content-Type' :  'application/json'
                },
                body: JSON.stringify(cartData)
            })
    
            let data = await res.json()

          deleteItemsToCart()

          navigate('/home/orders')

        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
      id===null?
      dispatch(resetCart())
      :getItemsFromCart()
    },[])

    async function getItemsFromCart(){
    
      try{
          let res = await fetch(`${import.meta.env.VITE_BASE_URL}/customer/cart/${id}`)
  
          let data = await res.json()
          // console.log(data.data)

          dispatch(resetCart())
          data?.data?.map((cart)=>{
            let pro = cart.product;
            console.log(pro)
            dispatch(addProduct({...pro, orderedQuantity:cart.orderedQuantity}))
            setResName(pro.restaurant.name)
            })
      }
      catch(err){
          console.log(err)
      }
    }

    async function deleteItemsToCart(){
    
      try{
          let res = await fetch(`${import.meta.env.VITE_BASE_URL}/customer/cart/deleteAll/${currentUser?.user?._id}`,{
              method: 'Delete',
          })

          let data = await res.json()
          // console.log(data)
      }
      catch(err){
          console.log(err)
      }
    }
  
    return (
      <div className="cart">
        <h1>Products in your cart</h1>
        <p>from {resName}</p>
        <div className='item_container'>
          {products?.map((item, index) => (
            <div className="item" key={index}>
                <img src={item.img} alt="" />
                <div className="details">
                  <h1>{item.name}</h1>
                  <p>{item.desc?.substring(0, 100)}...</p>
                  <div className="price">
                    {item.orderedQuantity} x ${item.price}
                  </div>
                </div>
            </div>
          ))}
        </div>
        <div className="total">
          <small>SUBTOTAL : </small>
          <span>${(total).toFixed(2)}</span>
        </div>
        <div className='btn_container'>
          <button onClick={handleOrder}>Place Order</button>
        </div>
        <span className="reset" onClick={()=>{
          dispatch(resetCart())
          deleteItemsToCart()
          }}>
          Reset Cart
        </span>
      </div>
    );
  };
  
  export default CartPage;