import "./Login.scss"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { loginFailure,loginSuccess, loginStart, setAdmin } from "../../redux/userRedux";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate=useNavigate();

    let data={
        email,
        password
    };
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
  
    const handleClick = async(e) => {
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurant/signin`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const user = await res.json();
            if(user.status===200){
                dispatch(loginSuccess(user))
                dispatch(setAdmin())
                navigate('/restaurant/dashboard')
            }else{
                console.log(currentUser?.message||'something went wrong')
            }
        }
        catch(err){
            dispatch(loginFailure())
            console.error(err)
        }
    };

    return(
        <div className="container">
            <div className="wrapper">
                <h3 className="title">SIGN IN</h3>
                <form className="form">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleClick}>
                        LOGIN
                    </button>
                     {/* <p className="error">Something went wrong...</p> */}
                    <Link to=''>
                        <small>
                            FORGOT PASSWORD?
                        </small>
                    </Link>
                    {/* <Link to=''>
                        <small>
                            CREATE A NEW ACCOUNT
                        </small>
                    </Link> */}
                </form>
            </div>
        </div>
    );
};