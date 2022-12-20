import "./Add.scss"
import { useRef,} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'


export const Add=()=>{

    const { currentUser }= useSelector((state)=>state.user)

    let product={
        restaurant:currentUser?.user?._id,
    };


    const navigate = useNavigate();


    async function createProduct(){
        
        let url=`${import.meta.env.VITE_BASE_URL}/product/add`;

        try{
            let res = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type' :  'application/json'
                },
                body: JSON.stringify(product)
            })
    
            let data = await res.json()
    
            data.statusCode===200
            ?navigate('/restaurant/dashboard')
            :null;
        }
        catch(err){
            console.log(err)
        }

    }

    function getData(property, value){
        product[property] = value;
    }

    return(

        <form className="product-add-container">
             <div className="dish-name">
                <div>
                    <label htmlFor="title">Dish Name : </label>
                </div>
                <input type="text" id="title" placeholder="e.g curry" onChange={
                    (e)=>{
                       getData('name', e.target.value)
                    }
                }/>
            </div>

            <div className="price-quantity">

                <label className="prices">
                    <div>Quantity :</div>
                    <div className="val">
                        <div>
                            <input type="text" placeholder="quantity" onChange={
                            (e)=>{
                            getData('quantity', e.target.value)
                            }}
                        />
                        </div>
                    </div>
                </label>

                <label className="prices">
                    <div>Prices :</div>
                    <div className="val">
                        <div>
                            <input type="text" placeholder="amount" onChange={
                            (e)=>{
                            getData('price', e.target.value)
                            }}
                        />
                        </div>
                    </div>
                </label>
            </div>
            
           
            <div className="desc">
                <div>
                    <label htmlFor="desc">Desc : </label>
                </div>
                <textarea name="" id="desc" cols="30" rows="5" placeholder="enter description" onChange={
                    (e)=>{
                       getData('desc', e.target.value)
                    }}
                ></textarea>
            </div>

            <div className="add-image">
                <label htmlFor="image">Choose an image</label>
                <input type="text" name="" id="image" placeholder={'enter image url'} onChange={
                    (e)=>{
                       getData('img', e.target.value)
                    }
                }/>
            </div>
            
            <div className="add-btn-container">
                <button className="btn" onClick={
                    (e)=>{
                        e.preventDefault();
                        createProduct();
                    }
                }>Create</button>
            </div>

        </form>
    )
}