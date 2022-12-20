import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss"


export default function Register(){

    const navigate=useNavigate();

    let address ={ }

    let timing={ }

    let data = {
        address:address,
        timing:timing,
    };

    const btn=useRef();


    function handleClick(e){
        e.preventDefault();
        // console.log(data);
        signUp();
    }

    function signUp(){
            fetch(`${import.meta.env.VITE_BASE_URL}/restaurant/signup`,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((res)=>{
                return res.json()
            })
            .then((data)=>{
                // console.log(data)
                if(data?.success===true){
                    navigate('/restaurant/signIn')
                    return;
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    return(
        <div className="register_container">
            <div className="wrapper">
            <h4 className="title">CREATE AN ACCOUNT</h4>
            <form className="form">
                <input type='text' className="input" placeholder="Restaurant Name" onChange={(e)=>{
                    data.name=e.target.value
                }}/>
                <input type='email' className="input" placeholder="Email"onChange={(e)=>{
                    data.email=e.target.value
                }}/>
                <input type='text' className="input" placeholder="Address Line 1" onChange={(e)=>{
                    address.line=e.target.value
                }}/>
                <div className="subAddress">
                    <input type='text' placeholder="City" onChange={(e)=>{
                        address.city=e.target.value
                    }}/>
                    <input type='text' placeholder="State" onChange={(e)=>{
                        address.state=e.target.value
                    }}/>
                    <input type='Number' placeholder="PinCode" onChange={(e)=>{
                        address.pincode=e.target.value
                    }}/>
                </div>
                <div className="runtime">
                    <input type='Number' placeholder="Opening Time" onChange={(e)=>{
                        timing.open=e.target.value
                    }}/>
                    <input type='Number' placeholder="Closing Time" onChange={(e)=>{
                        timing.closed=e.target.value
                    }}/>
                </div>
                <input className="input" type='text' placeholder="Tags eg. Burger, Desserts, Beverages, etc" onChange={(e)=>{
                    data.tags=e.target.value
                }}/>
                <input className="input" type='text' placeholder="image url" onChange={(e)=>{
                    data.img=e.target.value
                }}/>
                <input className="input" type='password' placeholder="Password" onChange={(e)=>{
                    data.password=e.target.value
                }}/>
                <input className="input" type='password' placeholder="Confirm Password" onChange={(e)=>{
                    if(data?.password === e.target.value){
                        btn.current.disabled=false;
                        btn.current.onclick=handleClick                         
                        // console.log(btn.current)
                    }else{
                        // console.log(btn.current)
                        btn.current.disabled=true;
                    }

                }}/>
                <span>
                By creating an account, I consent to the processing of my personal
                data in accordance with the <b>PRIVACY POLICY</b>
                </span>
                <div>
                    <button ref={btn} disabled>CREATE</button>
                </div>
            </form>
            </div>
      </div>
    )
}