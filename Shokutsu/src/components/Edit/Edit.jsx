import "../Add/Add.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'


export const Edit=()=>{

    const { currentUser }= useSelector((state)=>state.user)
    const pro = useLocation()?.state;
    console.log(pro)

    let product={
        restaurant:currentUser?.user?._id,
    };


    const navigate = useNavigate();


    async function updateProduct(){

        try{
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/product/${pro._id}`,{
                method: "PATCH",
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(product)
            })
            const data = await res.json();
            data.statusCode===200
            ?navigate('/restaurant/dashboard')
            :null
        }
        catch(err){
            console.error(err)
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
                <input type="text" id="title" defaultValue={pro.name} placeholder="e.g curry" onChange={
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
                            <input type="text" defaultValue={pro.quantity} placeholder="quantity" onChange={
                            (e)=>{
                            getData('quantity', e.target.value)
                            e.target.value=pro.quantity;
                            }}
                        />
                        </div>
                    </div>
                </label>

                <label className="prices">
                    <div>Prices :</div>
                    <div className="val">
                        <div>
                            <input type="text" defaultValue={pro.price} placeholder="amount" onChange={
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
                <textarea name="" id="desc" cols="30" rows="5" defaultValue={pro.desc} placeholder="enter description" onChange={
                    (e)=>{
                       getData('desc', e.target.value)
                    }}
                ></textarea>
            </div>

            <div className="add-image">
                <label htmlFor="image">Choose an image</label>
                <input type="text" name="" id="image" defaultValue={pro.img} placeholder={'enter image url'} onChange={
                    (e)=>{
                       getData('img', e.target.value)
                    }
                }/>
            </div>
            
            <div className="add-btn-container">
                <button className="btn" onClick={
                    (e)=>{
                        e.preventDefault();
                        updateProduct();
                    }
                }>Update</button>
            </div>

        </form>
    )
}