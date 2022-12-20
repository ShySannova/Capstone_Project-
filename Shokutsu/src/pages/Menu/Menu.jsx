import Cart from "../../components/Cart/Cart"
import RestaurantBanner from "../../components/RestaurantBanner/RestaurantBanner"
import "./Menu.scss"
import { useEffect, useState } from "react"
import Product from "../../components/Product/Product"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../redux/menuRedux"



const Menu = () => {

    const { data } = useSelector((state) => state.menu);
    const dispatch= useDispatch()

    const [dishes, setDishes] = useState(null)

    let id =  data?._id;
    let resName = data?.name

    useEffect(()=>{
        getRestaurantProduct(id)
    },[])

    async function getRestaurantProduct(id){
        try{
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/product/own/${id}`)
            const product = await res.json();
            setDishes(product.data);
            dispatch(setProducts(product.data))
            // console.log(product)
        }
        catch(err){
            console.error(err)
        }
    }


    return (

        <main className="product">{data?
                <RestaurantBanner data={data}/>:null}     
                <section className="menu">
                    <div className="menu_list">
                        <ul className="menu_list_wrapper">
                            <li>Top Picks</li>
                            <li>Recommended</li>
                            <li>WEEKEND DEALS</li>
                            <li>STAY HOME SPECIALS</li>
                            <li>BIRYANI BUCKETS</li>
                            <li>BURGERS</li>
                            <li>SNACKS</li>
                            <li>SIDES & BEVERAGES</li>
                        </ul>
                    </div>
                    <div className="menu_display">
                        <div className="menu-wrapper">    
                            <div className="menu-head">
                                <h3>Our Menu</h3>
                                <p>{dishes?.length} items</p>
                            </div>
                            {dishes?.map((dish, index)=>{
                                return(
                                    <Product dish={{...dish, resName}} key={index}/>
                                )
                               
                                
                            })}
                           
                        </div>
                    </div>
                    <Cart/>
                </section>
        </main>
    )
}

export default Menu