import "./Header.scss"
import { Link, useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { resetStore } from "../../redux/userRedux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { useState } from "react";


export default function Header(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogged,isAdmin, currentUser } = useSelector((state) => state.user);

    const [drop, setDrop]=useState(false)
    

    function handleClick(){
        navigate('/home/signIn')
    }
    function handleLogout(){
        dispatch(resetStore())
        navigate('/home')
    }

    return(
        <header className="header">
            <nav className="wrapper">
                <div className="left">
                    <Link to='/home' className="logo">Shokutsu</Link>
                </div>
                    <Link to='/menu' className="menu">Menu</Link>
                <div className="right">
                    <div className="left">
                        <span>Register as :</span>
                        <Link to={ isLogged && isAdmin?'/restaurant/dashboard':"/restaurant/signIn"}>Restaurant</Link>
                    </div>
                    <div className="right">
                        {isLogged && !isAdmin
                        ?( 
                            <>
                                <div className="userDrop" onClick={()=>{
                                        setDrop(!drop)
                                    }}>
                                {drop?
                                    <ArrowDropDownIcon/>
                                    :<ArrowRight/>}
                                    <AccountCircleIcon/>
                                    <div>
                                        {currentUser?.user?.name}
                                    </div>
                                    {drop?
                                    <div className="dropdown">
                                        <Link>Profile</Link>
                                        <Link to='/home/cart'>Cart</Link>
                                        <Link to='/home/orders'>Orders</Link>
                                    </div>:null}
                                </div>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                            )
                        :<button onClick={handleClick}>Login</button>}
                    </div>
                </div>
            </nav>
        </header>
    )
}