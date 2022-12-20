import "./Dashboard.scss"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import {useSelector} from "react-redux"
import Overview from "../../components/Overview/Overview";
import { useEffect, useState } from "react";



const Dashboard = () => {


    const navigate=useNavigate();
    const { isLogged } = useSelector((state) => state.user);
    const { currentUser } = useSelector((state) => state.user);
    const [orders, setOrders]=useState(null);

    const location = useLocation().pathname;

    console.log(location)

    useEffect(()=>{
        getOrder();
      },[])
  
      async function getOrder(){
          try{
              let res = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurant/orders/${currentUser?.user?._id}`)
      
              let data = await res.json()
      
              if(data.success){
                setOrders(data.data)
                // console.log(data)
              }
          }
          catch(err){
              console.log(err)
          }
      }

      async function handleClick(id, status){
        try{
            let res = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurant/order/${id}`,
                {
                    method: 'PATCH',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify(status)
                }
            )
    
            let data = await res.json()
    
            if(data.success){
            //   console.log(data)
              getOrder()
            }
        }
        catch(err){
            console.log(err)
        }
      }


  return (
    isLogged?
    <section className="dashboard">
        <div className="overview">
            <div className="order">
                <header>
                    <h3>Order-list</h3>
                    <hr />
                    <div className="order_display">
                        {orders?.map((list,index)=>{
                            
                            if(list.status===0){
                                return(
                                    <div className="list" key={index}>
                                    <p>OrderID : {list?._id}</p>
                                    {list?.products?.map((pro, index)=>{
                                        return(
                                            <div className="items" key={index}>
                                                <div>
                                                <p>{index+1} : {pro.product?.name}</p>
                                                </div>
                                                <div>
                                                    <p>Qty : {pro.orderedQuantity}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="btn">
                                        <button onClick={()=>{
                                            handleClick(list?._id, {status:1})
                                        }}>Accept</button>
                                    </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </header>
            </div>
            <div className="table">
                <header>
                    <div>
                        <strong>Product</strong>
                    </div>
                    <div>
                        <button onClick={()=>{
                            navigate('/restaurant/dashboard/product/add')
                        }}>Add</button>
                    </div>
                </header>

                <main className="display">
                    {location==='/restaurant/dashboard'
                        ?
                        <Overview/>
                        :
                        <Outlet/>
                    }
                </main>

            </div>

        </div>
    </section>
    :<Navigate to='/restaurant/signIn'/>
  )
}

export default Dashboard