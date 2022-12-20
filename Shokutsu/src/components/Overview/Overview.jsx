import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./Overview.scss"

const Overview = () => {

    const { currentUser }= useSelector((state)=>state.user)
    const navigate=useNavigate();

    let id = currentUser?.user?._id

    const [products, setProducts]=useState(null)


    useEffect(()=>{
        getRestaurantProduct(id)
    },[])
    async function getRestaurantProduct(id){
        try{
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/product/own/${id}`)
            const data = await res.json();
            setProducts(data.data);
        }
        catch(err){
            console.error(err)
        }
    }

    async function trash(id){
        let newProducts = [...products];

        let trashProduct = newProducts.findIndex((pro)=>{
            return pro._id===id
        })
        newProducts.splice(trashProduct,1)
        setProducts(newProducts)
        try{
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/product/${id}`,{
                method: "DELETE"
            })
            const data = await res.json();
            // console.log(data)
        }
        catch(err){
            console.error(err)
        }
    }

    async function setAvail(id){
        let newProducts = [...products];

        let availProduct = newProducts.find((pro)=>{
            return pro._id===id
        })

        availProduct.available = !availProduct.available;
        // console.log(availProduct.available)
        
        // setProducts(newProducts)
        try{
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/product/${id}`,{
                method: "PATCH",
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(availProduct)
            })
            const data = await res.json();
            // console.log(data)
        }
        catch(err){
            console.error(err)
        }
    }

  return (
    <div className='panel'>
        {products?.map((product, index)=>{
            return(
                <div className='item' key={index}>
                    <img src={product.img} alt="" />
                    <div className='content'>
                        <div>
                            <strong>Name : </strong>
                            <p>{product.name}</p>
                        </div>
                        <div>
                            <strong>Price : </strong>
                            <p>${product.price}</p>
                        </div>
                        <div>
                            <strong>Availability : </strong>
                            <p><input type="checkbox" defaultChecked={product.available} onChange={(e)=>{
                                setAvail(product._id)
                            }}/></p>
                        </div>
                    </div>
                    <div className='action'>
                        <button onClick={()=>{
                            navigate('/restaurant/Dashboard/product/edit',{state: product})
                        }}>edit</button>
                        <button onClick={()=>{
                            trash(product._id)
                        }}>delete</button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Overview