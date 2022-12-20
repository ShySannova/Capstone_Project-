import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addProduct } from "../../redux/cartRedux";

const Product = ({dish, index}) => {
    
    const [quantity, setQuantity]=useState(dish.quantity)
    const dispatch = useDispatch();
    
    const { currentUser } = useSelector((state) => state.user);

    let id = currentUser?.user?._id;

    const cartData = {
        user:id,
        product:null,
        orderedQuantity:null,
    }

    async function addItemsToCart(){
    
        try{
            let res = await fetch(`${import.meta.env.VITE_BASE_URL}/customer/cart`,{
                method: 'POST',
                headers: {
                    'Content-Type' :  'application/json'
                },
                body: JSON.stringify(cartData)
            })
    
            let data = await res.json()
    
        }
        catch(err){
            console.log(err)
        }
    }



    return(
        <>
            {dish?.available &&
                <div className="menu-info" key={index}>
            
                    <div className="menu-content">
                        <div className="menu-name">
                            <h3>{dish?.name}</h3>
                            <strong>
                                <small>${dish?.price}</small><hr />
                                <div className="coupon">
                                    <div>
                                        <p>20% OFF</p>
                                    </div>
                                    <hr />
                                    <div>
                                        <p>COUPON</p>
                                    </div>
                                </div>
                            </strong>
                            <div className="menu-desc">
                                <p>{dish?.desc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="menu-img">
                        <div className="img-container">
                            <img src={dish?.img} alt=""/>
                        </div>
                        <div className="add-btn">
                            <div className="count">
                                <button onClick={()=>{
                                    quantity===1?null:
                                    setQuantity((prev)=>prev-1)
                                }}>-</button>
                                <span>{quantity}</span>
                                <button onClick={()=>{
                                    setQuantity((prev)=>prev+1)
                                }}>+</button>
                            </div>
                                <button onClick={()=>{
                                dispatch(addProduct({...dish, orderedQuantity:quantity}))
                                cartData.product=dish._id;
                                cartData.orderedQuantity=quantity;
                                addItemsToCart(cartData)
                            }}>Add</button>
                        </div>
                    </div>
                </div>
                
            }
        </>

    )
    
}

export default Product