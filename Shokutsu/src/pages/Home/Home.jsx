import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import BannerSlider from "../../components/BannerSlider/BannerSlider";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import "./Home.scss"


export default function Home(){
    const [data, setData]=useState(null)

    const path = useLocation().pathname;
    // console.log(path)

    const navigate = useNavigate()

    useEffect(()=>{
        getRestaurants();
    },[])
    
    async function getRestaurants(){
        try{
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurant/all`)
            const data = await res.json();
            setData(data.data);
            // console.log(data)
        }
        catch(err){
            console.error(err)
        }
    }
    

    return(
        <main className="home">
            <BannerSlider/>
            <RestaurantCard data={data}/>
                <div className={`loginArea ${path==='/home/signIn'||path==='/home/signUp'?'active':null}`}>
                    <button className="x-btn" onClick={()=>{
                        navigate('/home')
                    }}>x</button>
                    <div className="loginWrapper">
                        <div className="tab">
                            <Link to='/home/signIn'>Sign In</Link>
                            <Link to='/home/signUp'>Sign Up</Link>
                        </div>
                        {/* <strong>Cart</strong> */}
                        
                        <Outlet/>
                    </div>
                </div>
        </main>
    )
}