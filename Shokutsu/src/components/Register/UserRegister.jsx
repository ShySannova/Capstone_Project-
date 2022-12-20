import "./UserRegister.scss"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export default function UserRegister(){


    const navigate=useNavigate();

    let address ={ }

    let timing={ }

    let data = {
        
    };

    const btn=useRef();


    function handleClick(e){
        e.preventDefault();
        // console.log(data);
        signUp();
    }

    function signUp(){
            fetch(`${import.meta.env.VITE_BASE_URL}/customer/signup`,{
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
                    navigate('/home/signIn')
                    return;
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    return(
        <div className="userRegister_container register_container">
            <div className="wrapper">
            <h4 className="title">CREATE AN ACCOUNT</h4>
            <form className="form">
                <input className="input" placeholder="Full Name" onChange={(e)=>{
                    data.name=e.target.value
                }}/>
                <input className="input" placeholder="Email" onChange={(e)=>{
                    data.email=e.target.value
                }}/>
                <input className="input" placeholder="Phone No." onChange={(e)=>{
                    data.contact=e.target.value
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
                <div className="btn_container">
                    <button ref={btn} disabled>CREATE</button>
                </div>
            </form>
            </div>
      </div>
    )
}