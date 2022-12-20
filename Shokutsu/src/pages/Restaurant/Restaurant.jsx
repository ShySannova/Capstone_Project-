import { Link, Outlet } from "react-router-dom"
import "./Restaurant.scss"
import {useSelector, useDispatch} from "react-redux"
import { resetStore } from "../../redux/userRedux";


export default function Restaurant(){

    const dispatch = useDispatch();
    const { currentUser, isLogged, isAdmin } = useSelector((state) => state.user);

    function handleClick(){
        dispatch(resetStore())
    }

    return(
        <main className="restaurant">
            <div className="restaurantWrapper">
                <div className="left">
                    <Link to='/' className="logo">Shokutsu</Link>
                </div>
                {isLogged && isAdmin?
                <div className="loggedin">
                    <strong>{currentUser?.user?.name}</strong>
                    <button onClick={handleClick}>Logout</button>
                </div>
                :<div className="right">
                    <Link to='/restaurant/signIn'>Sign In</Link>
                    <Link to='/restaurant/signUp'>Sign Up</Link>
                </div>
                }               
            </div>
            <Outlet/>
        </main>
    )
}